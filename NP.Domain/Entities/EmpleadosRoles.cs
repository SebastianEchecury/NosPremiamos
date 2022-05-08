using NP.Domain.Entities;
using TECSO.FWK.Domain.Entities;

namespace NP.Admin.Domain.Entities
{
    public partial class EmpleadosRoles : Entity<int>

    {
        public int EmpleadoId { get; set; }
        public int RolId { get; set; }

        public Empleados Empleado { get; set; }
        public Roles Rol { get; set; }
    }
}
