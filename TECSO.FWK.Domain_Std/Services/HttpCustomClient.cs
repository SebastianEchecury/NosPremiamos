
using Microsoft.Extensions.DependencyInjection;

using Newtonsoft.Json;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using TECSO.FWK.Domain;
using System.Net;
using TECSO.FWK.Domain_Std.Interfaces;
using TECSO.FWK.AppService.Interface;

namespace TECSO.FWK.Domain_Std.Services
{
    public class HttpCustomClient
    {

        private string baseUrl;

        private string access_token;

        protected NetworkCredential credential;

        private ÌRequestIdentifier _requestIdentifier;

        protected ÌRequestIdentifier RequestIdentifier
        {
            get
            {
                //if (_requestIdentifier==null)
                //{
                //    _requestIdentifier = ServiceProviderResolver.ServiceProvider.GetService<ÌRequestIdentifier>();
                //}
                return _requestIdentifier;
            }
            
        }

        public void SetRequestIdentifier(ÌRequestIdentifier _requestIdentifier) {
            this._requestIdentifier = _requestIdentifier;
        }


        private ILogger _logger;

        protected ILogger logger
        {
            get
            {
                if (_logger == null)
                {
                    _logger = ServiceProviderResolver.ServiceProvider.GetService<ILogger>();
                }
                return _logger;
            }

        }


        public HttpCustomClient(string _baseUrl, string _access_token)
        {
            baseUrl = _baseUrl;

            access_token = _access_token;
        }


        public HttpCustomClient(string _baseUrl, string user, string password)
        {
            baseUrl = _baseUrl;
            this.credential = new NetworkCredential(user, password);
        }




        /// <summary>
        /// Method for GET request.
        /// </summary>
        /// <param name="api"></param>
        /// <returns></returns>
        public async Task<RT> GetRequest<RT, TFilter>(string api, TFilter filter )
        {
            try
            {
                using (var client = this.BuildHttpClient())
                {

                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    if (!string.IsNullOrEmpty(access_token))
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", access_token);
                    }


                    if (filter!=null)
                    {
                        var query = System.Web.HttpUtility.ParseQueryString("");

                        foreach (var propertyInfo in filter.GetType().GetProperties())
                        {
                            query[propertyInfo.Name] = propertyInfo.GetValue(filter,null)?.ToString();
                        }

                        string queryString = query.ToString();
                        api += "?" + queryString;
                    }

                    this.logInit(api, null);

                    // HTTP GET
                    HttpResponseMessage response = await client.GetAsync(api);

                    this.logEnd(response);

                    this.ManageErrorsClient(response);

                    if (response.IsSuccessStatusCode)
                    {
                        var responseString = response.Content.ReadAsStringAsync().Result;
                        var responseObject = JsonConvert.DeserializeObject<RT>(responseString);
                        return responseObject;

                    }
                    return default(RT);
                }
            }
            catch (Exception ex)
            {
                //await Task.Run(() => App.LogError(ex));
                throw ex;
            }
        }

        private HttpClient BuildHttpClient()
        {
            HttpClient client;

            if (this.credential!=null)
            {
                client = new HttpClient(new HttpClientHandler() { Credentials = credential });
            }
            else
            {
                client = new HttpClient();
            }

            client.BaseAddress = new Uri(this.baseUrl);
            return client;
        }

        /// <summary>
        /// Method for the POST request.
        /// </summary>
        /// <param name="api"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        //public async Task<TResponse> PostRequest<TResponse, TFilter>(string api, TFilter data)
        //{
        //    try
        //    {
        //        using (var client = this.BuildHttpClient())
        //        {
                    
        //            client.DefaultRequestHeaders.Accept.Clear();
        //            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        //            if (!string.IsNullOrEmpty(access_token))
        //            {
        //                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", access_token);
        //            }

        //            var jsonRequest = JsonConvert.SerializeObject(data);
        //            var content = new StringContent(jsonRequest, Encoding.UTF8, "text/json");

        //            // HTTP POST
        //            var response = await client.PostAsync(api, content);

        //            this.ManageErrorsClient(response);

        //            if (response.IsSuccessStatusCode)
        //            {
        //                var responseString = response.Content.ReadAsStringAsync().Result;
        //                var responseObject = JsonConvert.DeserializeObject<TResponse>(responseString);
        //                return responseObject;

        //            }
        //            return default(TResponse);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        //await Task.Run(() => App.LogError(ex));
        //        throw ex;
        //    }
        //}

