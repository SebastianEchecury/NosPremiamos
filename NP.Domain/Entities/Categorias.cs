using System.Collections.Generic;
using TECSO.FWK.Domain.Entities;

namespace NP.Domain.Entities
{
    public partial class Categorias: Entity<int>
    {
        public Categorias()
        {
            EmpleadosCategoriasAprobadores = new HashSet<EmpleadosCategoriasAprobadores>();
            Votos = new HashSet<Votos>();
        }

        public string Descripcion { get; set; }
        public string Nombre { get; set; }
        public int? CantidadVotos { get; set; }
        public bool? IncluyeNovedades { get; set; }
        public bool? RequiereAprobacion { get; set; }
        public int? EstadoId { get; set; }

        public Estados Estado { get; set; }
        public ICollection<EmpleadosCategoriasAprobadores> EmpleadosCategoriasAprobadores { get; set; }
        public ICollection<Votos> Votos { get; set; }
    }
}
