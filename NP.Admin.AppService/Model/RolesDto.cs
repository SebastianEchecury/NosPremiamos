using System.Collections.Generic;
using TECSO.FWK.Domain.Entities;

namespace NP.Admin.AppService.Model
{
    public class RolesDto : EntityDto<int>
    {
        

        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public bool? Activo { get; set; }

       
        public override string Description => this.Descripcion;
    }
}
