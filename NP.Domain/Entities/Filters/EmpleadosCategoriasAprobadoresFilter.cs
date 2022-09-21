using TECSO.FWK.Domain.Entities;
using NP.Admin.Domain.Entities;
using NP.Domain.Entities;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using TECSO.FWK.Domain.Extensions;

namespace NP.Admin.Domain.Entities.Filters
{
  
    public class EmpleadosCategoriasAprobadoresFilter : FilterPagedListBase<EmpleadosCategoriasAprobadores, int>
    {

        public int? categoriaId { get; set; }

        public override List<Expression<Func<EmpleadosCategoriasAprobadores, object>>> GetIncludesForPageList()
        {
            return new List<Expression<Func<EmpleadosCategoriasAprobadores, object>>>
            {
                e => e.Empleado,

            };
        }

        public override Expression<Func<EmpleadosCategoriasAprobadores, bool>> GetFilterExpression()
        {
            Expression<Func<EmpleadosCategoriasAprobadores, bool>> baseFE = base.GetFilterExpression();

            
            if (categoriaId.HasValue)
            {
                baseFE = baseFE.And(e => e.CategoriaId == this.categoriaId);
            }


            return baseFE;
        }




    }


    }

