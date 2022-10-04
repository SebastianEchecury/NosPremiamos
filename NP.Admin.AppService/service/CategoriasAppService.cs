using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Entities.Filters;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using NP.Domain.Entities.CustomEntities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TECSO.FWK.AppService;

namespace NP.Admin.AppService
{
    public class CategoriasAppService : AppServiceBase<Categorias, CategoriasDto, int, ICategoriasService>, ICategoriasAppService
    {
        private readonly IEmpleadosCategoriasAprobadoresService _ecmpleadosCategoriasAprobadoresService;
        public CategoriasAppService(ICategoriasService serviceBase, IEmpleadosCategoriasAprobadoresService empleadosCategoriasAprobadoresService) : base(serviceBase)
        {
            _ecmpleadosCategoriasAprobadoresService = empleadosCategoriasAprobadoresService;

        }
        public override Task<CategoriasDto> AddAsync(CategoriasDto dto)
        {
            dto.EstadoId = (int)Estados.EstadoCategoria.Activo;
            return base.AddAsync(dto);
        }

        public override async Task<CategoriasDto> UpdateAsync(CategoriasDto dto)
        {
            //dto.EstadoId = (int)Estados.EstadoCategoria.Activo;
            if(dto.RequiereAprobacion.HasValue && !dto.RequiereAprobacion.Value)
            {
                EmpleadosCategoriasAprobadoresFilter filter = new EmpleadosCategoriasAprobadoresFilter();
                filter.categoriaId = dto.Id;
                var emplCatApro = _ecmpleadosCategoriasAprobadoresService.GetAllAsync(filter).Result;
                foreach (var eca in emplCatApro)
                {
                   await _ecmpleadosCategoriasAprobadoresService.DeleteAsync(eca.Id);
                }
            }

            return await base.UpdateAsync(dto);
        }

        public override async Task DeleteAsync(int id)
        {
            CategoriasDto categoria = await this.GetDtoByIdAsync(id);
            if (categoria != null)
            {
                if (categoria.EstadoId == (int)Estados.EstadoCategoria.Activo)
                {
                    categoria.EstadoId = (int)Estados.EstadoCategoria.Inactivo;
                }
                else
                {
                    categoria.EstadoId = (int)Estados.EstadoCategoria.Activo;
                }
                await base.UpdateAsync(categoria);
            }
        }

        public async Task<List<Ganadores>> Ganadores(DateTime fechaVoto,string filtroNombre, string filtroCategoria)
        {
            return await this._serviceBase.Ganadores(fechaVoto, filtroNombre, filtroCategoria);
        }
    }
}
