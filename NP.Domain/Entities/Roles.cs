using NP.Domain.Entities;
using System.Collections.Generic;
using TECSO.FWK.Domain.Entities;

namespace NP.Admin.Domain.Entities
{
    public partial class Roles : Entity<int>
    {
        public Roles()
        {
            EmpleadosRoles = new HashSet<EmpleadosRoles>();
            RolesPermisos = new HashSet<RolesPermisos>();
        }

        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public bool? Activo { get; set; }

        public ICollection<EmpleadosRoles> EmpleadosRoles { get; set; }
        public ICollection<RolesPermisos> RolesPermisos { get; set; }
    }
}
