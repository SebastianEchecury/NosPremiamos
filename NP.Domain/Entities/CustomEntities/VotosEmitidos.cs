using System;
using System.Collections.Generic;
using System.Text;

namespace NP.Domain.Entities.CustomEntities
{
    public class VotosEmitidos
    {
        public int VotoId { get; set; }
        public DateTime FechaVoto { get; set; }
        public bool? Aprobado { get; set; }
        public DateTime FechaAprobado { get; set; }
        public string Motivo { get; set; }
        public int VotadoEmpleadoId { get; set; }
        public int VotanteEmpleadoId { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Usuario { get; set; }
        public string Aprobador { get; set; }
        public int CategoriaId { get; set; }
        public string NombreCategoria { get; set; }
    }
}
