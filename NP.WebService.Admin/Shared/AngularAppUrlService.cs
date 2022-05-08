using Microsoft.Extensions.Configuration;
using NP.Admin.Domain.Url;

namespace NP.WebService.Admin.Shared
{
    public class AngularAppUrlService : AppUrlServiceBase
    {
        public override string PasswordResetRoute => "account/reset";

        public AngularAppUrlService(IWebUrlService webUrlService, IConfiguration configuration) : 
            base(webUrlService, configuration
            )
        {

        }
    }
 
}