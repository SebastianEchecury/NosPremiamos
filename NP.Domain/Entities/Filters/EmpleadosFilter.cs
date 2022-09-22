using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using TECSO.FWK.Domain.Entities;
using NP.Domain.Entities;
using TECSO.FWK.Domain.Extensions;

namespace NP.Admin.Domain.Entities.Filters
{
    public class EmpleadosFilter : FilterPagedListBase<Empleados, int>
    {
        public string Nombre { get;  set; }
        public string Usuario { get; set; }
        public bool? Eliminado { get; set; }
        public string Apellido { get; set; }

               

        public List<int> Roles { get; set; }

        public override List<Expression<Func<Empleados, object>>> GetIncludesForPageList()
        {
            return new List<Expression<Func<Empleados, object>>>
            {
                e => e.EmpleadosRoles,
                
            };
        }

        public override Expression<Func<Empleados, bool>> GetFilterExpression()
        {
            Expression<Func<Empleados, bool>> baseFE = base.GetFilterExpression();

            if (!String.IsNullOrEmpty(this.Nombre))
            {
                Expression<Func<Empleados, bool>> filterTextExp = e => e.Nombre.Contains(this.Nombre);
                baseFE = baseFE.And(filterTextExp);
            }
            if (!String.IsNullOrEmpty(this.Apellido))
            {
                Expression<Func<Empleados, bool>> filterTextExp = e => e.Apellido.Contains(this.Apellido);
                baseFE = baseFE.And(filterTextExp);
            }
            if (!string.IsNullOrEmpty(this.Usuario))
            {
                Expression<Func<Empleados, bool>> filterTextExp = e => e.Usuario.Contains(this.Usuario);
                baseFE = baseFE.And(filterTextExp);
            }

            if (Eliminado.HasValue)
            {
                baseFE = baseFE.And(e => e.Eliminado == this.Eliminado);
            }


            return baseFE;
        }

    }

}
