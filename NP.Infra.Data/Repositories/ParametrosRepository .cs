using System;
using TECSO.FWK.Infra.Data;
using TECSO.FWK.Infra.Data.Repositories;
using System.Linq.Expressions;
using NP.infra.Data.Contexto;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;

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

        public override async Task<Parametros> UpdateAsync(Parametros entity)
        {
            try
            {
                Context.Entry(entity).State = EntityState.Modified;

                Context.Entry(entity).Property(e => e.Token).IsModified = false;
                Context.Entry(entity).Property(e => e.TipoDatoId).IsModified = false;

                await base.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                HandleException(ex);
                throw;
            }
        }
    }
}
