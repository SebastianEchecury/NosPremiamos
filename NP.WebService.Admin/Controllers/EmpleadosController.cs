using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities.Filters;
using NP.Domain.Entities;
using TECSO.FWK.ApiServices;
using TECSO.FWK.ApiServices.Filters;

namespace NP.WebService.Admin.Controllers
{
    [Route("api/[controller]")]
    //[TECSO.FWK.ApiServices.Filters.ApiAuthorize]
    public class EmpleadosController : ManagerController<Empleados, int, EmpleadosDto, EmpleadosFilter, IEmpleadoAppService>
    {

        private readonly IPermisosAppService permissionAppService;

        public EmpleadosController(IEmpleadoAppService service, IPermisosAppService _permissionAppService)
            : base(service)
        {
            permissionAppService = _permissionAppService;
        }

        

       

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetPermissionForCurrentUser()
        {
            try
            {
                return ReturnData(await permissionAppService.GetPermissionForCurrentUser());
            }
            catch (Exception ex)
            {
                return ReturnError<string[]>(ex);
            }
        }        

        

        [HttpPost]
        [ActionAuthorize()]
        [Route("[action]")]
        [NonAction]
        public async Task<IActionResult> ResetPassword(int id)
        { 
            try
            {
               //var code =  await this.Service.ResetPassword(id);
                return ReturnData<string>("tttt");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        

        //public override Task<IActionResult> GetAllAsync(EmpleadosFilter filter)
        //{
        //    return base.GetAllAsync(filter);
        //}

        [HttpGet("GetHeader")]
        public async Task<IActionResult> GetHeader()
        {
            
            var idEmpleado =  authService.GetCurretUserId();

            var empleado = Service.GetByIdAsync(idEmpleado).Result;


            return ReturnData(new
            {
                empleado.Id,
                empleado.Usuario,
                empleado.Nombre,
                empleado.Apellido
            });
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> EmpleadosRepresentantes()
        {
            try
            {
                var result =  Service.EmpleadosRepresentantes();

                return ReturnData<List<EmpleadoRepresentante>>(result);
            }
            catch(Exception ex)
            {
                return ReturnError<string[]>(ex);
            }
        }

    }
}