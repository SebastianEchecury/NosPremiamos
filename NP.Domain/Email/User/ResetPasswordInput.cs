using System.ComponentModel.DataAnnotations;

namespace NP.Admin.Domain
{
    public class ResetPasswordInput
    { 
        [Required]        
        public string Password { get; set; }

        [Required]
        public string PasswordNueva { get; set; }

        public int?  EmpleadoId { get; set; }
    }
    public class ResetPasswordOutput
    {
        public bool CanLogin { get; set; }

        public string UserName { get; set; }
    }
}
