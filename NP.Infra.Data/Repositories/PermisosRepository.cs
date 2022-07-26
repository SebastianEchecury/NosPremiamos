using System;
using System.Collections.Generic;
using TECSO.FWK.Infra.Data;
using TECSO.FWK.Infra.Data.Repositories;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NP.infra.Data.Contexto;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Repositories;

namespace NP.infra.Data.Repositories
{
    public class PermisosRepository : RepositoryBase<AdminContext, Permisos, int>, IPermisosRepository
    {
        public PermisosRepository(IAdminDbContext _context)
            : base(new DbContextProvider<AdminContext>(_context))
        {

        }

        public override Expression<Func<Permisos, bool>> GetFilterById(int id)
        {
            return e => e.Id == id;
        }


        public override async Task<List<Permisos>> GetAllAsync<TFilter>(TFilter filter = null)
        {
            try
            {
                filter = this.CompleteFilterPageList(filter);

                IQueryable<Permisos> query = Context.Set<Permisos>()
                            .Include("PageNavigation")
                            .Include("AreaNavigation")
                            .Where(filter.GetFilterExpression()).AsQueryable();


                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }
        }

        

        public async Task<string[]> GetPermissionForCurrentUser()
        {
            try
            {
                
                var UserID = Context.GetAuditUserId();

                return await GetPermissionForUser(UserID.GetValueOrDefault());
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }
        }

        public async Task<string[]> GetPermissionForUser(int id)
        {
            var ur = Context.EmpleadosRoles.Where(u => u.EmpleadoId == id ).Select(e => e.RolId).ToList();

            var result = await this.Context.Permisos.Where(
                e => e.RolesPermisos.Any(r => ur.Contains(r.RolId) )
                ).Select(s => s.Nombre).ToListAsync();

            return result.Distinct().ToArray();
        }
    }
}
