using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Repositories;
using NP.Admin.Domain.Interfaces.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Services;

namespace NP.Admin.Domain.Services
{
    public class RoleService : ServiceBase<Roles,int, IRoleRepository>, IRoleService
    {
         
        public RoleService(IRoleRepository repository)
            : base(repository)
        {
            
        }

        public async Task<List<Permisos>> GetGrantedPermissionsAsync(int rolId)
        {
            return await repository.GetGrantedPermissionsAsync(rolId);
        }

        public async Task SetGrantedPermissionsAsync(int rolId, List<string> grantedPermissionNames)
        {
            await repository.SetGrantedPermissionsAsync(rolId, grantedPermissionNames);
        }


        public override async Task DeleteAsync(int id)
        {
            //var role = await this.repository.GetByIdAsync(id);
            //if (role.IsStatic)
            //{
            //    throw new DomainValidationException("No se puede eliminar un Rol de sistema");
            //}
            //await base.DeleteAsync(id);
        }



    }
    
}
