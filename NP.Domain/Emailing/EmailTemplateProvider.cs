using NP.Admin.Domain.Url;
using System.Reflection;
using System.Text;
using TECSO.FWK.Extensions;

namespace NP.Admin.Domain.Emailing
{
    public class EmailTemplateProvider : IEmailTemplateProvider
    {
        private readonly IWebUrlService _webUrlService;

        public EmailTemplateProvider(
            IWebUrlService webUrlService)
        {
            _webUrlService = webUrlService;
        }

        public string GetDefaultTemplate()
        {
            using (var stream = typeof(EmailTemplateProvider).GetTypeInfo().Assembly.GetManifestResourceStream("NP.Admin.Domain.Emailing.EmailTemplates.default.html"))
            { 
                var bytes = stream.GetAllBytes();
                var template = Encoding.UTF8.GetString(bytes, 3, bytes.Length - 3);
                return template.Replace("{EMAIL_LOGO_URL}", GetLogoUrl());
            }
        }

        private string GetLogoUrl()
        {
            // HACK: set correct logo
            return "https://www.tecso.coop/wp-content/uploads/2015/10/tecso-logo.png";
            //return _webUrlService.GetServerRootAddress().EnsureEndsWith('/') + "TenantCustomization/GetTenantLogo";
        }
    }
}