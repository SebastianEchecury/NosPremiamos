using Microsoft.AspNetCore.Mvc;
using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Entities.Filters;
using TECSO.FWK.ApiServices;

namespace NP.WebService.Admin.Controllers
{
    //[Route("[controller]/[action]")]
    // [TECSO.FWK.ApiServices.Filters.ApiAuthorize]
    [Route("api/[controller]")]
    public class RolesController : ManagerController<Roles, int, RolesDto, RoleFilter, IRoleAppService>
    {
        public RolesController(IRoleAppService service)
            : base(service)
        {

            //Admin.User.Permisos

        }


        //protected override void InitializePermission()
        //{
        //    this.InitializePermissionByDefault("Admin", "Rol");
        //    this.PermissionContainer.AddPermission("UpdateRolePermissions", "Admin", "Rol", "Permisos");
        //}

        //[HttpGet]
        //[Route("[action]")]
        //public async Task<IActionResult> GetRolePermissionsForEdit(int id)
        //{
        //    try
        //    {
        //        return ReturnData(await (this.Service as IRoleAppService).GetRolePermissionsForEdit(id));
        //    }
        //    catch (Exception ex)
        //    {
        //        return ReturnError<GetPermissionsForEditOutput>(ex);
        //    }
        //}
      


    }


 

}
