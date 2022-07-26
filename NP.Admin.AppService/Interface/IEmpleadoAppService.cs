using NP.Admin.AppService.Model;
using NP.Domain.Entities;
using TECSO.FWK.AppService.Interface;

namespace NP.Admin.AppService.Interface
{
    public interface IEmpleadoAppService : IAppServiceBase<Empleados, EmpleadosDto, int>
    {
        //Task<Empleados> Login(string Username, string Password);


        ////Task<string[]> GetPermissionForCurrentUser();
        //Task<ResetPasswordOutput> ResetPassword(ResetPasswordInput input);

        //Task<String> ResetPassword(int id);

        //Task<EmpleadosDto> GetUserByEmailAsync(string email);
        //Task ResetPassword(int id);
    }
}
