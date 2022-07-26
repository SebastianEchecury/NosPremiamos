using NP.Admin.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Interfaces.Services;

namespace NP.Admin.Domain.Interfaces.Services
{
    public interface IRoleService : IServiceBase<Roles, int>
    {
        Task<List<Permisos>> GetGrantedPermissionsAsync(int RolId);
        Task SetGrantedPermissionsAsync(int RolId, List<string> grantedPermissionNames);
    }
}
