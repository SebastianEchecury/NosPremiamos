using NP.Admin.Domain.Entities;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Interfaces.Services;

namespace NP.Admin.Domain.Interfaces.Services
{
    public interface IPermisosService : IServiceBase<Permisos, int>
    {
        Task<string[]> GetPermissionForCurrentUser();

        Task<string[]> GetPermissionForUser(int id);
    }
}
