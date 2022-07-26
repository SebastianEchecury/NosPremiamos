using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Services;
using TECSO.FWK.AppService;

namespace NP.Admin.AppService
{

    public class RoleAppService : AppServiceBase<Roles, RolesDto, int, IRoleService>, IRoleAppService
    {
        protected readonly IPermisosService _PermissionService;
        public RoleAppService(IRoleService serviceBase, IPermisosService permissionService) 
            :base(serviceBase)
        {
            _PermissionService = permissionService;
        }
 

    }
}
