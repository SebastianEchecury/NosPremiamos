using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using TECSO.FWK.AppService;

namespace NP.Admin.AppService
{

    public class CategoriasAppService : AppServiceBase<Categorias, CategoriasDto, int, ICategoriasService>, ICategoriasAppService
    {
        public CategoriasAppService(ICategoriasService serviceBase) 
            :base(serviceBase)
        {
         
        } 
    }
}
