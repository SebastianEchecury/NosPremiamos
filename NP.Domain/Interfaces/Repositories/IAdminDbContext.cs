using TECSO.FWK.Domain.Interfaces;
using TECSO.FWK.Domain.Interfaces.Repositories;

namespace NP.Admin.Domain.Interfaces.Repositories
{
    public interface IAdminDbContext : IDbContext
    {
    }

    public interface IAdminDBResilientTransaction : IResilientTransaction<IAdminDbContext> 
    {
        
    }

}
