using System;
using System.Collections.Generic;
using System.Text;

namespace NP.Domain.Entities.CustomEntities
{
    public class VotosEmitidos
    {
        public string FechaVoto { get; set; }
        public string Motivo { get; set; }
        public string Votante { get; set; }
        public string Aprobador { get; set; }
        public string NombreCategoria { get; set; }
    }
}
