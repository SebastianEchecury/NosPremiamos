using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Entities.Filters;
using NP.Admin.Domain.Interfaces.Repositories;
using NP.Admin.Domain.Interfaces.Services;
using System.Threading.Tasks;
using TECSO.FWK.Caching;
using TECSO.FWK.Domain.Entities;
using TECSO.FWK.Domain.Services;

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

    }
    
}
