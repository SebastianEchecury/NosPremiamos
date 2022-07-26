using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TECSO.FWK.Domain_Std.exeptions
{
    [Serializable]
    public class BlockerValidationException : ValidationException
    {
        public BlockerValidationException(string message, bool isBlocker) : base(message)
        {
            this.IsBlocker = isBlocker;
        }

        public bool IsBlocker { get; set; }
    }
}
