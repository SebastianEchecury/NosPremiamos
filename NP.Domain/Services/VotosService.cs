using NP.Admin.Domain.Interfaces.Repositories;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using NP.Domain.Entities.CustomEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Services;

namespace NP.Admin.Domain.Services
{
    public class VotosService : ServiceBase<Votos, int, IVotosRepository>, IVotosService
    {
        public VotosService(IVotosRepository Repository)
            : base(Repository)
        {
        }

        public async Task<List<Ranking>> Ranking(int? categoriaId, DateTime fechaVoto)
        {
            return await this.repository.Ranking(categoriaId, fechaVoto);
        }

        public async Task<List<VotosEmitidos>> VotosEmitidos(int empleadoId, DateTime fechaVoto, string categoria, string aprobador, string votado, string motivo)
        {
            return await this.repository.VotosEmitidos(empleadoId, fechaVoto, categoria, aprobador, votado, motivo);
        }

        public async Task<List<VotosEmitidos>> VotosRecibidos(int empleadoId, DateTime fechaVoto, string categoria, string aprobador, string votante, string motivo)
        {
            return await this.repository.VotosRecibidos(empleadoId, fechaVoto, categoria, aprobador, votante, motivo);
        }

        protected override async Task<bool> ValidateEntity(Votos entity, SaveMode mode)
        {
            if (entity.VotanteEmpleadoId == entity.VotadoEmpleadoId)
                throw new ValidationException("El empleado votado no puede ser el mismo que el empleado que vota.");

            return await base.ValidateEntity(entity, mode);
        }
    }
    
}
