using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TECSO.FWK.Domain.bus;
using TECSO.FWK.Domain.Entities;
using TECSO.FWK.Domain.Interfaces.Entities;

namespace TECSO.FWK.Domain.Interfaces.Repositories
{

    public interface IRepository : ITransientDependency
    {
    }

    public interface IRepositoryBase<TEntity, TPrimaryKey> : IRepository
        where TEntity : Entity<TPrimaryKey>
    {
        
        Task<TEntity> AddAsync(TEntity entity);


        
        Task<TEntity> AddOrUpdateAsync(TEntity entity);
        

        
        Task<TEntity> UpdateAsync(TEntity entity);


        
        Task DeleteAsync(TPrimaryKey id);
        Task DeleteAsync(TEntity entity);
        
        Task<TEntity> GetByIdAsync(TPrimaryKey id);
        Task<TEntity> GetByIdAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>;

        Task<bool> ExistExpression(Expression<Func<TEntity, bool>> predicate);

        Task<List<TEntity>> GetAllAsync<TFilter>(TFilter filter = null) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new();

        Task<PagedResult<TEntity>> GetPagedListAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new();

        
        void Dispose();
    }
}
