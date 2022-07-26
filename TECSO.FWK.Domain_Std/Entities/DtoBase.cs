using System;
using System.Collections.Generic;
using System.Text;
using TECSO.FWK.Domain.Interfaces.Entities;

namespace TECSO.FWK.Domain.Entities
{
    public abstract class EntityDto<TPrimaryKey> : IEntityDto<TPrimaryKey>
    { 
        public EntityDto()
        {
            
        }


        public TPrimaryKey Id { get; set; }
        public abstract string Description { get; }
    }

    public interface IEntityDto<TPrimaryKey>: IGenericDto
    {
        TPrimaryKey Id { get; set; }
        
    }


    public interface IGenericDto
    {
        string Description { get; }
    }

}
