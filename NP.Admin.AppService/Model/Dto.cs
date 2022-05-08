using System.ComponentModel.DataAnnotations;

namespace NP.Admin.AppService.Model
{
    public class Dto : TECSO.FWK.Domain.Entities.EntityDto<int>
    {
        [StringLength(100)]
        public string Nombre { get; set; }

        public override string Description => this.Nombre;
    }
}
