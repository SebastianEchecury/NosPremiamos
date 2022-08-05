using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Entities.Filters;
using TECSO.FWK.ApiServices;
using TECSO.FWK.ApiServices.Filters;

namespace NP.WebService.Admin.Controllers
{
    [Route("api/[controller]")]
    //[TECSO.FWK.ApiServices.Filters.ApiAuthorize]
    public class EmpleadosRolesController : ManagerController<EmpleadosRoles, int, EmpleadosRolesDto, EmpleadosRolesFilter, IEmpleadoRolesAppService>
    {

      

        public EmpleadosRolesController(IEmpleadoRolesAppService service)
            : base(service)
        {
            
        }

        

      
    }
}