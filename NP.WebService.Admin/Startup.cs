using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper.EquivalencyExpression;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using NP.Admin.AppService;
using NP.Admin.AppService.Interface;
using NP.Admin.Domain.Interfaces.Repositories;
using NP.Admin.Domain.Interfaces.Services;
using NP.Admin.Domain.Services;
using NP.infra.Data.Contexto;
using NP.infra.Data.Repositories;
using NP.WebService.Admin.Shared;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using TECSO.FWK.ApiServices.Filters;
using TECSO.FWK.AppService;
using TECSO.FWK.Caching;
using TECSO.FWK.Domain;
using TECSO.FWK.Domain_Std.Auditing;
using TECSO.FWK.Domain_Std.Interfaces;

namespace NP.WebService.Admin
{
    public class Startup
    {
        Microsoft.AspNetCore.Hosting.IHostingEnvironment environment;
        public Startup(IConfiguration configuration, Microsoft.AspNetCore.Hosting.IHostingEnvironment env)
        {
            Configuration = configuration;
            environment = env;


        }
        private IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var entorno = Configuration.GetValue<string>("Entorno");

            services.AddDbContext<AdminContext>(options =>
               options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));


            services.AddSwaggerGen(c =>
            {

                c.DescribeAllEnumsAsStrings();

                c.SwaggerDoc("v1", new Info { Title = "Nos Premiamos (" + entorno + ")", Version = "v1" });

                var security = new Dictionary<string, IEnumerable<string>> {
                    { "Bearer", new string[] { } }
                };

                // Define the BearerAuth scheme that's in use
                c.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });

