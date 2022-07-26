using EOH.Admin.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using TECSO.FWK.Domain.Interfaces.Repositories;

namespace EOH.Admin.Domain.Interfaces.Repositories
{
    public interface IErrorRepository : IRepositoryBase<Error, Int64>
    {

    }
}
