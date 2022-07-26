using TECSO.FWK.AppService;
using NP.Domain.Entities;
using NP.Admin.Domain.Interfaces.Services;
using NP.Admin.AppService.Model;
using NP.Admin.AppService.Interface;

namespace NP.Admin.AppService
{

    public class TipoDatoAppService : AppServiceBase<TipoDato, TipoDatoDto, int, ITipoDatoService>, ITipoDatoAppService
    {


        public TipoDatoAppService(ITipoDatoService serviceBase)
            : base(serviceBase)
        {
        }

        
    }
}
