using NP.Admin.Domain.Entities;
using System.Collections.Generic;
using TECSO.FWK.Domain.Entities;

namespace NP.Domain.Entities
{
    public partial class TipoDato: Entity<int>
    {
        public enum TipoDatoEnum
        {
            String = 1,
            Int32,
            Decimal,
            Int64,
            Boolean,
            DateTime
        }

        public TipoDato()
        {
            Parametros = new HashSet<Parametros>();
        }

        public string Descripcion { get; set; }

        public ICollection<Parametros> Parametros { get; set; }
    }
}
