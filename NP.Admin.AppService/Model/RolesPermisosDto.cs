using TECSO.FWK.Domain.Entities;

namespace NP.Admin.AppService.Model
{
    public class RolesPermisosDto : EntityDto<int>
    {
        public int RolId { get; set; }
        public int PermisoId { get; set; }

        public PermisosDto Permiso { get; set; }
        public RolesDto Rol { get; set; }


        public override string Description => null;
    }
}
