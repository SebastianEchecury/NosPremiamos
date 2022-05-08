using TECSO.FWK.AppService;
using TECSO.FWK.Domain.Interfaces.Services;
using NP.Domain.Entities;
using NP.Admin.AppService.Model;
using NP.Admin.AppService.Interface;
using NP.Admin.Domain.Interfaces.Services;
using NP.Admin.Domain.Url;

namespace NP.Admin.AppService
{

    public class EmpleadoAppService : AppServiceBase<Empleados, EmpleadosDto, int, IEmpleadoService>, IEmpleadoAppService
    {
        protected readonly IRoleService _roleService;
        protected readonly IPermisosService _PermissionService;

        private readonly IAuthService _authService;
        public IAppUrlService AppUrlService { get; set; }

        public EmpleadoAppService(IEmpleadoService serviceBase,
            IRoleService roleService,
            IPermisosService permissionService,
            IAppUrlService appUrlService, IAuthService authService)
            : base(serviceBase)
        {
            _roleService = roleService;
            _PermissionService = permissionService;
            AppUrlService = appUrlService;
            this._authService = authService;
        }

        //public async Task<List<EmpleadosRolesDto>> GetUserRoles(int id)
        //{
        //    var rolesusuarios = await this._serviceBase.GetUserRoles(id);

        //    return await GetUserRoles(rolesusuarios);
        //}

        //private async Task<List<EmpleadosRolesDto>> GetUserRoles(List<EmpleadosRolesDto> rolesusuarios)
        //{
        //    var allrole = await this._roleService.GetAllAsync(new RoleFilter());

        //    var result = new List<EmpleadosRolesDto>();

        //    foreach (var r in allrole)
        //    {
        //        var ur = new EmpleadosRolesDto();
        //        ur.RoleId = r.Id;
        //        ur.RoleName = r.Name;
        //        ur.RoleDisplayName = r.DisplayName;
        //        ur.IsAssigned = rolesusuarios.Any(e => e.RoleId == r.Id);
        //        result.Add(ur);
        //    }

        //    return result;
        //}

        //public override async Task<EmpleadosDto> UpdateAsync(EmpleadosDto dto)
        //{
        //    dto.UserRoles = dto.UserRoles.Where(e => e.IsAssigned).ToList();

        //    return await base.UpdateAsync(dto);
        //}

        //public async Task<SysUsers> Login(string Username, string Password)
        //{
        //    var User = await this._serviceBase.Login(Username, Password);

        //    var modulo = await this.appModuloService.GetAppModulo("LOG", true, false);

        //    if (User == null)
        //        throw new ValidationException(((EmpleadosCategoriasAprobadores)modulo.Items[0]).AppMensaje.FirstOrDefault(m => m.Clave == "ErrorUserPass").Valor);
        //    else
        //    {
        //        var hp = new PasswordHasher<SysUsers>();

        //        var result = hp.VerifyHashedPassword(User, User.PasswordHash, Password);
        //        if (result != PasswordVerificationResult.Success)
        //        {
        //            throw new ValidationException(((EmpleadosCategoriasAprobadores)modulo.Items[0]).AppMensaje.FirstOrDefault(m => m.Clave == "ErrorUserPass").Valor);
        //        }
        //    }


        //    return User;
        //}

        //public async Task<ResetPasswordOutput> ResetPassword(ResetPasswordInput input)
        //{
        //    var user = await this.GetByIdAsync(this._authService.GetCurretUserId());

        //    var modulo = await this.appModuloService.GetAppModulo("LOG", true, false);

        //    if (user == null)
        //    {
        //        throw new ValidationException(((EmpleadosCategoriasAprobadores)modulo.Items[0]).AppMensaje.FirstOrDefault(m => m.Clave == "ErrorCambioPass").Valor);
        //    }

        //    var hp = new PasswordHasher<SysUsers>();
        //    var result = hp.VerifyHashedPassword(user, user.PasswordHash, input.Password);
        //    if (result != PasswordVerificationResult.Success)
        //    {
        //        throw new ValidationException(((EmpleadosCategoriasAprobadores)modulo.Items[0]).AppMensaje.FirstOrDefault(m => m.Clave == "ErrorPassword").Valor);
        //    }

          

        //    var _passwordHasher = new PasswordHasher<SysUsers>();
        //    user.PasswordHash = _passwordHasher.HashPassword(user, input.PasswordNueva);
        //    user.PasswordResetCode = null;
        //    //user.EmailConfirmed = true;
        //    //user.ShouldChangePasswordOnNextLogin = false;

