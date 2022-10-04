using Microsoft.AspNetCore.Mvc;
using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities.Filters;
using NP.Domain.Entities;
using System.Threading.Tasks;
using TECSO.FWK.ApiServices;
using NP.Domain.Entities.CustomEntities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TECSO.FWK.ApiServices;

namespace NP.WebService.Admin.Controllers
{
    [Route("api/[controller]")]
    public class VotosController : ManagerController<Votos, int, VotosDto, VotosFilter, IVotosAppService>
    {
        public VotosController(IVotosAppService service)
            : base(service)
        {


        }

        [HttpGet("RankingMensual")]
        public async Task<IActionResult> RankingMensual(int? categoriaId)
        {
            try
            {
                var dateTime = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                var result = await this .Service.Ranking(categoriaId, dateTime);

                return ReturnData<List<Ranking>>(result);
            }
            catch (Exception ex)
            {
                return ReturnError<string>(ex);
            }
        }

        [HttpGet("RankingAnual")]
        public async Task<IActionResult> RankingAnual(int? categoriaId)
        {
            try
            {
                var dateTime = new DateTime(DateTime.Now.Year, 1, 1);
                var result = await this.Service.Ranking(categoriaId, dateTime);

                return ReturnData<List<Ranking>>(result);
            }
            catch (Exception ex)
            {
                return ReturnError<string>(ex);
            }
        }


        [HttpGet("VotosEmitidos")]
        public async Task<IActionResult> VotosEmitidos(int empleadoId, DateTime fechaVoto, string categoria, string aprobador, string votado, string motivo)
        {
            try
            {
                var result = await this.Service.VotosEmitidos(empleadoId, fechaVoto, categoria, aprobador, votado, motivo);
                return ReturnData<List<VotosEmitidos>>(result);
            }
            catch (Exception ex)
            {
                return ReturnError<string>(ex);
            }
        }


        [HttpGet("VotosRecibidos")]
        public async Task<IActionResult> VotosRecibidos(int empleadoId, DateTime fechaVoto, string categoria, string aprobador, string votante, string motivo)
        {
            try
            {
                var result = await this.Service.VotosRecibidos(empleadoId, fechaVoto, categoria, aprobador, votante, motivo);
                return ReturnData<List<VotosEmitidos>>(result);
            }
            catch (Exception ex)
            {
                return ReturnError<string>(ex);
            }
        }

        public override Task<IActionResult> GetAllAsync(VotosFilter filter)
        {
            if (filter.MisVotos.HasValue && filter.MisVotos.Value)
                return this.VotosRecibidos(filter.UsuarioId,string.IsNullOrEmpty(filter.FechaVoto)? Convert.ToDateTime("01/"+DateTime.Now.Month+"/"+ DateTime.Now.Year): Convert.ToDateTime(filter.FechaVoto), filter.Categoria, filter.Aprobador, filter.Votante, filter.Motivo);

            if (filter.VotosEmitidos.HasValue && filter.VotosEmitidos.Value)
                return this.VotosEmitidos(filter.UsuarioId, string.IsNullOrEmpty(filter.FechaVoto) ? Convert.ToDateTime("01/" + DateTime.Now.Month + "/" + DateTime.Now.Year) : Convert.ToDateTime(filter.FechaVoto), filter.Categoria, filter.Aprobador, filter.Votado, filter.Motivo);

            return base.GetAllAsync(filter);
        }
    }
}
