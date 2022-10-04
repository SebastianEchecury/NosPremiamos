using System;
using System.Collections.Generic;
using System.Text;

namespace NP.Domain.Entities.CustomEntities
{
    public class Ganadores
    {
        public string Categoria { get; set; }
        public string Ganador { get; set; }
        public int CantVotos { get; set; }
        public int VotosCategoria { get; set; }
    }
}
