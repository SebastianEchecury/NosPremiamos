using EOH.Admin.Domain.Entities;
using EOH.Admin.Domain.Interfaces.Repositories;
using EOH.Admin.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Services;

namespace EOH.Admin.Domain.Services
{
    public class PermissionService : ServiceBase<SysPermissions, long, IPermissionRepository>, IPermissionService
    {       
        public PermissionService(IPermissionRepository repository)
            : base(repository)
        {
            
        }

        public async Task<string[]> GetPermissionForCurrentUser()
        {
            return await this.repository.GetPermissionForCurrentUser();
        }
    }
    
}
