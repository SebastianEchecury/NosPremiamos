using EOH.Admin.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Interfaces.Entities;
using TECSO.FWK.Domain.Interfaces.Repositories;

namespace EOH.Admin.Domain.Interfaces.Repositories
{
    public interface IUserRepository : IRepositoryBase<SysUsers,int>
    {
        Task<List<SysUsersRoles>> GetUserRoles(int id);
        Task<SysUsers> GetUser(string Username);
        Task<List<SysPermissions>> GetGrantedPermissionsAsync(int UserId);
        Task SetGrantedPermissionsAsync(int userId, List<string> grantedPermissionNames);
        
        
    }
}
