﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Interfaces.Entities;
using TECSO.FWK.Domain.Interfaces.Repositories;
using TECSO.FWK.Infra.Data.Interface;
using System.Linq;
using TECSO.FWK.Domain.Entities;
using TECSO.FWK.Domain;
using System.Data.SqlClient;
using System.ComponentModel.DataAnnotations;
using TECSO.FWK.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using TECSO.FWK.AppService.Interface;

namespace TECSO.FWK.Infra.Data.Repositories
{
    public abstract class RepositoryBase<TContext, TEntity, TPrimaryKey> : IDisposable, IRepositoryBase<TEntity, TPrimaryKey>
        where TContext : DbContext, IDbContext
         where TEntity : Entity<TPrimaryKey>
    {
        public virtual TContext Context { get; }

        private readonly ILogger logger;

        //private readonly IResilientTransaction<TContext> resilientTransaction;
        private IDbContextProvider<TContext> dbContextProvider;



        public RepositoryBase(IDbContextProvider<TContext> _dbContextProvider)
        {
            dbContextProvider = _dbContextProvider;
            Context = dbContextProvider.GetDbContext();
            this.logger= ServiceProviderResolver.ServiceProvider.GetService<ILogger>();
            //this.resilientTransaction = ServiceProviderResolver.ServiceProvider.GetService<IResilientTransaction<TContext>>(); 
        }

        public void Dispose()
        {
            Context.Dispose();
        }


        public virtual int SaveChanges()
        {
            //if (!this.resilientTransaction.IsResilientTransaction())
            //{
            return Context.SaveChanges();
            //}
            //return 0;
        }

        public virtual Task<int> SaveChangesAsync()
        {
            ////if (!this.resilientTransaction.IsResilientTransaction())
            //{
            return Context.SaveChangesAsync();
            //}
            //return Task.FromResult(0);
        }


       

        public virtual async Task<TEntity> AddAsync(TEntity entity)
        {
            try
            {
                DbSet<TEntity> dbSet = Context.Set<TEntity>();
                var entry = await dbSet.AddAsync(entity);
                await this.SaveChangesAsync();
                return entry.Entity;
            }
            catch (Exception ex)
            {
                this.HandleException(ex);
                throw;
            }

        }




        

        public async Task<TEntity> AddOrUpdateAsync(TEntity entity)
        {
            try
            {
                DbSet<TEntity> dbSet = Context.Set<TEntity>();
                TEntity obj = await dbSet.FindAsync(entity.Id);
                if (await this.GetByIdAsync(entity.Id) != null)
                {
                    Context.Entry(obj).State = EntityState.Detached;

                    Context.Entry(entity).State = EntityState.Modified;
                }
                else
                {
                    Context.Entry(entity).State = EntityState.Added;
                }

                await this.SaveChangesAsync();
                return entity;
            }
            catch (DbUpdateException ex)
            {
                HandleException(ex);
                throw;
            }
        }

        
        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {

            try
            {
                Context.Entry(entity).State = EntityState.Modified;
                await this.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }
        }

       

        public virtual async Task DeleteAsync(TPrimaryKey id)
        {
            try
            {
                await DeleteAsync(await GetByIdAsync(id));
                await this.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }
        }


        public virtual async Task DeleteAsync(TEntity entity)
        {
            try
            {
                await Task.FromResult(Context.Set<TEntity>().Remove(entity));
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }

        }

        

        public async Task<TEntity> GetByIdAsync(TPrimaryKey id)
        {
            try
            {
                DbSet<TEntity> dbSet = Context.Set<TEntity>();
                IQueryable<TEntity> query = this.AddIncludeForGet(dbSet);

                TEntity entity = await query.SingleAsync(GetFilterById(id));

                if ((object)entity == null)
                    throw new EntityNotFoundException(typeof(TEntity), (object)id);

                this.CompleteEntityAfterRead(entity);

                return entity;
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }

        }

        protected virtual void CompleteEntityAfterRead(TEntity entity)
        {

        }

        public virtual async Task<TEntity> GetByIdAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>
        {
            try
            {
                IQueryable<TEntity> query = Context.Set<TEntity>().AsQueryable();

                foreach (var include in filter.GetIncludesForGetById())
                {
                    query = query.Include(include);
                }

                TEntity entity = await query.SingleAsync(GetFilterById(filter.Id));

                if ((object)entity == null)
                    throw new EntityNotFoundException(typeof(TEntity), (object)filter.Id);
                return entity;
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }
        }



        protected virtual IQueryable<TEntity> AddIncludeForGet(DbSet<TEntity> dbSet)
        {
            return dbSet.AsQueryable();
        }

        public abstract Expression<Func<TEntity, bool>> GetFilterById(TPrimaryKey id);


     
        public virtual async Task<PagedResult<TEntity>> GetPagedListAsync<TFilter>(TFilter filter)
            where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new()
        {
            try
            {
                filter = CompleteFilterPageList(filter);

                //DbSet<TEntity> dbSet = Context.Set<TEntity>();
                IQueryable<TEntity> query = Context.Set<TEntity>().Where(filter.GetFilterExpression()).AsQueryable();

                var total = await query.CountAsync();

                foreach (var include in filter.GetIncludesForPageList())
                {
                    query = query.Include(include);
                }

                if (!String.IsNullOrEmpty(filter.Sort))
                {
                    query = System.Linq.Dynamic.Core.DynamicQueryableExtensions.OrderBy(query, filter.Sort);
                }

                //var total = query.Count();


                var Page = filter.Page.GetValueOrDefault();
                var PageSize = filter.PageSize.GetValueOrDefault();

                var list = query.Skip((Page - 1) * PageSize).Take(PageSize);

                return new PagedResult<TEntity>(total, await list.ToListAsync());
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }
        }

        protected virtual TFilter CompleteFilterPageList<TFilter>(TFilter filter)
            where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new()
        {
            if (filter == null)
            {
                filter = new TFilter();
            }

            if (!filter.Page.HasValue || filter.Page == 0)
            {
                filter.Page = 1;
            }

            if (!filter.PageSize.HasValue || filter.PageSize == 0)
            {
                filter.PageSize = int.MaxValue;
            }

            return filter;
        }



        public virtual async Task<PagedResult<result>> FindAllAsync<result>(Expression<Func<TEntity, bool>> predicate,
                                                                            Expression<Func<TEntity, result>> select,
                                                                            List<Expression<Func<TEntity, Object>>> includeExpression = null)
              where result : class, new()
        {
            try
            {
                IQueryable<TEntity> query = Context.Set<TEntity>().Where(predicate).AsQueryable();
                var total = await query.CountAsync();

                if (includeExpression != null)
                {
                    foreach (var include in includeExpression)
                    {
                        query = query.Include(include);
                    }

                }
                return new PagedResult<result>(total, await query.Select(select).ToListAsync());
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }

        }








        public virtual async Task<bool> ExistExpression(Expression<Func<TEntity, bool>> predicate)
        {
            try
            {
                var any = await Context.Set<TEntity>().AnyAsync(predicate);
                return any;
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }
        }




        protected virtual void HandleException(Exception ex)
        {

            this.logger.LogError(ex.ToString());

            if (ex is DbUpdateException)
            {

                if (ex.InnerException != null)
                {
                    var sqlex = ex.InnerException as SqlException;
                    if (sqlex != null)
                    {
                        switch (sqlex.Number)
                        {
                            case 547:
                                {
                                    MachSqlException(ex.InnerException.Message);//FK exception
                                    if (ex.InnerException.Message.Contains("INSERT"))
                                    {
                                        throw new ValidationException("No se puede agregar la Entidad por que hay relaciones que son requeridas");
                                    }
                                    else {
                                        throw new ValidationException("No se puede eliminar la Entidad por que está siendo utilizada");
                                    }
                                    
                                }
                            case 2627:
                                {
                                    MachSqlException(ex.InnerException.Message);//UK exception
                                    throw new ValidationException("No se puede generar la operación, porque existe una restricción de clave unica");
                                }
                            case 2601:
                                throw new ValidationException("La entidad ya existe"); //primary key exception
                            default:
                                throw new Exception(ex.InnerException.Message, ex);
                        }
                    }


                    throw new Exception(ex.InnerException.Message, ex);
                }
            }

            throw ex;
        }

        protected virtual void MachSqlException(string ExceptionMessage)
        {
            var MachKeySqlException = GetMachKeySqlException();

            var Value = MachKeySqlException.Where(e => ExceptionMessage.Contains(e.Key)).Select(e => e.Value).FirstOrDefault();
            if (Value != null)
            {
                throw new ValidationException(Value);
            }
        }

        protected virtual Dictionary<String, string> GetMachKeySqlException()
        {
            return new Dictionary<string, string>();
        }

        public async virtual Task<List<TEntity>> GetAllAsync<TFilter>(TFilter filter = null) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new()
        {
            try
            {
                filter = this.CompleteFilterPageList(filter);


                IQueryable<TEntity> query = Context.Set<TEntity>().Where(filter.GetFilterExpression()).AsQueryable();

                if (filter.GetIncludesForPageList() != null)
                {
                    foreach (var include in filter.GetIncludesForPageList())
                    {
                        query = query.Include(include);
                    }

                }

                if (!String.IsNullOrEmpty(filter.Sort))
                {
                    query = System.Linq.Dynamic.Core.DynamicQueryableExtensions.OrderBy(query, filter.Sort);
                }

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }
        }
    }
}
