using NP.Admin.Domain.Entities;
using System.Collections.Generic;
using TECSO.FWK.Domain.Entities;

namespace NP.Domain.Entities
{
    public partial class TipoDato: Entity<int>
    {
            public TipoDato()
            {
                Parametros = new HashSet<Parametros>();
            }

            public string Descripcion { get; set; }

            public ICollection<Parametros> Parametros { get; set; }
    }
}
