using System;
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
    [TECSO.FWK.ApiServices.Filters.ApiAuthorize]
    public class EmpleadosController : ManagerSecurityController<Empleados, int, EmpleadosDto, EmpleadosFilter, IEmpleadoAppService>
    {
        private IEmpleadoAppService userAppService;
        private IMemoryCache _cache;
        private readonly IPermisosAppService permissionAppService;

        public EmpleadosController(IEmpleadoAppService service, IEmpleadoAppService _userAppService, IMemoryCache memoryCache, IPermisosAppService _permissionAppService)
            : base(service)
        {
            userAppService = _userAppService;
            _cache = memoryCache;
            permissionAppService = _permissionAppService;
        }

        protected override void InitializePermission()
        {
            this.InitializePermissionByDefault("Admin", "User");
            this.PermissionContainer.AddPermission("UpdateUserPermissions", "Admin", "User", "Permisos");
            this.PermissionContainer.AddPermission("ResetPassword", "Admin", "User", "Modificar");
            this.PermissionContainer.AddPermission("SetUserLineasForEdit", "Admin", "User", "Modificar");
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

        [NonAction]
        public override Task<IActionResult> DeleteById(int Id)
        {
            return base.DeleteById(Id);
        }

        [NonAction]
        public override Task<IActionResult> SaveNewEntity([FromBody] EmpleadosDto dto)
        {
            return base.SaveNewEntity(dto);
        }

        [NonAction]
        public override Task<IActionResult> UpdateEntity([FromBody] EmpleadosDto dto)
        {
            return base.UpdateEntity(dto);
        }


    }
}