using System;
using TECSO.FWK.Infra.Data;
using TECSO.FWK.Infra.Data.Repositories;
using System.Linq.Expressions;
using NP.infra.Data.Contexto;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Repositories;
using NP.Domain.Entities;

namespace NP.infra.Data.Repositories
{
    public class VotosRepository : RepositoryBase<AdminContext, Votos, int>, IVotosRepository
    {

        public VotosRepository(IAdminDbContext _context)
            :base(new DbContextProvider<AdminContext>(_context))
        {

        }

        public override Expression<Func<Votos, bool>> GetFilterById(int id)
        {
            return e => e.Id == id;
        }
    }
}
