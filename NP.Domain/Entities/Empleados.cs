using NP.Admin.Domain.Entities;
using System.Collections.Generic;
using TECSO.FWK.Domain.Entities;

namespace NP.Domain.Entities
{
    public partial class Empleados: Entity<int>
    {
        public Empleados()
        {
            EmpleadosCategoriasAprobadores = new HashSet<EmpleadosCategoriasAprobadores>();
            EmpleadosRoles = new HashSet<EmpleadosRoles>();
            VotosAprobadorEmpleado = new HashSet<Votos>();
            VotosVotadoEmpleado = new HashSet<Votos>();
            VotosVotanteEmpleado = new HashSet<Votos>();
        }

        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Usuario { get; set; }
        public string Contraseña { get; set; }
        public bool? Eliminado { get; set; }
        public bool? PrimerIngreso { get; set; }

        public ICollection<EmpleadosCategoriasAprobadores> EmpleadosCategoriasAprobadores { get; set; }
        public ICollection<EmpleadosRoles> EmpleadosRoles { get; set; }
        public ICollection<Votos> VotosAprobadorEmpleado { get; set; }
        public ICollection<Votos> VotosVotadoEmpleado { get; set; }
        public ICollection<Votos> VotosVotanteEmpleado { get; set; }
    }
}