        /// <summary>
        ///  Method for the POST request.
        /// </summary>
        /// <param name="api"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        public async Task<TResponse> PostRequest<TResponse, TFilter>(string api, TFilter filter)
        {
            try
            {
                using (var client = this.BuildHttpClient())
                {
                    
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    if (!string.IsNullOrEmpty(access_token))
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", access_token);
                    }

                    var contentJson = "{}";

                    if (filter!=null)
                    {
                        contentJson = Newtonsoft.Json.JsonConvert.SerializeObject(filter);
                    }
                    this.logInit(api, contentJson);

                    var content = new StringContent(contentJson, Encoding.UTF8, "application/json");
                    var response = await client.PostAsync(api, content);

                    this.ManageErrorsClient(response);

                    this.logEnd(response);

                    if (response.IsSuccessStatusCode)
                    {
                        var responseString = response.Content.ReadAsStringAsync().Result;
                        var responseObject = JsonConvert.DeserializeObject<TResponse>(responseString);
                        return responseObject;
                    }
                    return default(TResponse);
                }
            }
            catch (Exception ex)
            {
                //await Task.Run(() => App.LogError(ex));
                throw ex;
            }
        }

        

        //public virtual async Task<T> PostRequest<T>(string api, List<KeyValuePair<string, string>> FormData)
        //{
        //    try
        //    {
        //        using (var client = this.BuildHttpClient())
        //        {
        //            client.DefaultRequestHeaders.Accept.Clear();
        //            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        //            var content = new FormUrlEncodedContent(FormData.ToArray());

        //            // HTTP POST
        //            HttpResponseMessage response = await client.PostAsync(api, content);

        //            this.ManageErrorsClient(response);

        //            string responseString = await response.Content.ReadAsStringAsync();

        //            if (response.IsSuccessStatusCode)
        //            {
        //                T responseObject = JsonConvert.DeserializeObject<T>(responseString);
        //                return responseObject;
        //            }

        //            return default(T);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        //await Task.Run(() => App.LogError(ex));
        //        throw ex;
        //    }
        //}




        /// <summary>
        /// Method for the PUT request.
        /// </summary>
        /// <param name="api"></param>
        /// <param name="jsonInput"></param>
        /// <returns></returns>
        public async Task<string> PutRequest(string api, string jsonInput)
        {
            try
            {
                using (var client = this.BuildHttpClient())
                {
                    
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    if (!string.IsNullOrEmpty(access_token))
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", access_token);
                    }

                    this.logInit(api, jsonInput);

                    var content = new StringContent(jsonInput, Encoding.UTF8, "text/json");
                    var res = await client.PutAsync(api, content);

                    this.ManageErrorsClient(res);

                    this.logEnd(res);

                    if (res.IsSuccessStatusCode)
                    {
                        var responseString = res.Content.ReadAsStringAsync().Result;
                        return responseString;

                    }

                    return "";
                }
            }
            catch (Exception ex)
            {
                //await Task.Run(() => App.LogError(ex));
                throw ex;
            }
        }

        /// <summary>
        /// Method for Deserialize the JSON response.
        /// </summary>
        /// <param name="responseString"></param>
        /// <returns></returns>
        public T DeserializeObject<T>(string responseString)
        {
            return JsonConvert.DeserializeObject<T>(responseString);
        }


        protected virtual void ManageErrorsClient(HttpResponseMessage response)
        {
            //TODO: manage the response
            if (response != null && response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                var responseString = response.Content.ReadAsStringAsync().Result;

                //if (responseString.Contains(SharedTokens.RegistrarUsuario))
                //{
                //    throw new Exceptions.AuthenticationException(SharedTokens.RegistrarUsuario);
                //}
                //if (responseString.Contains(SharedTokens.RequierdToken))
                //{
                //    throw new Exceptions.RequierdTokenException(SharedTokens.RequierdToken);
                //}
                if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    throw new System.UnauthorizedAccessException(responseString);
                }



                throw new Exception(responseString);


            }
        }

        private void logEnd(HttpResponseMessage response)
        {
            var responseString = response.Content.ReadAsStringAsync().Result;
            var xx = new
            {
                response = new
                {
                    TransactionId = RequestIdentifier.SessionId.ToString(),
                    StatusCode = response.StatusCode.ToString(),
                    Result = responseString
                }
            };

            this.logger.LogInformation(Newtonsoft.Json.JsonConvert.SerializeObject(xx));
        }

        private void logInit(string api, string content)
        {
            var xx = new
            {
                request = new
                {
                    TransactionId = RequestIdentifier.SessionId.ToString(),
                    Path = this.baseUrl + "\\" + api,
                    Content = content
                }
            };

            this.logger.LogInformation(Newtonsoft.Json.JsonConvert.SerializeObject(xx));
        }
    }
}
