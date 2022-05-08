using TECSO.FWK.Domain.Entities;

namespace NP.Domain.Entities
{
    public partial class EmpleadosCategoriasAprobadores: Entity<int>
    {
       
            public int EmpleadoId { get; set; }
            public int CategoriaId { get; set; }

            public Categorias Categoria { get; set; }
            public Empleados Empleado { get; set; }
    }
}
