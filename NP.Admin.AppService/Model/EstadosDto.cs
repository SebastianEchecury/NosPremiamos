using System.Collections.Generic;
using TECSO.FWK.Domain.Entities;

namespace NP.Admin.AppService.Model
{
    public class EstadosDto : EntityDto<int>
    {
        public EstadosDto()
        {
            Categorias = new HashSet<CategoriasDto>();
        }

        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        public ICollection<CategoriasDto> Categorias { get; set; }


        public override string Description => this.Descripcion;
    }
}
