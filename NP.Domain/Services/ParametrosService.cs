using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Entities.Filters;
using NP.Admin.Domain.Interfaces.Repositories;
using NP.Admin.Domain.Interfaces.Services;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using TECSO.FWK.Caching;
using TECSO.FWK.Domain.Entities;
using TECSO.FWK.Domain.Services;
using static NP.Domain.Entities.TipoDato;

namespace NP.Admin.Domain.Services
{
    public class ParametrosService : ServiceBase<Parametros,int, IParametrosRepository>, IParametrosService
    {
        private readonly ICacheManager cacheManager;

        public ParametrosService(IParametrosRepository Repository, ICacheManager _cacheManager)
            : base(Repository)
        {
            cacheManager = _cacheManager;
        }

        public async Task<PagedResult<Parametros>> GetAllParameters(ParametrosFilter parametersFilter)
        {

            var parametrosCache = await cacheManager.GetCache<string, PagedResult<Parametros>>("Parametros")
                                            .GetAsync("AllParametros", e => this.GetPagedListAsync(parametersFilter));



            return parametrosCache;
        }

        protected override async Task<bool> ValidateEntity(Parametros entity, SaveMode mode)
        {
            bool validate = true;

            switch (entity.TipoDatoId)
            {
                case (int)TipoDatoEnum.String:
                    break;
                case (int)TipoDatoEnum.Int32:
                case (int)TipoDatoEnum.Int64:
                    validate = Int64.TryParse(entity.Valor, out long numbreValue);
                    break;
                case (int)TipoDatoEnum.Decimal:
                    validate = Decimal.TryParse(entity.Valor, out decimal decimalValue);
                    break;
                case (int)TipoDatoEnum.Boolean:
                    validate = Boolean.TryParse(entity.Valor, out bool boolValue);
                    break;
                case (int)TipoDatoEnum.DateTime:
                    validate = DateTime.TryParse(entity.Valor, out DateTime dateValue);
                    break;
            }

            if (!validate)
                throw new ValidationException("El valor ingresado es incorrecto");

            return await base.ValidateEntity(entity, mode);
        }
    }
    
}
