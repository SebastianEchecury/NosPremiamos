using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using TECSO.FWK.Domain;
using TECSO.FWK.Domain.Entities;
using TECSO.FWK.Domain.Interfaces.Services;
using TECSO.FWK.Domain.Interfaces.Entities;
using TECSO.FWK.Domain_Std.Services;
using TECSO.FWK.Domain.Interfaces.Repositories;
using TECSO.FWK.Domain_Std.Interfaces;
using TECSO.FWK.AppService.Interface;
using Newtonsoft.Json;
using TECSO.FWK.AppService.Model;
using System.ComponentModel.DataAnnotations;

namespace TECSO.FWK.Domain.Services
{
    public abstract class ServiceHttpBase : IHttpServiceBase
    {
        protected HttpCustomClient httpClient;

        public abstract string EndPoint { get; }

        protected IConfiguration configuration;

        

        public ServiceHttpBase(ÌRequestIdentifier requestIdentifier)
        {
            configuration = ServiceProviderResolver.ServiceProvider.GetService<IConfiguration>();
            this.httpClient = this.GetHttpClient();
            this.httpClient.SetRequestIdentifier(requestIdentifier);
        }

        protected virtual HttpCustomClient GetHttpClient() {

            //var urlPath = String.Format("{0}{1}/", configuration["IdentityUrl"], this.EndPoint);
            //return new HttpCustomClient(urlPath, "TOKEN");

            throw new NotImplementedException();
        }

        public void Dispose()
        {
            
        }

        public Task<TResponse> Get<TResponse, TFilter>(TFilter filter)
            where TResponse : class
            where TFilter : class
        {
            var response = this.httpClient.GetRequest<TResponse, TFilter>(this.EndPoint, filter);
            Task.Run(() =>
            {
                LogRequestResponse<TResponse, TFilter>(filter, response.Result, "Get");
            });
            return response;
        }

        public Task<TResponse> Post<TResponse, TFilter>(TFilter filter)
            where TResponse : class
            where TFilter : class
        {
            var response = this.httpClient.PostRequest<TResponse, TFilter>(this.EndPoint, filter);
            Task.Run(() =>
            {
                LogRequestResponse<TResponse, TFilter>(filter, response.Result, "Post");
            });
            return response;
        }

        private async Task LogRequestResponse<TResponse, TFilter>(TFilter filter, TResponse response, string action)
        {
            var _logger = ServiceProviderResolver.ServiceProvider.GetService<ILogger>();
            StringBuilder sb = new StringBuilder();
            try
            {
                sb.AppendLine(string.Format("Method: {0} [{1}]", this.EndPoint, action));
                sb.AppendLine(string.Format("Request: {0}", JsonConvert.SerializeObject(filter)));
                sb.AppendLine(string.Format("Response: {0}", response.GetType().GetProperty("Respuesta").GetValue(response, null)));
            }
            catch(Exception e)
            {
                sb.AppendLine(string.Format("ERROR: {0}", e.Message));
            }
            finally
            {
                _logger.LogInformation(sb.ToString());
            }
        }
    }



    public class ServiceBase<TEntity, TPrimaryKey, TRepository> : IServiceBase<TEntity, TPrimaryKey>
         where TEntity : Entity<TPrimaryKey>
        where TRepository: IRepositoryBase<TEntity, TPrimaryKey>
    {
        private readonly TRepository _repository;

        protected TRepository repository
        {
            get
            {
                return _repository;
            }
        }

        public ServiceBase(TRepository repository)
        {
            _repository = repository;
        }



        public virtual Task<TEntity> AddAsync(TEntity entity)
        {
            if (this.ValidateEntity(entity, SaveMode.Add).Result)
            {
                return _repository.AddAsync(entity);
            }

            throw new ValidationException("No es posible agregar la entidad");
        }

       

        public virtual Task<TEntity> AddOrUpdateAsync(TEntity entity)
        {
            return _repository.AddOrUpdateAsync(entity);
        }

        

        public virtual Task DeleteAsync(TPrimaryKey id)
        {            
            return _repository.DeleteAsync(id);
        }

        public void Dispose()
        {
            _repository.Dispose();
        }

        

        public Task<List<TEntity>> GetAllAsync<TFilter>(TFilter filter = null) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new()
        {
            return _repository.GetAllAsync(filter);
        }

       
        public Task<TEntity> GetByIdAsync(TPrimaryKey id)
        {
            return _repository.GetByIdAsync(id);
        }

        

        public Task<TEntity> UpdateAsync(TEntity entity)
        {
            if (this.ValidateEntity(entity, SaveMode.Update).Result)
            {
                return _repository.UpdateAsync(entity);
            }

            throw new ValidationException("No es posible actualizar la entidad");
        }

        protected virtual async Task<bool> ValidateEntity(TEntity entity, SaveMode mode)
        {
            return true;
        }

       

        public Task<PagedResult<TEntity>> GetPagedListAsync<TFilter>(TFilter filter) 
            where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>, new()
        {
            return _repository.GetPagedListAsync(filter);
        }

        public Task<TEntity> GetByIdAsync<TFilter>(TFilter filter) where TFilter : FilterPagedListBase<TEntity, TPrimaryKey>
        {
            return _repository.GetByIdAsync(filter);
        }

        public Task<bool> ExistExpression(Expression<Func<TEntity, bool>> predicate)
        {
            return _repository.ExistExpression(predicate);
        }
    }

    public enum SaveMode
    {
        Add,
        Update,
        Delete
    }
}
