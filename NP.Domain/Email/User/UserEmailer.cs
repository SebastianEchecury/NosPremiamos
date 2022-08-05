using NP.Admin.Domain;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using TECSO.FWK.Domain.bus;
using TECSO.FWK.Domain.Mail;

namespace NP.Domain.Email.User
{
    public class UserEmailer : IUserEmailer, ITransientDependency
    {
        private readonly IEmailSender _emailSender;
        
        public UserEmailer(
            IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }


        public async Task SendEmail(string emailAddress, string subject, StringBuilder emailTemplate, StringBuilder mailMessage)
        {
            await SendEmail(new MailMessage
            {
                To = { emailAddress },
                Subject = subject,
                Body = emailTemplate.ToString(),
                IsBodyHtml = true
            });
        }

        public async Task SendEmail(MailMessage mail)
        {
            await _emailSender.SendAsync(mail);
        }
    }
}
