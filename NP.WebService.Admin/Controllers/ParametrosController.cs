using Microsoft.AspNetCore.Mvc;
using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Entities.Filters;
using System.Threading.Tasks;
using TECSO.FWK.ApiServices;

namespace NP.WebService.Admin.Controllers
{
    [Route("api/[controller]")]
    public class ParametrosController : ManagerController<Parametros, int, ParametrosDto, ParametrosFilter, IParametrosAppService>
    {
        public ParametrosController(IParametrosAppService service)
            : base(service)
        {


        }
        
        [NonAction]
        public override Task<IActionResult> DeleteById(int Id)
        {
            return base.DeleteById(Id);
        }

        [NonAction]
        public override Task<IActionResult> UpdateEntity([FromBody] ParametrosDto dto)
        {
            return base.UpdateEntity(dto);
        }

        [NonAction]
        public override Task<IActionResult> SaveNewEntity([FromBody] ParametrosDto dto)
        {
            return base.SaveNewEntity(dto);
        }



    }


 

}
