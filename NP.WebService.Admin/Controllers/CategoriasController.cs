using Microsoft.AspNetCore.Mvc;
using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities.Filters;
using NP.Domain.Entities;
using NP.Domain.Entities.CustomEntities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TECSO.FWK.ApiServices;

namespace NP.WebService.Admin.Controllers
{
    [Route("api/[controller]")]
    public class CategoriasController : ManagerController<Categorias, int, CategoriasDto, CategoriasFilter, ICategoriasAppService>
    {
        public CategoriasController(ICategoriasAppService service)
            : base(service)
        {
        }

        [HttpGet("GanadoresMensuales")]
        public async Task<IActionResult> GanadoresMensuales()
        {
            try
            {
                var fechaVoto = new DateTime(DateTime.Now.Year, DateTime.Now.Month - 1, 1);
                var result = await this.Service.Ganadores(fechaVoto);
                return ReturnData<List<Ganadores>>(result);
            }
            catch (Exception ex)
            {
                return ReturnError<string>(ex);
            }
        }

        [HttpGet("GanadoresAnuales")]
        public async Task<IActionResult> GanadoresAnuales()
        {
            try
            {
                var fechaVoto = new DateTime(DateTime.Now.Year, 1, 1);
                var result = await this.Service.Ganadores(fechaVoto);
                return ReturnData<List<Ganadores>>(result);
            }
            catch (Exception ex)
            {
                return ReturnError<string>(ex);
            }
        }
    }
}
