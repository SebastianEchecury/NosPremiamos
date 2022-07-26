using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Services;
using TECSO.FWK.AppService;

namespace NP.Admin.AppService
{

    public class ParametrosAppService : AppServiceBase<Parametros, ParametrosDto, int, IParametrosService>, IParametrosAppService
    {
        public ParametrosAppService(IParametrosService serviceBase) 
            :base(serviceBase)
        {
         
        } 
    }
}
