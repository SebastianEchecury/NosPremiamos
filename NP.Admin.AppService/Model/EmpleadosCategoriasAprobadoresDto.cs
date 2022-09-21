using TECSO.FWK.Domain.Entities;

namespace NP.Admin.AppService.Model
{
    public class EmpleadosCategoriasAprobadoresDto : EntityDto<int>
    {
        public int EmpleadoId { get; set; }
        public int CategoriaId { get; set; }

        //public CategoriasDto Categoria { get; set; }
        public EmpleadosDto Empleado { get; set; }


        public override string Description => this.EmpleadoId.ToString() + this.CategoriaId.ToString();
    }
}
