using System;
using TECSO.FWK.Infra.Data;
using TECSO.FWK.Infra.Data.Repositories;
using System.Linq.Expressions;
using NP.infra.Data.Contexto;
using NP.Domain.Entities;
using NP.Admin.Domain.Interfaces.Repositories;

namespace NP.infra.Data.Repositories
{
    public class TipoDatoRepository : RepositoryBase<AdminContext, TipoDato, int>, ITipoDatoRepository
    {

        public TipoDatoRepository(IAdminDbContext _context)
            :base(new DbContextProvider<AdminContext>(_context))
        {

        }

        public override Expression<Func<TipoDato, bool>> GetFilterById(int id)
        {
            return e => e.Id == id;
        }
    }
}
