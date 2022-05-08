using NP.Admin.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Interfaces.Repositories;

namespace NP.Admin.Domain.Interfaces.Repositories
{
    public interface IRoleRepository : IRepositoryBase<Roles, int>
    {
        Task<List<Permisos>> GetGrantedPermissionsAsync(int RolId);
        Task SetGrantedPermissionsAsync(int RolId, List<string> grantedPermissionNames);
    }
}
