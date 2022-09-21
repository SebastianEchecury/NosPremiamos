using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using TECSO.FWK.AppService;

namespace NP.Admin.AppService
{

    public class EmpleadosCategoriasAprobadoresAppService : AppServiceBase<EmpleadosCategoriasAprobadores, EmpleadosCategoriasAprobadoresDto, int, IEmpleadosCategoriasAprobadoresService>, IEmpleadosCategoriasAprobadoresAppService
    {
        public EmpleadosCategoriasAprobadoresAppService(IEmpleadosCategoriasAprobadoresService serviceBase) 
            :base(serviceBase)
        {
         
        } 
    }
}
