using System;
using System.Collections.Generic;
using System.Text;

namespace TECSO.FWK.ApiServices
{
    public enum ActionStatus
    {
        Ok = 0, 
        Error,
        Warning,
        ValidationError,
        OkAndConfirm
    }
}