                c.AddSecurityRequirement(security);
                // Assign scope requirements to operations based on AuthorizeAttribute
                //c.OperationFilter<SecurityRequirementsOperationFilter>();


            });





            var identityUrl = Configuration.GetValue<string>("IdentityUrl");

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = identityUrl,
                    ValidAudience = identityUrl,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("veryVerySecretKey"))
                };
            });

            services.AddCors(

               options =>
               {
                   options.AddPolicy("AllowAllOrigins",
                   builder =>
                   {
                       builder
                       //.WithOrigins(_appConfiguration["App:CorsOrigins"].Split(",", StringSplitOptions.RemoveEmptyEntries).Select(o => o.RemovePostFix("/")).ToArray())
                       .AllowAnyOrigin() //TODO: Will be replaced by above when Microsoft releases microsoft.aspnetcore.cors 2.0 - https://github.com/aspnet/CORS/pull/94
                       .AllowAnyHeader()
                       .AllowAnyMethod();
                   });
               }
               );

            services.AddCors();



            AutoMapper.Mapper.Initialize(cfg =>
            {
                //cfg.AddCollectionMappers();
                cfg.AddProfile<MappingProfile>();

            });



            services.AddMemoryCache();

            services.AddMvc(
                options =>
                {
                    options.Filters.Add(new HttpGlobalExceptionFilter(environment));
                    options.Filters.AddService<IHttpGlobalActionLogFilter>();
                })

                .AddRazorPagesOptions(options =>
                {

                    options.Conventions.AuthorizeFolder("/Account/Manage");
                    options.Conventions.AuthorizePage("/Account/Logout");
                })
                .AddJsonOptions(options =>

                    options.SerializerSettings.ContractResolver = new DefaultContractResolver()
                    );



            services.AddScoped<IHttpGlobalActionLogFilter, HttpGlobalActionLogFilter>();
            services.AddScoped<ÌRequestIdentifier, RequestIdentifier>();


            services.AddSingleton<Microsoft.AspNetCore.Http.IHttpContextAccessor, Microsoft.AspNetCore.Http.HttpContextAccessor>();

            //Data Base
            services.AddScoped<IAdminDbContext>(provider => provider.GetService<AdminContext>());
            services.AddScoped<IAdminDBResilientTransaction, AdminDBResilientTransaction>();



            // services.AddScoped<IAdminDbContext>(DbContextActivator.CreateInstance(typeof(AdminContext)));

            // services.AddScoped<IAdminDbContext, AdminContext>();



            services.AddTransient<TECSO.FWK.Domain.Mail.Smtp.ISmtpEmailSenderConfiguration, TECSO.FWK.Domain.Mail.Smtp.SmtpEmailSenderConfiguration>();

            services.AddTransient<TECSO.FWK.Domain.Mail.IEmailSender, TECSO.FWK.Domain.Mail.Smtp.SmtpEmailSender>();

            services.AddTransient<NP.Admin.Domain.Url.IAppUrlService, AngularAppUrlService>();
            services.AddTransient<NP.Admin.Domain.Url.IWebUrlService, WebUrlService>();



            //Categorias
            services.AddTransient<ICategoriasRepository, CategoriasRepository>();
            services.AddTransient<ICategoriasAppService, CategoriasAppService>();
            services.AddTransient<ICategoriasService, CategoriasService>();

            //Empleados
            services.AddTransient<IEmpleadoRepository, EmpleadoRepository>();
            services.AddTransient<IEmpleadoAppService, EmpleadoAppService>();
            services.AddTransient<IEmpleadoService, EmpleadoService>();

            //Parametros
            services.AddTransient<IParametrosRepository, ParametrosRepository>();
            services.AddTransient<IParametrosAppService, ParametrosAppService>();
            services.AddTransient<IParametrosService, ParametrosService>();

            //Permisos
            services.AddTransient<IPermisosRepository, PermisosRepository>();
            services.AddTransient<IPermisosAppService, PermisosAppService>();
            services.AddTransient<IPermisosService, PermisosService>();

            //Roles
            services.AddTransient<IRoleRepository, RoleRepository>();
            services.AddTransient<IRoleAppService, RoleAppService>();
            services.AddTransient<IRoleService, RoleService>();


            //AppContenido
            //services.AddTransient<IAppContenidoAppService, AppContenidoAppService>();
            //services.AddTransient<IAppContenidoRepository, AppContenidoRepository>();
            //services.AddTransient<IAppContenidoService, AppContenidoService>();

            //AppLabels
            // services.AddTransient<IAppLabelsAppService, AppLabelsAppService>();
            //services.AddTransient<IAppLabelsRepository, AppLabelsRepository>();
            //services.AddTransient<IAppLabelsService, AppLabelsService>();


            //AppMensaje
            //services.AddTransient<IAppMensajeAppService, AppMensajeAppService>();
            //services.AddTransient<IAppMensajeRepository, AppMensajeRepository>();
            //services.AddTransient<IAppMensajeService, AppMensajeService>();


            services.AddScoped<TECSO.FWK.Domain.Interfaces.Services.IPermissionProvider, PermissionProvider>();


            services.AddTransient<TECSO.FWK.Domain.Interfaces.Services.IAuthService, AuthService>();

            services.AddSingleton<TECSO.FWK.Caching.Configuration.ICachingConfiguration, TECSO.FWK.Caching.Configuration.CachingConfiguration>();
            services.AddSingleton<ICacheManager, TECSO.FWK.Caching.Memory.MemoryCacheManager>();


            ///////////LOG///////////////
            //if (environment.IsDevelopment())
            //{
            //    //services.AddTransient<ILogger, TECSO.FWK.AppService.LogServiceDebug>();
            //    services.AddTransient<ILogger, LogServicetxt>();
            //}
            //else
            //{
            //    //services.AddTransient<ILogger, ErrorHttpAppService>();
            //    services.AddTransient<ILogger, LogServicetxt>();
            //}



        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, Microsoft.AspNetCore.Hosting.IHostingEnvironment env, IServiceProvider svp)
        {


            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseMvc(routes =>
            {

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });



            var pathBase = Configuration["APPL_PATH"];
            if (pathBase == "/")
                pathBase = "";
            if (!string.IsNullOrEmpty(pathBase))
            {
                app.UsePathBase(pathBase);
            }


            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint($"{ (!string.IsNullOrEmpty(pathBase) ? pathBase : string.Empty) }/swagger/v1/swagger.json", "Smart Wallet API V1");
            });

            ServiceProviderResolver.ServiceProvider = app.ApplicationServices;


        }
    }

    public class SecurityRequirementsOperationFilter : IOperationFilter
    {
        public void Apply(Operation operation, OperationFilterContext context)
        {
            var actionAttrs = context.ApiDescription.ActionAttributes();
            if (actionAttrs.OfType<AllowAnonymousAttribute>().Any())
            {
                return;
            }

            var controllerAttrs = context.ApiDescription.ControllerAttributes();
            var actionAuthorizeAttrs = actionAttrs.OfType<ApiAuthorizeAttribute>();

            if (!actionAuthorizeAttrs.Any() && controllerAttrs.OfType<AllowAnonymousAttribute>().Any())
            {
                return;
            }

            var controllerAuthorizeAttrs = controllerAttrs.OfType<AuthorizeAttribute>();
            if (controllerAuthorizeAttrs.Any() || actionAuthorizeAttrs.Any())
            {
                operation.Responses.Add("401", new Response { Description = "Unauthorized" });

                //var permissions = controllerAuthorizeAttrs.Union(actionAuthorizeAttrs);

                //if (permissions.Any())
                //{
                //    operation.Responses.Add("403", new Response { Description = "Forbidden" });
                //}

                //operation.Security = new List<IDictionary<string, IEnumerable<string>>>
                //{
                //    new Dictionary<string, IEnumerable<string>>
                //    {
                //        { "bearerAuth", permissions }
                //    }
                //};
            }
        }
    }
}
