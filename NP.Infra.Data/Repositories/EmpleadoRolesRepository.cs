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

namespace NP.infra.Data.Repositories
{
    public class EmpleadoRolesRepository : RepositoryBase<AdminContext, EmpleadosRoles, int>, IEmpleadoRolesRepository
    {

        public EmpleadoRolesRepository(AdminContext _context, IAdminDbContext a)
            : base(new DbContextProvider<AdminContext>(_context))
        {
            var s = _context.GetHashCode() == a.GetHashCode();
        }

        public override Expression<Func<EmpleadosRoles, bool>> GetFilterById(int id)
        {
            return e => e.Id == id;
        }


        protected override IQueryable<EmpleadosRoles> AddIncludeForGet(DbSet<EmpleadosRoles> dbSet)
        {
            return base.AddIncludeForGet(dbSet).Include("Rol");
        }
       

    }
}
