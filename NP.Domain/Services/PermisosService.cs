using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Repositories;
using NP.Admin.Domain.Interfaces.Services;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Services;

namespace NP.Admin.Domain.Services
{
    public class PermisosService : ServiceBase<Permisos, int, IPermisosRepository>, IPermisosService
    {       
        public PermisosService(IPermisosRepository repository)
            : base(repository)
        {
            
        }

        public async Task<string[]> GetPermissionForCurrentUser()
        {
            return await this.repository.GetPermissionForCurrentUser();
        }

        public async Task<string[]> GetPermissionForUser(int id)
        {
            return await this.repository.GetPermissionForUser(id); 
        }
    }
    
}
