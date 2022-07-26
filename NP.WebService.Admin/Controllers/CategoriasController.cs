using Microsoft.AspNetCore.Mvc;
using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities.Filters;
using NP.Domain.Entities;
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
        
        [NonAction]
        public override Task<IActionResult> DeleteById(int Id)
        {
            return base.DeleteById(Id);
        }

    }


 

}
