using NP.Domain.Entities;
using TECSO.FWK.Domain.Entities;

namespace NP.Admin.Domain.Entities
{
    public partial class Parametros : Entity<int>
    {
        public string Token { get; set; }
        public string Valor { get; set; }
        public string Descripcion { get; set; }
        public int TipoDatoId { get; set; }

        public TipoDato TipoDato { get; set; }
    }

   
}

