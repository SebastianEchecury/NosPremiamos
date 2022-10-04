using NP.Admin.Domain.Entities;
using NP.Domain.Entities;
using NP.Domain.Entities.CustomEntities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Interfaces.Repositories;

namespace NP.Admin.Domain.Interfaces.Repositories
{
    public interface ICategoriasRepository : IRepositoryBase<Categorias,int>
    {
        Task<List<Ganadores>> Ganadores(DateTime fechaVoto, string filtroNombre, string filtroCategoria);
    }
}
