using System;
using TECSO.FWK.Infra.Data;
using TECSO.FWK.Infra.Data.Repositories;
using System.Linq.Expressions;
using NP.infra.Data.Contexto;
using NP.Admin.Domain.Interfaces.Repositories;
using NP.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using NP.Domain.Entities.CustomEntities;
using Snickler.EFCore;
using System.Data.SqlClient;
using System.Linq;

namespace NP.infra.Data.Repositories
{
    public class CategoriasRepository : RepositoryBase<AdminContext, Categorias, int>, ICategoriasRepository
    {
        public CategoriasRepository(IAdminDbContext _context)
            :base(new DbContextProvider<AdminContext>(_context))
        {

        }

        public override Expression<Func<Categorias, bool>> GetFilterById(int id)
        {
            return e => e.Id == id;
        }

        public async Task<List<Ganadores>> Ganadores(DateTime fechaVoto, string filtroNombre, string filtroCategoria)
        {
            List<Ganadores> ranking = new List<Ganadores>();

            var sp = this.Context.LoadStoredProc("dbo.Categorias_Ganadores");
            if (string.IsNullOrEmpty(filtroNombre)) 
                sp.WithSqlParam("@filtroNombre", new SqlParameter("@filtroNombre", DBNull.Value));
            else
                sp.WithSqlParam("@filtroNombre", new SqlParameter("@filtroNombre", filtroNombre));

            if (string.IsNullOrEmpty(filtroCategoria))
                sp.WithSqlParam("@filtroCategoria", new SqlParameter("@filtroCategoria", DBNull.Value));
            else
                sp.WithSqlParam("@filtroCategoria", new SqlParameter("@filtroCategoria", filtroCategoria));


            sp.WithSqlParam("@fechaVoto", new SqlParameter("@fechaVoto", fechaVoto));

            await sp.ExecuteStoredProcAsync((handler) =>
            {
                ranking = handler.ReadToList<Ganadores>().ToList();
            });

            return ranking;
        }
    }
}
