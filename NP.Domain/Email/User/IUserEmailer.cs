using NP.Domain.Entities;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace NP.Admin.Domain
{
    public interface IUserEmailer
    {       

        Task SendEmail(string emailAddress, string subject, StringBuilder emailTemplate, StringBuilder mailMessage);

        Task SendEmail(MailMessage mail);

    }
}
