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
    public class VotosController : ManagerController<Votos, int, VotosDto, VotosFilter, IVotosAppService>
    {
        public VotosController(IVotosAppService service)
            : base(service)
        {


        }
        
       

    }


 

}
