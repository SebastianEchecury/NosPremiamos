using NP.Admin.AppService.Interface;
using NP.Admin.AppService.Model;
using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using NP.Domain.Entities.CustomEntities;
using System;
using System.Collections.Generic;
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

        public async Task<List<Ranking>> Ranking(int? categoriaId, DateTime fechaVoto)
        {
            return await this._serviceBase.Ranking(categoriaId, fechaVoto);
        }

        public async Task<List<VotosEmitidos>> VotosEmitidos(int empleadoId, DateTime fechaVoto)
        {
            return await this._serviceBase.VotosEmitidos(empleadoId, fechaVoto);
        }

        public async Task<List<VotosEmitidos>> VotosRecibidos(int empleadoId, DateTime fechaVoto)
        {
            return await this._serviceBase.VotosRecibidos(empleadoId, fechaVoto);
        }

        public override Task DeleteAsync(int id)
        {
            return base.DeleteAsync(id);
        }   

    }
}
