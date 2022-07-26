using NP.Admin.Domain.Entities;
using NP.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Interfaces.Services;

namespace NP.Admin.Domain.Interfaces.Services
{
    public interface IEmpleadoService : IServiceBase<Empleados, int>
    {
        Task<Empleados> Login(string Username, string Password);

        Task<List<EmpleadosRoles>> GetUserRoles(int id);
        
        Task<List<Permisos>> GetGrantedPermissionsAsync(int userId);
        Task SetGrantedPermissionsAsync(int id, List<string> grantedPermissionNames);        
    }
}
