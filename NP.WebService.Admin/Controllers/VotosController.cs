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
    }


 

}
