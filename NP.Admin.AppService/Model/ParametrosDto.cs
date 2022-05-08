using TECSO.FWK.Domain.Entities;

namespace NP.Admin.AppService.Model
{
    public class ParametrosDto :EntityDto<int>
    {
        public string Token { get; set; }
        public string Valor { get; set; }
        public string Descripcion { get; set; }
        public int TipoDatoId { get; set; }

        public TipoDatoDto TipoDato { get; set; }


        public override string Description => this.Descripcion;
    }
}
