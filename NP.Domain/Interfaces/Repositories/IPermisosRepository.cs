using NP.Admin.Domain.Entities;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Interfaces.Repositories;

namespace NP.Admin.Domain.Interfaces.Repositories
{
    public interface IPermisosRepository : IRepositoryBase<Permisos, int>
    {
        Task<string[]> GetPermissionForCurrentUser();
        Task<string[]> GetPermissionForUser(int id);
    }
}
