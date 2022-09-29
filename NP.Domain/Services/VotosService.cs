using NP.Admin.Domain.Interfaces.Repositories;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using TECSO.FWK.Domain.Services;

namespace NP.Admin.Domain.Services
{
    public class VotosService : ServiceBase<Votos, int, IVotosRepository>, IVotosService
    {
        

        public VotosService(IVotosRepository Repository)
            : base(Repository)
        {
        }


    }
    
}
