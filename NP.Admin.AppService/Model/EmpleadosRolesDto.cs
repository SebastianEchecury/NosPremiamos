using TECSO.FWK.Domain.Entities;

namespace NP.Admin.AppService.Model
{
    public class EmpleadosRolesDto : EntityDto<int>
    {
        public int EmpleadoId { get; set; }
        public int RolId { get; set; }

        //public EmpleadosDto Empleado { get; set; }
        public RolesDto Rol { get; set; }

        public override string Description => this.EmpleadoId.ToString();
    }
}
