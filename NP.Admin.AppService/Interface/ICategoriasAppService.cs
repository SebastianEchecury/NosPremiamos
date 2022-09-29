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
    public interface ICategoriasAppService : IAppServiceBase<Categorias, CategoriasDto, int>
    {
        Task<List<Ganadores>> Ganadores(DateTime fechaVoto);
    }
}
