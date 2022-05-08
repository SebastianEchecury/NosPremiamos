using System.Collections.Generic;
using TECSO.FWK.Domain.Entities;

namespace NP.Admin.AppService.Model
{
    public class RolesDto : EntityDto<int>
    {
        public RolesDto()
        {
            EmpleadosRoles = new HashSet<EmpleadosRolesDto>();
            RolesPermisos = new HashSet<RolesPermisosDto>();
        }

        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public bool? Activo { get; set; }

        public ICollection<EmpleadosRolesDto> EmpleadosRoles { get; set; }
        public ICollection<RolesPermisosDto> RolesPermisos { get; set; }
        public override string Description => this.Descripcion;
    }
}
