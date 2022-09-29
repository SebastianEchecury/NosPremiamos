using NP.Admin.Domain.Entities.Filters;
using NP.Admin.Domain.Interfaces.Repositories;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using NP.Domain.Entities.CustomEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Services;

namespace NP.Admin.Domain.Services
{
    public class CategoriasService : ServiceBase<Categorias, int, ICategoriasRepository>, ICategoriasService
    {
        public CategoriasService(ICategoriasRepository Repository)
            : base(Repository)
        {
        }

        protected override async Task<bool> ValidateEntity(Categorias entity, SaveMode mode)
        {
            bool exist = this.repository.GetAllAsync(new CategoriasFilter()
                                                            {
                                                                Nombre = entity.Nombre,
                                                                EstadoId = (int)Estados.EstadoCategoria.Activo,
                                                                Id = entity.Id
                                                            }).Result.Any(c => c.Id != entity.Id);

            if (exist)
                throw new ValidationException("Ya existe una categor�a activa con el mismo nombre.");

            return await base.ValidateEntity(entity, mode);
        }

        public async Task<List<Ganadores>> Ganadores(DateTime fechaVoto)
        {
            return await this.repository.Ganadores(fechaVoto);
        }

    }

}
