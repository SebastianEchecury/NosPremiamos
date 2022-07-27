using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NP.Admin.AppService.Interface;
using NP.Admin.Domain;
using NP.Domain.Entities;
using NP.WebService.Admin.Model;
using TECSO.FWK.AppService.Interface;

namespace NP.WebService.Admin.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class AuthController : TECSO.FWK.ApiServices.ControllerBase
    {
        private IConfiguration _Configuration;
       
        private IEmpleadoAppService _UserService;
        private IPermisosAppService _PermissionService;

        public AuthController(IEmpleadoAppService userService, IConfiguration configuration, IPermisosAppService permissionService)
        {
            _UserService = userService;
            _Configuration = configuration;
            _PermissionService = permissionService;
            
        }

        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> PostAsync([FromBody]CredentialsViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                
                return BadRequest(ModelState);
            }            

            try
            {
                var User = await _UserService.Login(credentials.Email, credentials.Password);               
                
                

                var expirationtime = DateTime.Now.AddYears(1);
                var tokenGenerated = BuildToken(User, expirationtime);

                var roles = await _PermissionService.GetPermissionForUser(User.Id);


                return Ok(new
                {
                    username = credentials.Email,
                    primerIngreso = User.PrimerIngreso,
                    token = tokenGenerated,
                    roles = roles
                });
            }
            catch (Exception ex)
            {               
                return ReturnError<string>(ex);
            }
        }


        [HttpPost("CambiarPassword")]
        public async Task<IActionResult> ResetPassword([FromBody]ResetPasswordInput input)
        {
            if (!ModelState.IsValid)
            {                
                return BadRequest(ModelState);
            }

            try
            {
                var resetPassword = await _UserService.ResetPassword(input);
                //UserName = user.UserName
                return Ok();
            }
            catch (Exception ex)
            {
                return ReturnError<string>(ex);
            }
        }


        private string BuildToken(Empleados user, DateTime expiration)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("veryVerySecretKey"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                //new Claim("Username", user.Name),   
                new Claim("UserId", user.Id.ToString()),
                //new Claim("RosentalCod", user.Cliente.RosentalCod.ToString()),
                new Claim("SessionId", Guid.NewGuid().ToString()),
            };

            var identityUrl = _Configuration.GetValue<string>("IdentityUrl");

            var token = new JwtSecurityToken(identityUrl, identityUrl,
              claims,
              expires: expiration,
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}