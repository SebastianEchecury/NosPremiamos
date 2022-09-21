using System;
using TECSO.FWK.Infra.Data;
using TECSO.FWK.Infra.Data.Repositories;
using System.Linq.Expressions;
using NP.infra.Data.Contexto;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Repositories;
using NP.Domain.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Entities;

namespace NP.infra.Data.Repositories
{
    public class EmpleadosCategoriasAprobadoresRepository : RepositoryBase<AdminContext, EmpleadosCategoriasAprobadores, int>, IEmpleadosCategoriasAprobadoresRepository
    {

        public EmpleadosCategoriasAprobadoresRepository(IAdminDbContext _context)
            :base(new DbContextProvider<AdminContext>(_context))
        {

        }

        public override Expression<Func<EmpleadosCategoriasAprobadores, bool>> GetFilterById(int id)
        {
            return e => e.Id == id;
        }

        protected override IQueryable<EmpleadosCategoriasAprobadores> AddIncludeForGet(DbSet<EmpleadosCategoriasAprobadores> dbSet)
        {
            return base.AddIncludeForGet(dbSet).Include(e=>e.Empleado);
        }



    }
}
