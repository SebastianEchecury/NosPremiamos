using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities;
using TECSO.FWK.AppService.Interface;

namespace NP.Admin.AppService.Interface
{
    public interface IRoleAppService : IAppServiceBase<Roles,RolesDto,int>
    {
    }
}
