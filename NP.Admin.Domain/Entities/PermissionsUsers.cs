﻿using System;
using System.Collections.Generic;
using TECSO.FWK.Domain.Entities;

namespace EOH.Admin.Domain.Entities
{
    public partial class SysPermissionsUsers : Entity<long>
    {

        public long PermissionId { get; set; }
        public int UserId { get; set; }

        public SysPermissions Permission { get; set; }
        public SysUsers User { get; set; }
    }
}
