using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using TECSO.FWK.AppService.Interface;
using TECSO.FWK.AppService.Model;
using TECSO.FWK.Domain;
using TECSO.FWK.Domain.Entities;
using TECSO.FWK.Domain.Interfaces.Services;
using TECSO.FWK.Domain.Interfaces.Entities;

namespace TECSO.FWK.AppService
{
    public abstract class HttpAppServiceBase<TEntity, TDto, TPrimaryKey> : IHttpAppServiceBase<TEntity, TDto, TPrimaryKey>
        where TEntity : Entity<TPrimaryKey>
        where TDto : EntityDto<TPrimaryKey>, new()

    {
        protected HttpCustomClient<TDto> httpClient;

        public abstract string EndPoint { get;  }

        protected readonly IAuthService authService;
        protected IConfiguration configuration;

        public HttpAppServiceBase(IAuthService _authService)
        {
            authService = _authService;
            configuration = ServiceProviderResolver.ServiceProvider.GetService<IConfiguration>();
            var urlPath = String.Format("{0}{1}/", configuration.GetValue<String>("LogsUrl"), this.EndPoint);
            this.httpClient = new HttpCustomClient<TDto>(urlPath, authService.GetCurretToken());
        }

        
        protected virtual IEnumerable<TDestination> MapList<TSource, TDestination>(IEnumerable<TSource> list)
        {
            return AutoMapper.Mapper.Map<IEnumerable<TSource>, IEnumerable<TDestination>>(list);
        }

        protected virtual TDestination MapObject<TSource, TDestination>(TSource obj)
        {
            return AutoMapper.Mapper.Map<TSource, TDestination>(obj);
        }

        protected virtual TDestination MapObject<TSource, TDestination>(TSource obj, TDestination dest)
        {
            return AutoMapper.Mapper.Map<TSource, TDestination>(obj, dest);
        }

        

       

        public async Task<TDto> AddAsync(TDto dto)
        {
            return await this.httpClient.PostRequest<TDto>("SaveNewEntity", dto);
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            var dto = MapObject<TEntity,TDto>(entity);
            dto =  await this.httpClient.PostRequest<TDto>("SaveNewEntity", dto);
            return MapObject<TDto, TEntity>(dto);
        }

       

        public async Task<TDto> AddOrUpdateAsync(TDto dto)
        {
            string action = "UpdateEntity";

            dto = await this.httpClient.PostRequest<TDto>(action, dto);
            return dto;
        }

        public async Task<TEntity> AddOrUpdateAsync(TEntity entity)
        {
            var dto = MapObject<TEntity, TDto>(entity);

            string action = "UpdateEntity";

            dto = await this.httpClient.PostRequest<TDto, TDto>(action, dto);

            return MapObject<TDto, TEntity>(dto);

        }

       

        public async Task DeleteAsync(TPrimaryKey id)
        {
            string action = "DeleteById";

            await this.httpClient.PostRequest<TDto,dynamic>(action, new { id = id });

        }

        public void Dispose()
        {
            
        }

        


        public async Task<List<ItemDto<TPrimaryKey>>> GetItemsAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new()
        {
            string action = "GetItemsAsync";

            List<ItemDto<TPrimaryKey>> pList = await this.httpClient.PostRequest<List<ItemDto<TPrimaryKey>>, TFilter>(action, filter);

            return pList;
        }


        public async Task<TEntity> GetByIdAsync(TPrimaryKey id)
        {

            string action = "GetByIdAsync";

            var dto = await this.httpClient.PostRequest<TDto, dynamic>(action, new { id = id});

            return MapObject<TDto, TEntity>(dto);

        }

        public async Task<TDto> GetDtoByIdAsync(TPrimaryKey id)
        {
            string action = "GetByIdAsync";

            var dto = await this.httpClient.PostRequest<TDto,dynamic>(action, new { id = id });

            return dto;

        }

       

        public async Task<PagedResult<TEntity>> GetPagedListAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new()
        {
            string action = "GetPagedList";

            PagedResult<TDto> pList = await this.httpClient.PostRequest<PagedResult<TDto>,TFilter>(action, filter);

            return new PagedResult<TEntity>(pList.TotalCount, this.MapList<TDto, TEntity>(pList.Items).ToList());

        }

        

        public async Task<TDto> UpdateAsync(TDto dto)
        {

            string action = "UpdateEntity";

            dto = await this.httpClient.PostRequest<TDto, TDto>(action, dto);

            return dto;

        }

        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            var dto = MapObject<TEntity, TDto>(entity);

            string action = "UpdateEntity";

            dto = await this.httpClient.PostRequest<TDto, TDto>(action, dto);

            return MapObject<TDto, TEntity>(dto);

        }

        
 

       

        public async Task<PagedResult<TDto>> GetDtoPagedListAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new()
        {
            string action = "GetPagedList";

            PagedResult<TDto> pList = await this.httpClient.PostRequest<PagedResult<TDto>, TFilter>(action, filter);

            return pList;
        }

        public async Task<List<TDto>> GetDtoAllAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new()
        {
            string action = "GetDtoAllAsync";

            List<TDto> pList = await this.httpClient.PostRequest<List<TDto>,TFilter>(action, filter);

            return pList;
        }
    }
}
