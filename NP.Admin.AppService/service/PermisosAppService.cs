using NP.Admin.AppService.Interface;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Services;
using System.Threading.Tasks;
using TECSO.FWK.AppService;

namespace NP.Admin.AppService
{

    public class PermisosAppService : AppServiceBase<Permisos, int, IPermisosService>, IPermisosAppService
    {
        public PermisosAppService(IPermisosService serviceBase) 
            :base(serviceBase)
        {
         
        }

        public async Task<string[]> GetPermissionForCurrentUser()
        {
            return await this._serviceBase.GetPermissionForCurrentUser();
        }

        public async Task<string[]> GetPermissionForUser(int id)
        {
            return await this._serviceBase.GetPermissionForUser(id);
        }
    }
}
