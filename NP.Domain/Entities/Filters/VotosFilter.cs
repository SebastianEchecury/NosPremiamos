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
        public string Motivo { get; set; }
        public string VotadoEmpleado { get; set; }
        public string VotanteEmpleado { get; set; }
        public string Categoria { get; set; }
        public bool?  MisVotos { get; set; }
        public bool? VotosEmitidos { get; set; }
        public string FechaVoto { get; set; }
        public int UsuarioId { get; set; }
        public string Aprobador { get; set; }
        public string Votado { get; set; }
        public string Votante { get; set; }


        public override Expression<Func<Votos, bool>> GetFilterExpression()
        {
            Expression<Func<Votos, bool>> baseFE = base.GetFilterExpression();
            
            if (this.CategoriaRequiereAprobacion.HasValue)
            {
                baseFE = baseFE.And(e => e.Categoria.RequiereAprobacion == this.CategoriaRequiereAprobacion.Value && e.Aprobado == null);
            }

            if (this.EmpleadoAprobador.HasValue)
            {
                baseFE = baseFE.And(e => e.Categoria.EmpleadosCategoriasAprobadores.Any(r=> r.EmpleadoId == EmpleadoAprobador));
            }

            if (!String.IsNullOrEmpty(this.Motivo))
            {
                Expression<Func<Votos, bool>> filterTextExp = e => e.Motivo.Contains(this.Motivo);
                baseFE = baseFE.And(filterTextExp);
            }

            if (!String.IsNullOrEmpty(this.VotanteEmpleado))
            {
                Expression<Func<Votos, bool>> filterTextExp = e => (e.VotanteEmpleado.Apellido + ", " + e.VotanteEmpleado.Nombre).Contains(this.VotanteEmpleado);
                baseFE = baseFE.And(filterTextExp);
            }

            if (!String.IsNullOrEmpty(this.VotadoEmpleado))
            {
                Expression<Func<Votos, bool>> filterTextExp = e => (e.VotadoEmpleado.Apellido + ", " + e.VotadoEmpleado.Nombre).Contains(this.VotadoEmpleado);
                baseFE = baseFE.And(filterTextExp);
            }

            if (!String.IsNullOrEmpty(this.Categoria))
            {
                Expression<Func<Votos, bool>> filterTextExp = e => e.Categoria.Nombre.Contains(this.Categoria);
                baseFE = baseFE.And(filterTextExp);
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
