using TECSO.FWK.Domain.Entities;

namespace NP.Admin.Domain.Entities
{
    public partial class RolesPermisos : Entity<int>
    {

        public int RolId { get; set; }
        public int PermisoId { get; set; }

        public Permisos Permiso { get; set; }
        public Roles Rol { get; set; }

    }
}
