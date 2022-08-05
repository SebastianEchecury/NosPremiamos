using NP.Admin.Domain.Entities;
using NP.Admin.Domain.Entities.Filters;
using NP.Admin.Domain.Interfaces.Repositories;
using NP.Admin.Domain.Interfaces.Services;
using NP.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TECSO.FWK.Domain;
using TECSO.FWK.Domain.Services;

namespace NP.Admin.Domain.Services
{
    public class EmpleadoService : ServiceBase<Empleados, int, IEmpleadoRepository>, IEmpleadoService
    {


        public EmpleadoService(IEmpleadoRepository repository)
            : base(repository)
        {
             
        }

        public async Task<List<EmpleadosRoles>> GetUserRoles(int id)
        {
            return await this.repository.GetUserRoles(id);
        }

        public async Task<Empleados> Login(string Username, string Password)
        {
            var User = await this.repository.GetUser(Username);
             
            return User;
        }

  

        public async Task<List<Permisos>> GetGrantedPermissionsAsync(int userId)
        {
            return await repository.GetGrantedPermissionsAsync(userId);
        }

        public async Task SetGrantedPermissionsAsync(int userId, List<string> grantedPermissionNames)
        {
            await repository.SetGrantedPermissionsAsync(userId, grantedPermissionNames);
        }



        protected override async void ValidateEntity(Empleados entity, SaveMode mode)
        {
            if (mode == SaveMode.Add)
            {
                 Empleados existuser = (await this.repository.GetAllAsync( new EmpleadosFilter() { Usuario = entity.Usuario })).FirstOrDefault();

                if (existuser != null)
                    throw new DomainValidationException("El Usuario ya existe");

            }

            base.ValidateEntity(entity, mode);
        }
       
       
    }
}
