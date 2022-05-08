using System;
using TECSO.FWK.Infra.Data;
using TECSO.FWK.Infra.Data.Repositories;
using System.Linq.Expressions;
using NP.infra.Data.Contexto;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Repositories;

namespace NP.infra.Data.Repositories
{
    public class ParametrosRepository : RepositoryBase<AdminContext, Parametros, int>, IParametrosRepository
    {

        public ParametrosRepository(IAdminDbContext _context)
            :base(new DbContextProvider<AdminContext>(_context))
        {

        }

        public override Expression<Func<Parametros, bool>> GetFilterById(int id)
        {
            return e => e.Id == id;
        }
    }
}
