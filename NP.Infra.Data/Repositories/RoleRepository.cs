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
    public class RoleRepository : RepositoryBase<AdminContext, Roles, int>, IRoleRepository
    {
        public RoleRepository(IAdminDbContext _context)
            : base(new DbContextProvider<AdminContext>(_context))
        {

        }

        public override Expression<Func<Roles, bool>> GetFilterById(int id)
        {
            return e => e.Id == id;
        }

        public async Task<List<Permisos>> GetGrantedPermissionsAsync(int RoleId)
        {
            try
            {
                var result = await this.Context.Permisos.Where(e => e.RolesPermisos.Any(a => a.RolId == RoleId)).ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }
        } 
 

        public async Task SetGrantedPermissionsAsync(int RoleId, List<string> grantedPermissionNames)
        {
            try
            {
                var rp = await GetGrantedPermissionsAsync(RoleId);

                var GrantedPermissions = await this.Context.Permisos.Where(e => grantedPermissionNames.Contains(e.Nombre)).ToListAsync();

                var rolassign = rp.Except(GrantedPermissions);

                var assign = GrantedPermissions.Except(rp);


                foreach (var item in rolassign)
                {
                    var deleteitem = this.Context.RolesPermisos.Where(e => e.RolId == RoleId && e.PermisoId == item.Id).FirstOrDefault();

                    if (deleteitem != null)
                    {
                        this.Context.Entry(deleteitem).State = EntityState.Deleted;
                    }

                }

                foreach (var item in assign)
                {
                    this.Context.RolesPermisos.Add(new RolesPermisos()
                    {
                        PermisoId = item.Id,
                        RolId = RoleId
                    });
                }


                await this.Context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }
        }

        protected override Dictionary<string, string> GetMachKeySqlException()
        {
            var d = base.GetMachKeySqlException();
            d.Add("UK_sys_roles_name", "El codigo de rol ya existe");
            return d;
        }

    }
}
