using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities;
using NP.Domain.Entities;
using NP.Domain.Entities.CustomEntities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TECSO.FWK.AppService.Interface;

namespace NP.Admin.AppService.Interface
{
    public interface IVotosAppService : IAppServiceBase<Votos, VotosDto, int>
    {
        Task<List<Ranking>> Ranking(int? categoriaId, DateTime fechaVoto);
        Task<List<VotosEmitidos>> VotosEmitidos(int empleadoId, DateTime fechaVoto);
        Task<List<VotosEmitidos>> VotosRecibidos(int empleadoId, DateTime fechaVoto);
    }
}
