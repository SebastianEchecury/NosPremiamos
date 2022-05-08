using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TECSO.FWK.AppService.Model;
using TECSO.FWK.Domain.Entities;
using TECSO.FWK.Domain.Interfaces.Entities;
using TECSO.FWK.Domain.Interfaces.Services;
using TECSO.FWK.Domain_Std.Interfaces.Services;

namespace TECSO.FWK.AppService.Interface
{
    public interface IAppServiceBase
    {

    }


    public interface IHttpAppServiceBase<TService> : IAppServiceBase
        where TService : IHttpServiceBase

    {
        Task<TResponse> GetResponse<TResponse, TFilter>(TFilter filter)
            where TResponse : class
            where TFilter : class;

        Task<TResponse> PostResponse<TResponse, TFilter>(TFilter filter)
            where TResponse : class
            where TFilter : class;
    }

    public interface IDtoAppServiceBase<TDto,TFilter,I>: IAppServiceBase
        where TDto : IGenericDto
        where TFilter : GenericFilterCriteria
        where I : IWCFService<TDto, TFilter>

    {
        Task<List<TDto>> GetAllByFilterAsync(TFilter filter);
    }


    public interface IAppServiceBase<TEntity, TPrimaryKey> : IAppServiceBase
        where TEntity : Entity<TPrimaryKey>
    {
        Task<TEntity> AddAsync(TEntity entity);


        Task<TEntity> AddOrUpdateAsync(TEntity entity);


        Task<TEntity> UpdateAsync(TEntity entity);


        Task DeleteAsync(TPrimaryKey id);



        Task<TEntity> GetByIdAsync(TPrimaryKey id);


        Task<List<ItemDto<TPrimaryKey>>> GetItemsAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new();

        Task<PagedResult<TEntity>> GetPagedListAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new();

        void Dispose();
    }


    public interface IAppServiceBase<TEntity, TDto,  TPrimaryKey> : IAppServiceBase<TEntity, TPrimaryKey>
        where TEntity : Entity<TPrimaryKey>
        where TDto : EntityDto<TPrimaryKey>
    {
        Task<TDto> UpdateAsync(TDto dto);
        Task<TDto> AddAsync(TDto dto);
        Task<TDto> AddOrUpdateAsync(TDto dto);
        Task<TDto> GetDtoByIdAsync(TPrimaryKey id); 
        Task<List<TDto>> GetDtoAllAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new();
        Task<PagedResult<TDto>> GetDtoPagedListAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new();


    }

    public interface IHttpAppServiceBase<TEntity, TDto, TPrimaryKey>: IAppServiceBase<TEntity, TDto, TPrimaryKey>
        where TEntity : Entity<TPrimaryKey>
        where TDto : EntityDto<TPrimaryKey>
    {
        string EndPoint { get; }
    }
}
