using NP.Admin.Domain.Interfaces.Repositories;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using NP.Domain.Entities.CustomEntities;
using System;
using System.Collections.Generic;
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

        public async Task<List<VotosEmitidos>> VotosEmitidos(int empleadoId, DateTime fechaVoto)
        {
            return await this.repository.VotosEmitidos(empleadoId, fechaVoto);
        }

        public async Task<List<VotosEmitidos>> VotosRecibidos(int empleadoId, DateTime fechaVoto)
        {
            return await this.repository.VotosRecibidos(empleadoId, fechaVoto);
        }
    }
    
}