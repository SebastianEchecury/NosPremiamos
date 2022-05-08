using Microsoft.EntityFrameworkCore;
using NP.Admin.Domain.Interfaces.Repositories;
using NP.infra.Data.Contexto;
using static TECSO.FWK.Domain_Std.Renaper.ErrorValidacion;

namespace SW.infra.Data.Contexto
{
    public class ErrorDBContext : BaseContext, IErrorDbContext
    {

        

        public ErrorDBContext(DbContextOptions<ErrorDBContext> options)
            : base(options)
        {

        }



        


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            //modelBuilder.Entity<Logs>(entity =>
            //{
            //    entity.HasKey(e => e.Id);
            //    entity.Property(e => e.Id).ValueGeneratedOnAdd();
            //});

            //modelBuilder.Entity<Error>(entity =>
            //{
            //    entity.HasKey(e => e.Id);
            //    entity.Property(e => e.Id).ValueGeneratedOnAdd();
            //});

            //modelBuilder.ApplyConfiguration<Producto>(new ProductoConfiguration());
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }


        public override int? GetAuditUserId()
        {
            return AuditUserId ?? (AuditUserId = authService.GetCurretUserId());
        }

        
    }
}
