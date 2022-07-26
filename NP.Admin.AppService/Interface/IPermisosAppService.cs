using NP.Admin.Domain.Entities;
using System.Threading.Tasks;
using TECSO.FWK.AppService.Interface;

namespace NP.Admin.AppService.Interface
{
    public interface IPermisosAppService : IAppServiceBase<Permisos, int>
    {
        Task<string[]> GetPermissionForCurrentUser();
        Task<string[]> GetPermissionForUser(int id);
    }
}
