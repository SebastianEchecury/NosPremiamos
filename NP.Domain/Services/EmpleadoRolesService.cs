using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Entities.Filters;
using NP.Admin.Domain.Interfaces.Repositories;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TECSO.FWK.Domain;
using TECSO.FWK.Domain.Services;

namespace NP.Admin.Domain.Services
{
    public class EmpleadoRolesService : ServiceBase<EmpleadosRoles, int, IEmpleadoRolesRepository>, IEmpleadoRolesService
    {


        public EmpleadoRolesService(IEmpleadoRolesRepository repository)
            : base(repository)
        {
             
        }
       
    }
}
