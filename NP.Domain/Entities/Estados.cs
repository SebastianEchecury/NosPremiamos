using System.Collections.Generic;
using TECSO.FWK.Domain.Entities;

namespace NP.Domain.Entities
{
    public partial class Estados: Entity<int>
    {
        public Estados()
        {
            Categorias = new HashSet<Categorias>();
        }

        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        public ICollection<Categorias> Categorias { get; set; }

    }
}
