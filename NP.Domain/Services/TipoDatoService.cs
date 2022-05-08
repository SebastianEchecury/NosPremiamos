using NP.Admin.Domain.Interfaces.Repositories;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using TECSO.FWK.Domain.Services;

namespace NP.Admin.Domain.Services
{
    public class TipoDatoService : ServiceBase<TipoDato,int, ITipoDatoRepository>, ITipoDatoService
    { 
        public TipoDatoService(ITipoDatoRepository Repository)
            : base(Repository)
        {
       
        }

    }
    
}
