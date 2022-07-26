using System;
using System.Collections.Generic;
using System.Text;
using TECSO.FWK.Domain.Interfaces;
using TECSO.FWK.Domain.Interfaces.Repositories;

namespace EOH.Admin.Domain.Interfaces.Repositories
{
    public interface IAdminDbContext : IDbContext
    {
    }

    public interface IAdminDBResilientTransaction : IResilientTransaction<IAdminDbContext> 
    {
        
    }

}
