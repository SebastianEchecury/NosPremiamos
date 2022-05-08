using System.Collections.Generic;
using TECSO.FWK.Domain.Entities;

namespace NP.Admin.AppService.Model
{
    public class TipoDatoDto : EntityDto<int>
    {
        public TipoDatoDto()
        {
            Parametros = new HashSet<ParametrosDto>();
        }

        public string Descripcion { get; set; }

        public ICollection<ParametrosDto> Parametros { get; set; }
        public override string Description => this.Descripcion;
    }
}
