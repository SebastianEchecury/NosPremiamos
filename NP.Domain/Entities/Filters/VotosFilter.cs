using NP.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using TECSO.FWK.Domain.Entities;

namespace NP.Admin.Domain.Entities.Filters
{
    public class VotosFilter : FilterPagedListBase<Votos, int>
    {
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
