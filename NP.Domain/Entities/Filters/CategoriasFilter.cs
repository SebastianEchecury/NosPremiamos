using TECSO.FWK.Domain.Entities;
using System.Linq.Expressions;
using System;
using TECSO.FWK.Domain.Extensions;
using NP.Domain.Entities;
using NP.Domain.Entities.CustomEntities;

namespace NP.Admin.Domain.Entities.Filters
{
    public class CategoriasFilter : FilterPagedListBase<Categorias, int>
    {
        public string Descripcion { get; set; }
        public string Nombre { get; set; }
        public int? EstadoId { get; set; }
        public bool? RequiereAprobacion { get; set; }
        public bool? IncluyeNovedades { get; set; }
        public int? CantidadVotos { get; set; } 
        public bool? RankingVotos { get; set; }
        public string Categoria { get; set; }
        public string Ganador { get; set; }

        public override Expression<Func<Categorias, bool>> GetFilterExpression()
        {
            Expression<Func<Categorias, bool>> baseFE = base.GetFilterExpression();

            if (!String.IsNullOrEmpty(this.Descripcion))
            {
                Expression<Func<Categorias, bool>> filterTextExp = e => e.Descripcion.Contains(this.Descripcion);
                baseFE = baseFE.And(filterTextExp);
            }

            if (!string.IsNullOrEmpty(this.Nombre))
            {
                Expression<Func<Categorias, bool>> filterTextExp = e => e.Nombre.Contains(this.Nombre);
                baseFE = baseFE.And(filterTextExp);
            }

            if (this.EstadoId.HasValue)
            {
                Expression<Func<Categorias, bool>> filterTextExp = e => e.EstadoId.Equals(this.EstadoId.Value);
                baseFE = baseFE.And(filterTextExp);
            }

            if (this.CantidadVotos.HasValue)
            {
                baseFE = baseFE.And(e => e.CantidadVotos == this.CantidadVotos.Value);

            }

            if (this.IncluyeNovedades.HasValue)
            {
                baseFE = baseFE.And(e => e.IncluyeNovedades == this.IncluyeNovedades.Value);

            }

            if (this.RequiereAprobacion.HasValue)
            {
                baseFE = baseFE.And(e => e.RequiereAprobacion == this.RequiereAprobacion.Value);

            }

            return baseFE;
        }
    }





}
