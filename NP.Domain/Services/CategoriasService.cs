using NP.Admin.Domain.Interfaces.Repositories;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using TECSO.FWK.Domain.Services;

namespace NP.Admin.Domain.Services
{
    public class CategoriasService : ServiceBase<Categorias,int, ICategoriasRepository>, ICategoriasService
    {
        

        public CategoriasService(ICategoriasRepository Repository)
            : base(Repository)
        {
        }


    }
    
}
