using NP.Admin.AppService.Model;
using NP.Admin.Domain;
using NP.Domain.Entities;
using System;
using System.Threading.Tasks;
using TECSO.FWK.AppService.Interface;

namespace NP.Admin.AppService.Interface
{
    public interface IEmpleadoAppService : IAppServiceBase<Empleados, EmpleadosDto, int>
    {
        Task<Empleados> Login(string Username, string Password);


        ////Task<string[]> GetPermissionForCurrentUser();
        //Task<ResetPasswordOutput> ResetPassword(ResetPasswordInput input);

        Task<bool> ResetPassword(ResetPasswordInput input);

        //Task<EmpleadosDto> GetUserByEmailAsync(string email);
        //Task ResetPassword(int id);
    }
}
