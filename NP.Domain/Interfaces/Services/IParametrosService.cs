using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Entities.Filters;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Entities;
using TECSO.FWK.Domain.Interfaces.Services;

namespace NP.Admin.Domain.Interfaces.Services
{
    public interface IParametrosService : IServiceBase<Parametros, int>
    {
        Task<PagedResult<Parametros>> GetAllParameters(ParametrosFilter parametersFilter);
    }
}