        //    await this.UpdateAsync(user);

        //    var vf = new ValidacionFilter();
        //    vf.cliente = user.ClienteId;
        //    await clienteAppService.ValidarResetPassword(vf);

        //    return new ResetPasswordOutput
        //    {
        //        CanLogin = !user.IsDeleted,
        //        UserName = user.Name
        //    };
        //}      

        //public async Task<GetPermissionsForEditOutput> GetUserPermissionsForEdit(int id)
        //{
        //    var permissions = await this._PermissionService.GetAllAsync<PermissionsFilter>(null);
        //    var grantedPermissions = await this._serviceBase.GetGrantedPermissionsAsync(id);

        //    GetPermissionsForEditOutput result = GetPermissionsForEditOutput.GetPermissionsForEdit(permissions, grantedPermissions);

        //    return result;
        //}

        //public async Task UpdateUserPermissions(UpdateUserPermissionsInput input)
        //{
        //    if (input.GrantedPermissionNames == null)
        //    {
        //        throw new TecsoException("Falta lista de permisos");
        //    }
        //    await _serviceBase.SetGrantedPermissionsAsync(input.Id, input.GrantedPermissionNames);
        //}

        //public async Task<string[]> GetPermissionForCurrentUser()
        //{
        //    var grantedPermissionsUser = await this._PermissionService.GetPermissionForCurrentUser();
        //    return grantedPermissionsUser;
        //}

        //public async override Task<EmpleadosDto> GetDtoByIdAsync(int id)
        //{
        //    if (id > 0)
        //    {
        //        var dto = await base.GetDtoByIdAsync(id);
        //        dto.UserRoles = await this.GetUserRoles(id);
        //        return dto;
        //    }
        //    else
        //    {
        //        return await this.GetDefaultDtoAsync();
        //    }

        //}

        //public async Task<EmpleadosDto> GetDefaultDtoAsync()
        //{
        //    var allrole = await this._roleService.GetAllAsync(new RoleFilter());
        //    var roles = new List<UserRoleDto>();
        //    foreach (var r in allrole)
        //    {
        //        var ur = new UserRoleDto();
        //        ur.RoleId = r.Id;
        //        ur.RoleName = r.Name;
        //        ur.RoleDisplayName = r.DisplayName;
        //        ur.IsAssigned = r.IsDefault;
        //        roles.Add(ur);
        //    }

        //    var newDto = new EmpleadosDto() { UserRoles = roles };
        //    return newDto;
        //}

        //public async override Task<EmpleadosDto> AddAsync(EmpleadosDto dto)
        //{
        //    dto.UserRoles = dto.UserRoles.Where(e => e.IsAssigned).ToList();
        //    var user = MapObject<EmpleadosDto, SysUsers>(dto);
 
        //    var hp = new PasswordHasher<SysUsers>();


        //    if (dto.Password.IsNullOrEmpty())
        //    {
        //        dto.Password = dto.Name;
        //    }

        //    user.PasswordHash = hp.HashPassword(user, dto.Password);
        //    user.EmailConfirmed = false;
        //    user.SetNewPasswordResetCode();

        //    var result = MapObject<SysUsers, EmpleadosDto>(await this.AddAsync(user));
        //    //if (!user.Mail.IsNullOrEmpty())
        //    //{ 
        //    //    var emailActivationLink = AppUrlService.CreatePasswordResetUrlFormat();
        //    //    await _userEmailer.SendPasswordResetLinkAsync(user, emailActivationLink);
        //    //}
        //    return result;

        //}

        //public async Task<String> ResetPassword(int id)
        //{
        //    var user = await this.GetByIdAsync(id);

        //    user.SetNewPasswordResetCode();
        //    await this.UpdateAsync(user);
        //    var emailActivationLink = AppUrlService.CreatePasswordResetUrlFormat();
        //    await _userEmailer.SendPasswordResetLinkAsync(user, emailActivationLink);
        //    return user.PasswordResetCode;
        //}

        //public async Task<EmpleadosDto> GetUserByEmailAsync(string email)
        //{
        //    UserFilter userFilter = new UserFilter() { Email = email };
        //    var usersDto = await this._serviceBase.GetPagedListAsync(userFilter);
        //    if(usersDto.Items.Count == 0)
        //    {
        //        return null;
        //    }
        //    return MapObject<SysUsers, EmpleadosDto>(usersDto.Items.FirstOrDefault());
        //}
    }
}
