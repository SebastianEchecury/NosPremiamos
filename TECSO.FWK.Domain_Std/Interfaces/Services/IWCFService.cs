using System;
using System.Collections.Generic;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using TECSO.FWK.Domain.Entities;

namespace TECSO.FWK.Domain_Std.Interfaces.Services
{
    [ServiceContract]
    public interface IWCFService<TDto, Tfilter>: IDisposable
        where TDto: IGenericDto
        where Tfilter : GenericFilterCriteria
    {

        [OperationContract]
        [FaultContract(typeof(ExceptionDetail))]
        Task<List<TDto>> GetAllByFilterAsync(Tfilter filter);
    }
}
