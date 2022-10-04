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
using System.ComponentModel.DataAnnotations;

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

        public async Task<List<VotosEmitidos>> VotosEmitidos(int empleadoId, DateTime fechaVoto, string categoria, string aprobador, string votado, string motivo)
        {
            List<VotosEmitidos> ranking = new List<VotosEmitidos>();

            var sp = this.Context.LoadStoredProc("dbo.Votos_VotosEmitidosEmpleado")
                .WithSqlParam("@empleadoVotanteId", new SqlParameter("@empleadoVotanteId", empleadoId))
                .WithSqlParam("@fechaVoto", new SqlParameter("@fechaVoto", fechaVoto));

            if (!String.IsNullOrEmpty(categoria))
                sp.WithSqlParam("@categoria", new SqlParameter("@categoria", categoria));
            else
                sp.WithSqlParam("@categoria", new SqlParameter("@categoria", DBNull.Value));

            if (!String.IsNullOrEmpty(aprobador))
                sp.WithSqlParam("@aprobador", new SqlParameter("@aprobador", aprobador));
            else
                sp.WithSqlParam("@aprobador", new SqlParameter("@aprobador", DBNull.Value));

            if (!String.IsNullOrEmpty(votado))
                sp.WithSqlParam("@votado", new SqlParameter("@votado", votado));
            else
                sp.WithSqlParam("@votado", new SqlParameter("@votado", DBNull.Value));

            if (!String.IsNullOrEmpty(motivo))
                sp.WithSqlParam("@motivo", new SqlParameter("@motivo", motivo));
            else
                sp.WithSqlParam("@motivo", new SqlParameter("@motivo", DBNull.Value));

            await sp.ExecuteStoredProcAsync((handler) =>
            {
                ranking = handler.ReadToList<VotosEmitidos>().ToList();
            });

            return ranking;
        }

        public async Task<List<VotosEmitidos>> VotosRecibidos(int empleadoId, DateTime fechaVoto, string categoria, string aprobador, string votante, string motivo)
        {
            List<VotosEmitidos> ranking = new List<VotosEmitidos>();

            var sp = this.Context.LoadStoredProc("dbo.Votos_VotosRecibidosEmpleado")
                .WithSqlParam("@empleadoVotadoId", new SqlParameter("@empleadoVotadoId", empleadoId))
                .WithSqlParam("@fechaVoto", new SqlParameter("@fechaVoto", fechaVoto));

            if (!String.IsNullOrEmpty(categoria))
                sp.WithSqlParam("@categoria", new SqlParameter("@categoria", categoria));
            else
                sp.WithSqlParam("@categoria", new SqlParameter("@categoria", DBNull.Value));

            if (!String.IsNullOrEmpty(aprobador))
                sp.WithSqlParam("@aprobador", new SqlParameter("@aprobador", aprobador));
            else
                sp.WithSqlParam("@aprobador", new SqlParameter("@aprobador", DBNull.Value));

            if (!String.IsNullOrEmpty(votante))
                sp.WithSqlParam("@votante", new SqlParameter("@votante", votante));
            else
                sp.WithSqlParam("@votante", new SqlParameter("@votante", DBNull.Value));

            if (!String.IsNullOrEmpty(motivo))
                sp.WithSqlParam("@motivo", new SqlParameter("@motivo", motivo));
            else
                sp.WithSqlParam("@motivo", new SqlParameter("@motivo", DBNull.Value));

            await sp.ExecuteStoredProcAsync((handler) =>
            {
                ranking = handler.ReadToList<VotosEmitidos>().ToList();
            });

            return ranking;
        }

        public override Task<Votos> UpdateAsync(Votos entity)
        {
            if (string.IsNullOrEmpty(entity.MotivoRechazo))
            {
                entity.Aprobado = true;
            }
            else
            {
                entity.Aprobado = false;
            }
            entity.FechaAprobado = DateTime.Now;
            return base.UpdateAsync(entity);
        }

        public override Task<Votos> AddAsync(Votos entity)
        {
            //Control Parametros

            var cantVotosXMes = Context.Parametros.FirstOrDefault(e => e.Token == "cantidad_votos_mes").Valor;

            var votosXMes = Context.Votos.Where(v => v.VotanteEmpleadoId == entity.VotanteEmpleadoId && v.FechaVoto.Month == DateTime.Now.Month && v.FechaVoto.Year == DateTime.Now.Year && v.Aprobado != false ).ToList();

            if(votosXMes.Count() >= Convert.ToInt32(cantVotosXMes))
            {
                throw new ValidationException("Ya llego al máximo de votaciones por mes");
            }
            var cantVotosXCategoria = Context.Parametros.FirstOrDefault(e => e.Token == "cantidad_votos_votacion_empleado").Valor;

            var votosEnCategoria = votosXMes.Where(v=> v.CategoriaId == entity.CategoriaId).ToList();

            if(votosEnCategoria.Count() >= Convert.ToInt32(cantVotosXCategoria))
            {
                throw new ValidationException("Ya llego al máximo de votaciones por mes por categoría");
            }

            var cantVotosXVotado = Context.Parametros.FirstOrDefault(e => e.Token == "cantidad_votos_votacion_mismo_asociado").Valor;

            var votosAlVotante = votosEnCategoria.Where(v => v.VotadoEmpleadoId == entity.VotadoEmpleadoId).ToList();

            if (votosAlVotante.Count() >= Convert.ToInt32(cantVotosXVotado))
            {
                throw new ValidationException("Ya llego al máximo de votaciones al mismo asociado para la categoría en el mes");
            }


            return base.AddAsync(entity);
        }
    }
}
