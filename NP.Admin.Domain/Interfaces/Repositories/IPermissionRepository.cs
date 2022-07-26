using EOH.Admin.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Interfaces.Repositories;

namespace EOH.Admin.Domain.Interfaces.Repositories
{
    public interface IPermissionRepository : IRepositoryBase<SysPermissions, long>
    {
        Task<string[]> GetPermissionForCurrentUser();
    }
}
