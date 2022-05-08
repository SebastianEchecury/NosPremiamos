using EOH.Admin.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Interfaces.Repositories;

namespace EOH.Admin.Domain.Interfaces.Repositories
{
    public interface IRoleRepository : IRepositoryBase<SysRoles, int>
    {
        Task<List<SysPermissions>> GetGrantedPermissionsAsync(int RolId);
        Task SetGrantedPermissionsAsync(int RolId, List<string> grantedPermissionNames);
    }
}
