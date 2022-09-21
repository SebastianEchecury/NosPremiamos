using System.Collections.Generic;
using NP.Admin.Domain.Entities;
using TECSO.FWK.Domain.Entities;

namespace NP.Admin.AppService.Model
{
    public class EmpleadosDto : EntityDto<int>
    {
        public EmpleadosDto()
        {
            //EmpleadosCategoriasAprobadores = new HashSet<EmpleadosCategoriasAprobadoresDto>();
            EmpleadosRoles = new List<EmpleadosRolesDto>();
            //VotosAprobadorEmpleado = new HashSet<VotosDto>();
            //VotosVotadoEmpleado = new HashSet<VotosDto>();
            //VotosVotanteEmpleado = new HashSet<VotosDto>();
        }

        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Usuario { get; set; }
        public string Contraseña { get; set; }
        public bool? Eliminado { get; set; }
        public bool? PrimerIngreso { get; set; }
        public List<int> UsuarioRoles { get; set; }


        //public ICollection<EmpleadosCategoriasAprobadoresDto> EmpleadosCategoriasAprobadores { get; set; }
        public List<EmpleadosRolesDto> EmpleadosRoles { get; set; }
        //public ICollection<VotosDto> VotosAprobadorEmpleado { get; set; }
        //public ICollection<VotosDto> VotosVotadoEmpleado { get; set; }
        //public ICollection<VotosDto> VotosVotanteEmpleado { get; set; }

        public override string Description => this.Apellido + ", "+ this.Nombre;
    }

    public class EmpleadoRepresentante
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
    }

    //public class UserRoleDto
    //{
    //    public int RoleId { get; set; }

    //    public string RoleName { get; set; }

    //    public string RoleDisplayName { get; set; }

    //    public bool IsAssigned { get; set; }
    //}



    //public class GetPermissionsForEditOutput
    //{
    //    public List<FlatPermissionDto> Permissions { get; set; }

    //    public List<string> GrantedPermissionNames { get; set; }

    //    internal static GetPermissionsForEditOutput GetPermissionsForEdit(IReadOnlyList<Permisos> permissions, List<Permisos> grantedPermissions)
    //    {
    //        var result = new GetPermissionsForEditOutput
    //        {
    //            Permissions = permissions.ToList().Select(e => new FlatPermissionDto
    //            {
    //                ParentName = e.Area + "." + e.Page,
    //                Description = e.DisplayName,
    //                Name = e.Token,
    //                DisplayName = e.DisplayName,
    //                IsGrantedByDefault = false
    //            }).ToList(),
    //            GrantedPermissionNames = grantedPermissions.Select(p => p.Token).ToList()
    //        };



    //        foreach (var item in permissions.GroupBy(e => e.Area + "." + e.Page))
    //        {
    //            result.Permissions.Add(new FlatPermissionDto()
    //            {
    //                ParentName = item.FirstOrDefault().Area,
    //                Description = item.FirstOrDefault().PageNavigation.DisplayName,
    //                Name = item.Key,
    //                DisplayName = item.FirstOrDefault().PageNavigation.DisplayName,
    //                IsGrantedByDefault = false
    //            });
    //        }


    //        foreach (var item in permissions.GroupBy(e => e.Area))
    //        {
    //            result.Permissions.Add(new FlatPermissionDto()
    //            {
    //                ParentName = null,
    //                Description = item.FirstOrDefault().AreaNavigation.DisplayName,
    //                Name = item.Key,
    //                DisplayName = item.FirstOrDefault().AreaNavigation.DisplayName,
    //                IsGrantedByDefault = false
    //            });
    //        }

    //        return result;
    //    }
    //}
    //public class UpdateUserPermissionsInput
    //{
    //    public int Id { get; set; }
    //    public List<string> GrantedPermissionNames { get; set; }
    //}

    

    //public class GetUserLineasForEdit
    //{
    //    public int Id { get; set; }
    //    public List<ItemDecimalDto> Lineas { get; set; }

    //    public String Ususario;

    //}

 

    //public class FlatPermissionDto
    //{
    //    public string ParentName { get; set; }

    //    public string Name { get; set; }

    //    public string DisplayName { get; set; }

    //    public string Description { get; set; }

    //    public bool IsGrantedByDefault { get; set; }
    //}


}
