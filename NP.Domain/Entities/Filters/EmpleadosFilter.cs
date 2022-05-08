using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using TECSO.FWK.Domain.Entities;
using NP.Domain.Entities;

namespace NP.Admin.Domain.Entities.Filters
{
    public class EmpleadosFilter : FilterPagedListBase<Empleados, int>
    {
        public string Nombre { get; internal set; }

        public override List<Expression<Func<Empleados, object>>> GetIncludesForPageList()
        {
            return new List<Expression<Func<Empleados, object>>>
            {
                e => e.EmpleadosRoles
            };
        }

      
    }





}
