using NP.Admin.Domain.Entities;
using NP.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Interfaces.Repositories;

namespace NP.Admin.Domain.Interfaces.Repositories
{
    public interface IEmpleadoRepository : IRepositoryBase<Empleados,int>
    {
        Task<List<EmpleadosRoles>> GetUserRoles(int id);
        Task<Empleados> GetUser(string Username);
        Task<List<Permisos>> GetGrantedPermissionsAsync(int UserId);
        Task SetGrantedPermissionsAsync(int userId, List<string> grantedPermissionNames);
        
        
    }
}
