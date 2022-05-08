using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using TECSO.FWK.AppService.Interface;
using TECSO.FWK.Domain;
using TECSO.FWK.Domain.Interfaces.Services;

namespace TECSO.FWK.ApiServices
{
    public abstract class ControllerBase : Controller
    {
        protected readonly ILogger logger;
        protected readonly IAuthService authService;

        protected ControllerBase()
        {
            logger = ServiceProviderResolver.ServiceProvider.GetService<ILogger>();
            authService = ServiceProviderResolver.ServiceProvider.GetService<IAuthService>();
        }

        private IActionResult ReturnError<T>(String message, string stackTrace, ActionStatus status = ActionStatus.Error)
        {
            return this.ReturnError<T>(new List<string>() { message.ToString() } ,stackTrace, status);
        }

        private IActionResult ReturnError<T>(List<String> message,string stackTrace, ActionStatus status = ActionStatus.Error)
        {
            var userName = authService.GetCurretUserName();
            var sessionId = authService.GetSessionID();
            logger.Log(new AppService.Model.LogDto()
            {
                LogDate =DateTime.Now,
                LogMessage =String.Join(",",message),
                LogType = AppService.Model.LogType.Error,
                LogLevel = status ==  ActionStatus.Error ? Domain.Entities.LogLevel.Error : Domain.Entities.LogLevel.Warning,
                SessionId = sessionId,
                UserName = userName,
                StackTrace= stackTrace
            });
            return this.ReturnData<T>(default(T), status, message);
        }

        protected IActionResult ReturnError<T>(Exception ex)
        {
            
            if (ex is ValidationException)
            {
                return this.ReturnValidationError<T>(ex as ValidationException);
            }
            else if (ex is TecsoException)
            {
                return this.ReturnWarningError<T>(ex as TecsoException);
            }

            return this.ReturnError<string>(ex.Message, ex.StackTrace);
        }

        private IActionResult ReturnValidationError<T>(ValidationException ex)
        {
            return this.ReturnError<string>(ex.Message,ex.StackTrace, ActionStatus.ValidationError);
        }

        private IActionResult ReturnWarningError<T>(TecsoException ex)
        {
            return this.ReturnError<string>(ex.Message, ex.StackTrace, ActionStatus.Warning);
        }



        protected IActionResult ReturnData<T>(T objectData, ActionStatus status = ActionStatus.Ok, List<String> messages = null)
        {
            var objectReturn = new Model.ResponseModel<T>()
            {
                DataObject = objectData,
                Status = (int)status,
                Messages = messages ?? new List<string>()
            };

            if (status== ActionStatus.Error)
            {
                return this.NotFound(objectReturn);
            }
            if (status == ActionStatus.ValidationError)
            {
                return this.NotFound(objectReturn);
            }
            if (status == ActionStatus.Warning)
            { 
                return this.NotFound(objectReturn);
            }
            else
            {
                return Ok(objectReturn);
            }
            
        }
        protected IActionResult ReturnError<T>(ModelStateDictionary ModelState)
        {
            var messages = ModelState.Values.SelectMany(e => e.Errors.Select(GetMessagesModelState)).ToList();

            return  this.ReturnError<T>(messages, Newtonsoft.Json.JsonConvert.SerializeObject(ModelState), ActionStatus.ValidationError);
        }

        private string GetMessagesModelState(ModelError e)
        {
            return !string.IsNullOrEmpty(e.ErrorMessage) ? e.ErrorMessage : e.Exception?.Message;
        }
    }
}
