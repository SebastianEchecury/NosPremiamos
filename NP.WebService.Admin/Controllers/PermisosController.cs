using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;

namespace NP.WebService.Admin.Controllers
{
    [Route("api/[controller]")]
    //[TECSO.FWK.ApiServices.Filters.ApiAuthorize]
    // [Authorize]
    public class PermisosController : TECSO.FWK.ApiServices.ControllerBase
    {
        private IPermisosAppService Service;

        public PermisosController(IPermisosAppService _Service)
        {
            this.Service = _Service;
        }
        
        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            try
            {
                String[] entity = await this.Service.GetPermissionForCurrentUser();

                return ReturnData(entity);
            }
            catch (Exception ex)
            {
                return ReturnError<EmpleadosDto>(ex);
            }
        }

    }

 
}