using TECSO.FWK.AppService;
using TECSO.FWK.Domain.Interfaces.Services;
using NP.Domain.Entities;
using NP.Admin.AppService.Model;
using NP.Admin.AppService.Interface;
using NP.Admin.Domain.Interfaces.Services;
using NP.Admin.Domain.Url;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using NP.Admin.Domain;
using NP.Admin.Domain.Entities;

namespace NP.Admin.AppService
{

    public class EmpleadoRolesAppService : AppServiceBase<EmpleadosRoles, EmpleadosRolesDto, int, IEmpleadoRolesService>, IEmpleadoRolesAppService
    {

        public EmpleadoRolesAppService(IEmpleadoRolesService serviceBase)            
            : base(serviceBase)
        {
            
        }

       
       
    }
}
