using Microsoft.Extensions.Configuration;
using TECSO.FWK.Domain.Mail.Smtp;

namespace EOH.Admin.Domain.Emailing
{
    public class EOHSmtpEmailSenderConfiguration : SmtpEmailSenderConfiguration
    {
        public EOHSmtpEmailSenderConfiguration(IConfiguration settingManager) : base(settingManager)
        {
           
        }
        //public override string Password => SimpleStringCipher.Instance.Decrypt(GetNotEmptySettingValue(EmailSettingNames.Smtp.Password));
    }
}