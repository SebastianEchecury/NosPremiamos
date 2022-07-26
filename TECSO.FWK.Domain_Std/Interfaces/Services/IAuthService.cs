using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TECSO.FWK.Domain.Interfaces.Services
{
    public interface IAuthService
    {
        int GetCurretUserId();

        string GetCurretRosentalCod();

        string GetCurretUserName();

        string GetCurretToken();

        string GetSessionID();

        int GetCurretCountryId();


    }

    public interface IPermissionProvider
    {
        Task<string[]> GetPermissionForCurrentUser();
    }

}
