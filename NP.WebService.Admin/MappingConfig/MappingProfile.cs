using AutoMapper;
using AutoMapper.EquivalencyExpression;
using NP.Admin.AppService.Model;
using NP.Domain.Entities;
using TECSO.FWK.AppService.Model;

namespace NP.WebService.Admin
{

    public class MappingProfile : Profile
    {
        //  where TModel : Entity<TPrimaryKey>, new()
        //where TDto : EntityDto<TPrimaryKey>, new()
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            //CreateMap<Empleados, EmpleadosDto>()
            //    .ForMember(d => d.EmpleadosRoles, o => o.MapFrom(s => s.EmpleadosRoles))
            //    .EqualityComparison((odto, o) => odto.Id == o.Id);
            //CreateMap<EmpleadosDto, Empleados>()
            //    .ForMember(d => d.EmpleadosRoles, o => o.MapFrom(s => s.EmpleadosRoles))
            //    .EqualityComparison((odto, o) => odto.Id == o.Id);


            //CreateMap<UserRoleDto, SysUsersRoles>().EqualityComparison((odto, o) => odto.RoleId == o.RoleId);
            //CreateMap<SysUsersRoles, UserRoleDto>().EqualityComparison((odto, o) => odto.RoleId == o.RoleId);

            //CreateMap<SysRoles, RoleDto>().EqualityComparison((odto, o) => odto.Id == o.Id);
            //CreateMap<RoleDto, SysRoles>().EqualityComparison((odto, o) => odto.Id == o.Id);

            //CreateMap<Error, LogDto>()
            //    .ForMember(d => d.Description, o => o.MapFrom(s => s.ErrorMessage))
            //    .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            //    .ForMember(d => d.LogDate, o => o.MapFrom(s => s.ErrorDate))
            //    .ForMember(d => d.LogMessage, o => o.MapFrom(s => s.ErrorMessage))
            //    .ForMember(d => d.UserName, o => o.MapFrom(s => s.UserName))
            //    .ForMember(d => d.SessionId, o => o.MapFrom(s => s.SessionId))
            //    .ForMember(d => d.StackTrace, o => o.MapFrom(s => s.StackTrace));

            //CreateMap<LogDto, Error>()
            //    .ForMember(d => d.ErrorDate, o => o.MapFrom(s => s.LogDate))
            //    .ForMember(d => d.ErrorMessage, o => o.MapFrom(s => s.LogMessage))
            //    .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            //    .ForMember(d => d.UserName, o => o.MapFrom(s => s.UserName))
            //    .ForMember(d => d.SessionId, o => o.MapFrom(s => s.SessionId))
            //    .ForMember(d => d.StackTrace, o => o.MapFrom(s => s.StackTrace));


            //CreateMap<Logs, LogDto>();
            //CreateMap<LogDto, Logs>();

            //CreateMap<Cliente, ClienteDto>()
            //    .ForMember(d => d.UserDto, o => o.MapFrom(s => s.SysUsers))
            //    .ForMember(d => d.ValidacionDto, o => o.MapFrom(s => s.Validacion));

            //CreateMap<ClienteDto, Cliente>()
            //    .ForMember(d => d.SysUsers, o => o.MapFrom(s => s.UserDto))
            //    .ForMember(d => d.Validacion, o => o.MapFrom(s => s.ValidacionDto));

            //CreateMap<Validacion, ValidacionDto>().EqualityComparison((odto, o) => odto.Id == o.Id);
            //CreateMap<ValidacionDto, Validacion>().EqualityComparison((odto, o) => odto.Id == o.Id);

            //CreateMap<WsMovimientosOutput, MovimientoDto>();

            //CreateMap<WsSaldoPorMonedaOutput, SaldoPorMonedaDto>();

            //CreateMap<WsProductoCuentaOutput, ProductoCuentaDto>();

            //CreateMap<WsSaldoCuentaOutput, SaldoCuentaDto>();

            //CreateMap<WsTipoComercioOutput, TipoComercioDto>();

            //CreateMap<WsTransferenciaOutput, TransferenciaDto>();

            //CreateMap<WsNacionalidadOutput, NacionalidadDto>();

            //CreateMap<WsClienteActivoOutput, ClienteActivoDto>();

            //CreateMap<WsMotivoOutput, MotivoDto>();

            //CreateMap<WsMonedaOutput, MonedaDto>();

            //CreateMap<WsAltaCuentaOutput, AltaCuentaDto>();

            //CreateMap<WsProvinciaOutput, ProvinciaDto>();

            //CreateMap<WsLocalidadOutput, LocalidadDto>();

            //CreateMap<Documento, DocumentoDto>();
            //CreateMap<DocumentoDto, Documento>();

            //CreateMap<PagoQR, PagoQRDto>();
            //CreateMap<PagoQRDto, PagoQR>()
            //    .ForMember(d => d.ClientePago, o => o.Ignore())
            //    //.ForMember(d => d.ClienteCobra, o => o.Ignore())
            //    ;

            //CreateMap<PushNotificacionToken, PushNotificacionTokenDto>();
            //CreateMap<PushNotificacionTokenDto, PushNotificacionToken>();

            //CreateMap<EmpleadosCategoriasAprobadores, AppModuloDto>()
            //.ForMember(d => d.AppContenidoDto, o => o.MapFrom(s => s.AppContenido))
            //    .ForMember(d => d.AppMensajeDto, o => o.MapFrom(s => s.AppMensaje));
            //CreateMap<AppModuloDto, EmpleadosCategoriasAprobadores>()
            //.ForMember(d => d.AppContenido, o => o.MapFrom(s => s.AppContenidoDto))
            //    .ForMember(d => d.AppMensaje, o => o.MapFrom(s => s.AppMensajeDto));

            CreateMap<Categorias, CategoriasDto>()
               .EqualityComparison((odto, o) => odto.Id == o.Id);

            CreateMap<CategoriasDto, Categorias>()
                .EqualityComparison((odto, o) => odto.Id == o.Id);

            //CreateMap<Empleados, EmpleadosDto>()
            //  .EqualityComparison((odto, o) => odto.Id == o.Id);

            //CreateMap<EmpleadosDto, Empleados>()
            //    .EqualityComparison((odto, o) => odto.Id == o.Id);



            //CreateMap<WsRetiroOutput, RetiroDto>();
        }

    }

}
