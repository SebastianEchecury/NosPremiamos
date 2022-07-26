using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using TECSO.FWK.AppService.Interface;
using TECSO.FWK.Domain;
using Microsoft.Extensions.DependencyInjection;

namespace TECSO.FWK.Domain_Std.SMS
{
    public static class SMSSender
    {

        public static async Task SendSMS(string url, string nroTelefono, string mensaje, string user, string pass)
        {
            ILogger logger = (ILogger)ServiceProviderResolver.ServiceProvider.GetService<ILogger>();
            try
            {
                logger.LogInformation(string.Format("Envío SMS | nroTelefono: {0} - mensaje {1}", nroTelefono, mensaje));

                url = url.Replace("MENSAJE", mensaje);
                url = url.Replace("NUMERO_CEL", nroTelefono);

                var http = (HttpWebRequest)WebRequest.Create(url);
                //http.Accept = "application/json";
                //http.ContentType = "application/json";
                http.Method = "POST";
                http.Credentials = new NetworkCredential(user, pass);

                http.GetResponse();
            }
            catch (Exception ex)
            {
                logger.LogError(string.Format("Envío SMS | nroTelefono: {0} - mensaje {1} - error {2}", nroTelefono, mensaje, ex.Message));
            }

        }
    }
}
