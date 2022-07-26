using System;
using System.Collections.Generic;
using System.Text;
using TECSO.FWK.Domain.Auditing;
using TECSO.FWK.Domain.Entities;

namespace NP.Domain.Entities
{
    public partial class Votos: Entity<int>
    {
        public int VotadoEmpleadoId { get; set; }
        public int VotanteEmpleadoId { get; set; }
        public DateTime FechaVoto { get; set; }
        public int? AprobadorEmpleadoId { get; set; }
        public DateTime? FechaAprobado { get; set; }
        public int CategoriaId { get; set; }

        public Empleados AprobadorEmpleado { get; set; }
        public Categorias Categoria { get; set; }
        public Empleados VotadoEmpleado { get; set; }
        public Empleados VotanteEmpleado { get; set; }
    }
}
