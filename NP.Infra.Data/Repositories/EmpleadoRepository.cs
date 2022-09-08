using System;
using System.Collections.Generic;
using TECSO.FWK.Infra.Data;
using TECSO.FWK.Infra.Data.Repositories;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NP.infra.Data.Contexto;
using NP.Domain.Entities;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Identity;

namespace NP.infra.Data.Repositories
{
    public class EmpleadoRepository : RepositoryBase<AdminContext, Empleados, int>, IEmpleadoRepository
    {

        public EmpleadoRepository(AdminContext _context, IAdminDbContext a)
            : base(new DbContextProvider<AdminContext>(_context))
        {
            var s = _context.GetHashCode() == a.GetHashCode();
        }

        public override Expression<Func<Empleados, bool>> GetFilterById(int id)
        {
            return e => e.Id == id;
        }

        public async Task<Empleados> GetUser(string Username)
        {
            return await this.Context.Empleados.FirstOrDefaultAsync(e => e.Usuario == Username);
        }

        public async Task<List<EmpleadosRoles>> GetUserRoles(int EmpleadoId)
        {
            return await this.Context.EmpleadosRoles.Where(e => e.EmpleadoId == EmpleadoId).ToListAsync();
        }

        protected override IQueryable<Empleados> AddIncludeForGet(DbSet<Empleados> dbSet)
        {
            return base.AddIncludeForGet(dbSet).Include(e=> e.EmpleadosRoles);
        }
        

       

        


        public async Task<List<Permisos>> GetGrantedPermissionsAsync(int UserId)
        {
            try
            {
                // var result = await this.Context.Permissions.Join(this.Context.PermissionsUsers,
                //       p => p.Id,
                //   u => u.PermissionId,
                //   (per, userper) => new { u = userper, p = per }) // selection
                //.Where(w => w.u.UserId == UserId).Select(s => s.p).ToListAsync();
                // return result;
                var result = await this.Context.Permisos.Where(e => e.Descripcion != null).ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }

        }

        public async Task SetGrantedPermissionsAsync(int userId, List<string> grantedPermissionNames)
        {
            try
            {
                var up = await GetGrantedPermissionsAsync(userId);
                
                var GrantedPermissions = await this.Context.Permisos.Where(e=> e.Descripcion != null).ToListAsync();

                var unassign = up.Except(GrantedPermissions);

                var assign = GrantedPermissions.Except(up);         

                


                await this.Context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }
        }


        public override async Task<Empleados> UpdateAsync(Empleados entity)
        {
            try
            {
                Context.Entry(entity).State = EntityState.Modified;
                if (String.IsNullOrEmpty(entity.Contraseña))
                {
                    Context.Entry(entity).Property(e => e.Contraseña).IsModified = false;                    
                    
                }
                if (!entity.PrimerIngreso.HasValue)
                {
                    Context.Entry(entity).Property(e => e.PrimerIngreso).IsModified = false;
                }
                if (!entity.Eliminado.HasValue)
                {
                    Context.Entry(entity).Property(e => e.Eliminado).IsModified = false;
                }
                await base.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }
        }

        public override Task DeleteAsync(Empleados entity)
        {
            if (entity.Eliminado.Value)
            {
                entity.PrimerIngreso = false;
                entity.Eliminado = false;
                var hp = new PasswordHasher<Empleados>();
                entity.Contraseña = hp.HashPassword(entity, entity.Apellido);
            }
            else { 
                entity.Eliminado = true;
            }

            return this.UpdateAsync(entity);
        }

    }
}
