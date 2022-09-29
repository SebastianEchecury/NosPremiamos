using NP.Admin.Domain.Entities;
using NP.Domain.Entities;
using NP.Domain.Entities.CustomEntities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Interfaces.Repositories;

namespace NP.Admin.Domain.Interfaces.Repositories
{
    public interface IVotosRepository : IRepositoryBase<Votos,int>
    {
        Task<List<Ranking>> Ranking(int? categoriaId, DateTime fechaVoto);
        Task<List<VotosEmitidos>> VotosEmitidos(int empleadoId, DateTime fechaVoto);
        Task<List<VotosEmitidos>> VotosRecibidos(int empleadoId, DateTime fechaVoto);
    }
}
