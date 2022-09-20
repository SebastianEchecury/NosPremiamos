using TECSO.FWK.Domain.Entities;
using NP.Admin.Domain.Entities;
using System.Linq.Expressions;
using System;
using TECSO.FWK.Domain.Extensions;

namespace NP.Admin.Domain.Entities.Filters
{
    public class ParametrosFilter : FilterPagedListBase<Parametros, int>
    {
        public string Token { get; set; }
        public string Valor { get; set; }

        public override Expression<Func<Parametros, bool>> GetFilterExpression()
        {
            Expression<Func<Parametros, bool>> baseFE = base.GetFilterExpression();

            if (!String.IsNullOrEmpty(this.Token))
            {
                Expression<Func<Parametros, bool>> filterTextExp = e => e.Token.Contains(this.Token);
                baseFE = baseFE.And(filterTextExp);
            }

            if (!string.IsNullOrEmpty(this.Valor))
            {
                Expression<Func<Parametros, bool>> filterTextExp = e => e.Valor.Contains(this.Valor);
                baseFE = baseFE.And(filterTextExp);
            }


            return baseFE;
        }
    }
}
