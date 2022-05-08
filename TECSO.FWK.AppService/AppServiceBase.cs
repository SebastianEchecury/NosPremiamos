using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TECSO.FWK.AppService.Interface;
using TECSO.FWK.AppService.Model;
using TECSO.FWK.Domain;
using TECSO.FWK.Domain.Entities;
using TECSO.FWK.Domain.Interfaces.Entities;
using TECSO.FWK.Domain.Interfaces.Services;
using TECSO.FWK.Domain_Std.Interfaces.Services;

namespace TECSO.FWK.AppService
{

    public class AppServiceBase<TServiceBase> : IDisposable, IAppServiceBase
        where TServiceBase : IServiceBase
    {
        protected readonly TServiceBase _serviceBase;
        public AppServiceBase(TServiceBase serviceBase)
        {
            _serviceBase = serviceBase;
        }


        public void Dispose()
        {
            _serviceBase.Dispose();
        }
    }


    public class AppServiceByHttp<TServiceBase> : AppServiceBase<TServiceBase>, IHttpAppServiceBase<TServiceBase>
        where TServiceBase : IHttpServiceBase
    {

        public AppServiceByHttp(TServiceBase serviceBase)
            : base(serviceBase)
        {

        }

        public Task<TResponse> GetResponse<TResponse, TFilter>(TFilter filter)
            where TResponse: class
            where TFilter : class

        {
            try
            {
                return _serviceBase.Get<TResponse, TFilter>(filter);
            }
            catch(Exception ex)
            {
                throw new DomainValidationException("Ha ocurrido un error.");
            }
        }


        public Task<TResponse> PostResponse<TResponse, TFilter>(TFilter filter)
            where TResponse : class
            where TFilter : class
        {
            try
            {
                return this._serviceBase.Post<TResponse, TFilter>(filter);
            }
            catch (Exception ex)
            {
                throw new DomainValidationException("Ha ocurrido un error.");
            }
        }

    }

    public class AppServiceBase<TEntity, TPrimaryKey, TServiceBase> : AppServiceBase<TServiceBase>, IAppServiceBase<TEntity, TPrimaryKey>
         where TEntity : Entity<TPrimaryKey>
        where TServiceBase : IServiceBase<TEntity, TPrimaryKey>
    {


        public AppServiceBase(TServiceBase serviceBase)
            : base(serviceBase)
        {

        }



        public Task<TEntity> AddAsync(TEntity entity)
        {
            return _serviceBase.AddAsync(entity);
        }


        public Task<TEntity> AddOrUpdateAsync(TEntity entity)
        {
            return _serviceBase.AddOrUpdateAsync(entity);
        }



        public virtual Task DeleteAsync(TPrimaryKey id)
        {
            return _serviceBase.DeleteAsync(id);
        }




        public async Task<TEntity> GetByIdAsync(TPrimaryKey id)
        {
            return await _serviceBase.GetByIdAsync(id);
        }

        public async Task<TEntity> GetByIdAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>
        {
            return await _serviceBase.GetByIdAsync(filter);
        }



        public virtual async Task<List<ItemDto<TPrimaryKey>>> GetItemsAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new()
        {

            if (filter == null)
            {
                filter = new TFilter();
                filter.PageSize = int.MaxValue;
            }


            var list = await this._serviceBase.GetAllAsync(filter);
            var r = list.Select(filter.GetItmDTO()).ToList();
            return r;
        }


        public virtual Task<PagedResult<TEntity>> GetPagedListAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new()
        {
            return _serviceBase.GetPagedListAsync(filter);
        }


        public virtual Task<TEntity> UpdateAsync(TEntity entity)
        {
            return _serviceBase.UpdateAsync(entity);
        }
    }

    public class AppServiceBase<TEntity, TDto, TPrimaryKey, TServiceBase> : AppServiceBase<TEntity, TPrimaryKey, TServiceBase>, IAppServiceBase<TEntity, TDto, TPrimaryKey>
             where TEntity : Entity<TPrimaryKey>
            where TDto : EntityDto<TPrimaryKey>, new()
        where TServiceBase : IServiceBase<TEntity, TPrimaryKey>
    {


        public AppServiceBase(TServiceBase serviceBase) : base(serviceBase)
        {

        }

        public virtual async Task<TDto> UpdateAsync(TDto dto)
        {
            var entity = await this.GetByIdAsync(dto.Id);
            MapObject(dto, entity);
            await this.UpdateAsync(entity);
            return MapObject<TEntity, TDto>(entity);
        }


        public virtual async Task<TDto> AddOrUpdateAsync(TDto dto)
        {
            var entity = MapObject<TDto, TEntity>(dto);
            return MapObject<TEntity, TDto>(await this.AddOrUpdateAsync(entity));

        }


        public virtual async Task<TDto> AddAsync(TDto dto)
        {

            var entity = MapObject<TDto, TEntity>(dto);
            return MapObject<TEntity, TDto>(await this.AddAsync(entity));
        }

        protected virtual IEnumerable<TDestination> MapList<TSource, TDestination>(IEnumerable<TSource> list)
        {
            return AutoMapper.Mapper.Map<IEnumerable<TSource>, IEnumerable<TDestination>>(list);
        }

        protected virtual IEnumerable<TDestination> MapList<TSource, TDestination>(IEnumerable<TSource> source, IEnumerable<TDestination> destinations)
        {
            return AutoMapper.Mapper.Map<IEnumerable<TSource>, IEnumerable<TDestination>>(source, destinations);
        }

        protected virtual TDestination MapObject<TSource, TDestination>(TSource obj)
        {
            return AutoMapper.Mapper.Map<TSource, TDestination>(obj);
        }

        protected virtual TDestination MapObject<TSource, TDestination>(TSource obj, TDestination dest)
        {
            return AutoMapper.Mapper.Map<TSource, TDestination>(obj, dest);
        }

        public virtual async Task<TDto> GetDtoByIdAsync(TPrimaryKey id)
        {

            TEntity entity = await this._serviceBase.GetByIdAsync(id);
            var dto = this.MapObject<TEntity, TDto>(entity);
            return dto;
        }

        public virtual async Task<List<TDto>> GetDtoAllAsync<TFilter>(TFilter filter)
            where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new()
        {
            var list = await this._serviceBase.GetAllAsync(filter);

            var listDto = this.MapList<TEntity, TDto>(list);

            return listDto.ToList();
        }



        public virtual async Task<PagedResult<TDto>> GetDtoPagedListAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new()
        {
            var list = await _serviceBase.GetPagedListAsync(filter);
            var listDto = this.MapList<TEntity, TDto>(list.Items);

            PagedResult<TDto> pList = new PagedResult<TDto>(list.TotalCount, listDto.ToList());
            return pList;
        }
    }

    public class DtoAppServiceBase<TDto, TFilter, IClient> : IDtoAppServiceBase<TDto, TFilter, IClient>
        where TDto : IGenericDto
        where TFilter : GenericFilterCriteria
        where IClient : IWCFService<TDto, TFilter>, new()
    {


        public virtual async Task<List<TDto>> GetAllByFilterAsync(TFilter filter)
        {
            using (var client = new IClient())
            {
                var data = await client.GetAllByFilterAsync(filter);

                return data;
            }
        }



    }

}
