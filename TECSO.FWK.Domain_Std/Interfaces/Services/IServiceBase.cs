using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Entities;
using TECSO.FWK.Domain.Interfaces.Entities;

namespace TECSO.FWK.Domain.Interfaces.Services
{

    public interface IServiceBase: IDisposable
    {
        
    }

    public interface IHttpServiceBase : IServiceBase
    {
        Task<TResponse> Get<TResponse, TFilter>(TFilter filter)
            where TResponse : class
            where TFilter : class;


        Task<TResponse> Post<TResponse, TFilter>(TFilter filter)
            where TResponse : class
            where TFilter : class;
    }


    public interface IGenericServiceBase<TEntity, TPrimaryKey> : IServiceBase
    {

    }

    public interface IServiceBase<TEntity, TPrimaryKey>: IGenericServiceBase<TEntity, TPrimaryKey>
         where TEntity : Entity<TPrimaryKey>
    {
        
        Task<TEntity> AddAsync(TEntity entity);


        
        Task<TEntity> AddOrUpdateAsync(TEntity entity);


        
        Task<TEntity> UpdateAsync(TEntity entity);
        
        Task DeleteAsync(TPrimaryKey id);
        
        Task<TEntity> GetByIdAsync(TPrimaryKey id);
        Task<TEntity> GetByIdAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>;
        
        Task<List<TEntity>> GetAllAsync<TFilter>(TFilter filter = null) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new();

        Task<PagedResult<TEntity>> GetPagedListAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new();

        Task<bool> ExistExpression(Expression<Func<TEntity, bool>> predicate);

        
    }
}
