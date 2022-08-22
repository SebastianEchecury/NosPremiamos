﻿using TECSO.FWK.AppService;
using TECSO.FWK.Domain.Interfaces.Services;
using NP.Domain.Entities;
using NP.Admin.AppService.Model;
using NP.Admin.AppService.Interface;
using NP.Admin.Domain.Interfaces.Services;
using NP.Admin.Domain.Url;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using NP.Admin.Domain;
using System.Collections.Generic;
using System.Linq;
using NP.Admin.Domain.Entities;
using System.Net.Mail;
using System;

namespace NP.Admin.AppService
{

    public class EmpleadoAppService : AppServiceBase<Empleados, EmpleadosDto, int, IEmpleadoService>, IEmpleadoAppService
    {
        protected readonly IRoleService _roleService;
        protected readonly IPermisosService _PermissionService;
        private readonly IEmpleadoRolesService _rolesService;
        private readonly IUserEmailer userEmailer;

        private readonly IAuthService _authService;
        public IAppUrlService AppUrlService { get; set; }

        public EmpleadoAppService(IEmpleadoService serviceBase,
            IRoleService roleService, IUserEmailer _userEmailer,
            IPermisosService permissionService, IEmpleadoRolesService rolesService,
            IAppUrlService appUrlService, IAuthService authService)
            : base(serviceBase)
        {
            _roleService = roleService;
            _PermissionService = permissionService;
            AppUrlService = appUrlService;
            this._authService = authService;
            _rolesService = rolesService;
            userEmailer = _userEmailer;
        }


        public async Task<Empleados> Login(string Username, string Password)
        {
            var User = await this._serviceBase.Login(Username, Password);


            if (User == null)
                throw new ValidationException("Usuario y/o Contraseña Incorrectas");
            else
            {
                var hp = new PasswordHasher<Empleados>();

                var result = hp.VerifyHashedPassword(User, User.Contraseña, Password);
                if (result != PasswordVerificationResult.Success)
                {
                    throw new ValidationException("Usuario y/o Contraseña Incorrectas");
                }
            }


            return User;
        }

        public async Task<bool> ResetPassword(ResetPasswordInput input)
        {
            Empleados user = new Empleados();
            if (input.EmpleadoId.HasValue)
            {
                user = await this.GetByIdAsync(input.EmpleadoId.Value);
            }
            else
            {
                user = await this.GetByIdAsync(this._authService.GetCurretUserId());
            }

            if (user.Id == 0)
            {
                throw new ValidationException("Error en el cambio de contraseña");
            }

            var hp = new PasswordHasher<Empleados>();
            var result = hp.VerifyHashedPassword(user, user.Contraseña, input.Password);
            if (result != PasswordVerificationResult.Success)
            {
                throw new ValidationException("Error en la Contraseña");
            }

            var _passwordHasher = new PasswordHasher<Empleados>();
            user.Contraseña = _passwordHasher.HashPassword(user, input.PasswordNueva);
            user.PrimerIngreso = true;

            await this.UpdateAsync(user);

            return true;
        }       

        public async override Task<EmpleadosDto> AddAsync(EmpleadosDto dto)
        {
            try
            {
                var user = MapObject<EmpleadosDto, Empleados>(dto);

                var hp = new PasswordHasher<Empleados>();


                if (string.IsNullOrEmpty(dto.Contraseña))
                {
                    dto.Contraseña = Guid.NewGuid().ToString().Substring(1, 8);
                }

                user.Contraseña = hp.HashPassword(user, dto.Contraseña);
                user.PrimerIngreso = false;
                user.Eliminado = false;



                if (!string.IsNullOrEmpty(user.Usuario))
                {
                    MailMessage mail = new MailMessage();
                    mail.To.Add(user.Usuario);
                    mail.Subject = "Bienvenido a Nos Premiamos";
                    mail.Body = string.Format("Hola {0}, {1} esta es tu contraseña: {2} para tu primer ingreso, luego deberas seguir los pasos para cambiarla", user.Apellido, user.Nombre, dto.Contraseña);


                    await userEmailer.SendEmail(mail);
                }

                var result = MapObject<Empleados, EmpleadosDto>(await this.AddAsync(user));


                foreach (var rolid in dto.UsuarioRoles)
                {
                    var er = new EmpleadosRoles();
                    er.EmpleadoId = result.Id;
                    er.RolId = rolid;
                     await _rolesService.AddAsync(er);

                }


                return result;
            }
            catch (Exception ex)
            {
                throw new ValidationException("Ha Ocurrido un error, intente nuevamente");
            }

        }

        public override async Task<EmpleadosDto> UpdateAsync(EmpleadosDto dto)
        {

            //Roles Agregar
            foreach (var rolid in dto.UsuarioRoles)
            {
                    var er = new EmpleadosRoles();
                    er.EmpleadoId = dto.Id;
                    er.RolId = rolid;
                   await _rolesService.AddAsync(er);
            }


            return await base.UpdateAsync(dto);
        }

    }
}
