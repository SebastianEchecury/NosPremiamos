using Microsoft.AspNetCore.Http;
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

namespace TECSO.FWK.AppService
{
    /// <summary>
    /// This class handles all the Network call.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class HttpCustomClient<T>: TECSO.FWK.Domain_Std.Services.HttpCustomClient
    {

        public HttpCustomClient(string _baseUrl, string _access_token)
            :base(_baseUrl,_access_token)
        {
            
        }


        /// <summary>
        /// Method for GET request.
        /// </summary>
        /// <param name="api"></param>
        /// <returns></returns>
        public async Task<T> GetRequest<TFilter>(string api, TFilter filter)
        {
            return await this.GetRequest<T, TFilter>(api, filter);
        }
       

        /// <summary>
        /// Method for the POST request.
        /// </summary>
        /// <param name="api"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public async Task<T> PostRequest<TFilter>(string api, TFilter data)
        {
            return await base.PostRequest<T,TFilter>(api, data);
        }

       
        //public virtual async Task<T> PostRequest<TFilter>(string api, List<KeyValuePair<string, string>> FormData)
        //{
        //    return await base.PostRequest<T,TFilter>(api, FormData);
        //}



    }
}
