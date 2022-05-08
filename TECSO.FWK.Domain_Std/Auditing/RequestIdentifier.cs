using System;
using System.Collections.Generic;
using System.Text;
using TECSO.FWK.Domain_Std.Interfaces;

namespace TECSO.FWK.Domain_Std.Auditing
{
    public class RequestIdentifier : ÌRequestIdentifier
    {
        public RequestIdentifier()
        {
            this.SessionId = Guid.NewGuid();
        }

        public Guid SessionId { get; set; }
    }
}
