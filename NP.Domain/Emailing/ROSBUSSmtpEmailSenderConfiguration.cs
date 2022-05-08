using Microsoft.Extensions.Configuration;
using TECSO.FWK.Domain.Mail.Smtp;

namespace NP.Admin.Domain.Emailing
{
    public class SWSmtpEmailSenderConfiguration : SmtpEmailSenderConfiguration
    {
        public SWSmtpEmailSenderConfiguration(IConfiguration settingManager) : base(settingManager)
        {
           
        }
        //public override string Password => SimpleStringCipher.Instance.Decrypt(GetNotEmptySettingValue(EmailSettingNames.Smtp.Password));
    }
}