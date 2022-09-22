using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using System.Threading.Tasks;
using TECSO.FWK.AppService;

namespace NP.Admin.AppService
{

    public class CategoriasAppService : AppServiceBase<Categorias, CategoriasDto, int, ICategoriasService>, ICategoriasAppService
    {
        public CategoriasAppService(ICategoriasService serviceBase) : base(serviceBase)
        {


        }
        public override Task<CategoriasDto> AddAsync(CategoriasDto dto)
        {
            dto.EstadoId = (int)Estados.EstadoCategoria.Activo;
            return base.AddAsync(dto);
        }

        public override Task<CategoriasDto> UpdateAsync(CategoriasDto dto)
        {
            dto.EstadoId = (int)Estados.EstadoCategoria.Activo;
            return base.UpdateAsync(dto);
        }

        public override async Task DeleteAsync(int id)
        {
            CategoriasDto categoria = await this.GetDtoByIdAsync(id);
            if (categoria != null)
            {
                categoria.EstadoId = (int)Estados.EstadoCategoria.Inactivo;
                await base.UpdateAsync(categoria);
            }
        }
    }
}
