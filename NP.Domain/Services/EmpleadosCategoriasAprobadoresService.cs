using NP.Admin.Domain.Interfaces.Repositories;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using TECSO.FWK.Domain.Services;

namespace NP.Admin.Domain.Services
{
    public class EmpleadosCategoriasAprobadoresService : ServiceBase<EmpleadosCategoriasAprobadores, int, IEmpleadosCategoriasAprobadoresRepository>, IEmpleadosCategoriasAprobadoresService
    {
        

        public EmpleadosCategoriasAprobadoresService(IEmpleadosCategoriasAprobadoresRepository Repository)
            : base(Repository)
        {
        }


    }
    
}
