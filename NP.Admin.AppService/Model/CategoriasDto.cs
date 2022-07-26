using AutoMapper;
using AutoMapper.EquivalencyExpression;
using NP.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks; 
using TECSO.FWK.AppService.Model;
using TECSO.FWK.Domain.Entities;

namespace NP.Admin.AppService.Model
{
    public class CategoriasDto :EntityDto<int>
    {
        public CategoriasDto()
        {
            EmpleadosCategoriasAprobadores = new HashSet<EmpleadosCategoriasAprobadoresDto>();
            Votos = new HashSet<VotosDto>();
        }

        public string Descripcion { get; set; }
        public string Nombre { get; set; }
        public int? CantidadVotos { get; set; }
        public bool? IncluyeNovedades { get; set; }
        public bool? RequiereAprobacion { get; set; }
        public int? EstadoId { get; set; }

        public EstadosDto Estado { get; set; }
        public ICollection<EmpleadosCategoriasAprobadoresDto> EmpleadosCategoriasAprobadores { get; set; }
        public ICollection<VotosDto> Votos { get; set; }

        public override string Description => this.Descripcion;
    }


    //public class CategoriasProfile : Profile
    //{
    //    public CategoriasProfile()
    //    {
    //        CreateMap<Categorias, CategoriasDto>()
    //            .EqualityComparison((odto, o) => odto.Id == o.Id);

    //        CreateMap<CategoriasDto, Categorias>()
    //            .EqualityComparison((odto, o) => odto.Id == o.Id);
    //    }
    //}
}
