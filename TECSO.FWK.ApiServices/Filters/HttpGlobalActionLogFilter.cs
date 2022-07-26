using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using TECSO.FWK.Domain.Interfaces.Services;
using TECSO.FWK.Domain_Std.Interfaces;

namespace TECSO.FWK.ApiServices.Filters
{
    public interface IHttpGlobalActionLogFilter:IActionFilter
    {

    }

    public class HttpGlobalActionLogFilter : IHttpGlobalActionLogFilter
    {
        //private readonly ILogger logger;
        private readonly IAuthService authService;
        private readonly ÌRequestIdentifier requestIdentifier;
        

        public HttpGlobalActionLogFilter( IAuthService _authService, ÌRequestIdentifier _RequestIdentifier)
        {
            //logger = _logger;
            authService = _authService;
            requestIdentifier = _RequestIdentifier;
        }


        public void OnActionExecuted(ActionExecutedContext context)
        {
            this.logEnd(context); 
        }

       

        public void OnActionExecuting(ActionExecutingContext context)
        {
            this.logInit(context);
        }

        private void logEnd(ActionExecutedContext context)
        {

            var xx = new
            {
                response = new
                {
                    TransactionId = requestIdentifier.SessionId.ToString(),
                    Result = context.Result
                }
            };




        }

        private void logInit(ActionExecutingContext context)
        {
            var xx = new
            {
                request = new
                {
                    TransactionId = requestIdentifier.SessionId.ToString(),
                    Path = context.HttpContext.Request.Path.ToString(),
                    QueryString = context.HttpContext.Request.QueryString.ToString(),
                    Method = context.HttpContext.Request.Method.ToString(),
                    ActionName = ((Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor)context.ActionDescriptor).ActionName,
                    ControllerName = ((Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor)context.ActionDescriptor).ControllerName

                }
            };

            //this.logger.LogInformation(Newtonsoft.Json.JsonConvert.SerializeObject(xx));
        }
    }
}
