using NP.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using TECSO.FWK.Domain.Entities;
using TECSO.FWK.Domain.Extensions;

namespace NP.Admin.Domain.Entities.Filters
{
    public class VotosFilter : FilterPagedListBase<Votos, int>
    {
        public bool? CategoriaRequiereAprobacion { get; set; }

        public int? EmpleadoAprobador { get; set; }

        public override Expression<Func<Votos, bool>> GetFilterExpression()
        {
            Expression<Func<Votos, bool>> baseFE = base.GetFilterExpression();
            
            if (this.CategoriaRequiereAprobacion.HasValue)
            {
                baseFE = baseFE.And(e => e.Categoria.RequiereAprobacion == this.CategoriaRequiereAprobacion.Value);
            }

            if (this.EmpleadoAprobador.HasValue)
            {
                baseFE = baseFE.And(e => e.Categoria.EmpleadosCategoriasAprobadores.Any(r=> r.EmpleadoId == EmpleadoAprobador));
            }

            return baseFE;
        }

        public override List<Expression<Func<Votos, object>>> GetIncludesForPageList()
        {
            return new List<Expression<Func<Votos, object>>>
            {
                e => e.Categoria,
                e=> e.VotadoEmpleado,
                e=> e.VotanteEmpleado,

            };
        }


    }
}
