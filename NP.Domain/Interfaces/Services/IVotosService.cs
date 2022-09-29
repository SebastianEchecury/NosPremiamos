using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Entities.Filters;
using NP.Domain.Entities;
using NP.Domain.Entities.CustomEntities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Entities;
using TECSO.FWK.Domain.Interfaces.Services;

namespace NP.Admin.Domain.Interfaces.Services
{
    public interface IVotosService : IServiceBase<Votos, int>
    {
        Task<List<Ranking>> Ranking(int? categoriaId, DateTime fechaVoto);
    }
}
