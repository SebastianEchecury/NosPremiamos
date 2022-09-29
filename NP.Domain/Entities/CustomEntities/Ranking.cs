using System;
using System.Collections.Generic;
using System.Text;

namespace NP.Domain.Entities.CustomEntities
{
    public class Ranking
    {
        public int CantVotos { get; set; }
        public int VotadoEmpleadoId { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Usuario { get; set; }
    }
}
