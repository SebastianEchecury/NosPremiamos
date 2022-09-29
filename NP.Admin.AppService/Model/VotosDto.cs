using System;
using TECSO.FWK.Domain.Entities;

namespace NP.Admin.AppService.Model
{
    public class VotosDto : EntityDto<int>
    {
        public int VotadoEmpleadoId { get; set; }
        public int VotanteEmpleadoId { get; set; }
        public DateTime? FechaVoto { get; set; }
        public int? AprobadorEmpleadoId { get; set; }
        public DateTime? FechaAprobado { get; set; }
        public int CategoriaId { get; set; }
        public string Motivo { get; set; }

        public EmpleadosDto AprobadorEmpleado { get; set; }
        public CategoriasDto Categoria { get; set; }
        public EmpleadosDto VotadoEmpleado { get; set; }
        public EmpleadosDto VotanteEmpleado { get; set; }


        public override string Description => null;
    }
}
