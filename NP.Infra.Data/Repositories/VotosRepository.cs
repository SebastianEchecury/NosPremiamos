using System;
using TECSO.FWK.Infra.Data;
using TECSO.FWK.Infra.Data.Repositories;
using System.Linq.Expressions;
using NP.infra.Data.Contexto;
using NP.Admin.Domain.Entities;
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

        public async Task<List<Ranking>> Ranking(int? categoriaId, DateTime fechaVoto)
        {
            List<Ranking> ranking = new List<Ranking>();

            var sp = this.Context.LoadStoredProc("dbo.Votos_Ranking");
            if(categoriaId.HasValue)
                sp.WithSqlParam("@categoriaID", new SqlParameter("@categoriaID", categoriaId));
            else
                sp.WithSqlParam("@categoriaID", new SqlParameter("@categoriaID", DBNull.Value));
            sp.WithSqlParam("@fechaVoto", new SqlParameter("@fechaVoto", fechaVoto));

            await sp.ExecuteStoredProcAsync((handler) =>
            {
                ranking = handler.ReadToList<Ranking>().ToList();
            });

            return ranking;
        }

        public async Task<List<VotosEmitidos>> VotosEmitidos(int empleadoId, DateTime fechaVoto)
        {
            List<VotosEmitidos> ranking = new List<VotosEmitidos>();

            var sp = this.Context.LoadStoredProc("dbo.Votos_VotosEmitidosEmpleado")
                .WithSqlParam("@empleadoVotanteId", new SqlParameter("@empleadoVotanteId", empleadoId))
                .WithSqlParam("@fechaVoto", new SqlParameter("@fechaVoto", fechaVoto));

            await sp.ExecuteStoredProcAsync((handler) =>
            {
                ranking = handler.ReadToList<VotosEmitidos>().ToList();
            });

            return ranking;
        }

        public async Task<List<VotosEmitidos>> VotosRecibidos(int empleadoId, DateTime fechaVoto)
        {
            List<VotosEmitidos> ranking = new List<VotosEmitidos>();

            var sp = this.Context.LoadStoredProc("dbo.Votos_VotosRecibidosEmpleado")
                .WithSqlParam("@empleadoVotadoId", new SqlParameter("@empleadoVotadoId", empleadoId))
                .WithSqlParam("@fechaVoto", new SqlParameter("@fechaVoto", fechaVoto));

            await sp.ExecuteStoredProcAsync((handler) =>
            {
                ranking = handler.ReadToList<VotosEmitidos>().ToList();
            });

            return ranking;
        }
    }
}
