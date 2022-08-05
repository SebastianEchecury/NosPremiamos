using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using TECSO.FWK.Domain.Entities;
using TECSO.FWK.Domain.Extensions;

namespace NP.Admin.Domain.Entities.Filters
{
    public class EmpleadosRolesFilter : FilterPagedListBase<EmpleadosRoles, int>
    {
       
        public int? IdEmpleado { get; set; }
        public override List<Expression<Func<EmpleadosRoles, object>>> GetIncludesForPageList()
        {
            return new List<Expression<Func<EmpleadosRoles, object>>>
            {
                e => e.Rol,
                
            };
        }

        public override List<Expression<Func<EmpleadosRoles, object>>> GetIncludesForGetById()
        {
            return new List<Expression<Func<EmpleadosRoles, object>>>
            {
                e => e.Rol,

            };

        }

        public override Expression<Func<EmpleadosRoles, bool>> GetFilterExpression()
        {
            Expression<Func<EmpleadosRoles, bool>> baseFE = base.GetFilterExpression();

            if (IdEmpleado.HasValue)
            {
               
                baseFE = baseFE.And( e => e.EmpleadoId == IdEmpleado);
            }


            return baseFE;
        }



    }





}
