using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using System;
using System.Threading.Tasks;
using TECSO.FWK.AppService;

namespace NP.Admin.AppService
{

    public class VotosAppService : AppServiceBase<Votos, VotosDto, int, IVotosService>, IVotosAppService
    {
        public VotosAppService(IVotosService serviceBase) 
            :base(serviceBase)
        {
         
        }


        public override Task<VotosDto> AddAsync(VotosDto dto)
        {
            dto.FechaVoto = DateTime.Now;

            return base.AddAsync(dto);
        }
    }
}
