using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace TECSO.FWK.Domain_Std.PushNotification
{
    public static class PushNotification
    {
        public static async Task<HttpResponseMessage> SendPushNotification(string deviceToken, string title, string body, object data, string firebaseFcmServerKey, string firebaseFcmUrl)
        {
            var messageInformation = new Message()
            {
                notification = new Notification()
                {
                    title = title,
                    text = body
                },
                data = data,
                to = deviceToken
                //registration_ids = deviceTokens
            };
            //Object to JSON STRUCTURE => using Newtonsoft.Json;
            string jsonMessage = JsonConvert.SerializeObject(messageInformation);

            // Create request to Firebase API
            var request = new HttpRequestMessage(HttpMethod.Post, firebaseFcmUrl);
            request.Headers.TryAddWithoutValidation("Authorization", "key=" + firebaseFcmServerKey);
            request.Content = new StringContent(jsonMessage, Encoding.UTF8, "application/json");

            HttpResponseMessage result;

            using (var client = new HttpClient())
            {
                result = await client.SendAsync(request);
            }

            return result;
        }
    }

   

}
