﻿using System.ComponentModel.DataAnnotations;

namespace NP.Admin.Domain
{
    public class ResetPasswordInput
    { 
        [Required]        
        public string Password { get; set; }

        [Required]
        public string PasswordNueva { get; set; }


        //public string ReturnUrl { get; set; }

        //public string SingleSignIn { get; set; }
    }
    public class ResetPasswordOutput
    {
        public bool CanLogin { get; set; }

        public string UserName { get; set; }
    }
}
