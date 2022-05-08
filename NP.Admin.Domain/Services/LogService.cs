using EOH.Admin.Domain.Entities;
using EOH.Admin.Domain.Interfaces.Repositories;
using EOH.Admin.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;
using TECSO.FWK.Domain.Services;

namespace EOH.Admin.Domain.Services
{
    public class LogService : ServiceBase<Logs,Int64, ILogRepository>, ILogService
    {

        public LogService(ILogRepository repository)
            : base(repository)
        {
            
        }

    }
    
}
