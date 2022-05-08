using Microsoft.EntityFrameworkCore;
using NP.Admin.Domain.Entities;
using NP.Domain.Entities;

namespace NP.infra.Data.EntityConfig
{
    public static class Configuration
    {
        public static void ApplyConfigurations(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categorias>(entity =>
            {
                entity.Property(e => e.Descripcion).HasMaxLength(100);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.HasOne(d => d.Estado)
                    .WithMany(p => p.Categorias)
                    .HasForeignKey(d => d.EstadoId)
                    .HasConstraintName("FK_Categorias_Estados");
            });

            modelBuilder.Entity<Empleados>(entity =>
            {
                entity.Property(e => e.Apellido).HasMaxLength(30);

                entity.Property(e => e.Nombre).HasMaxLength(30);
            });

            modelBuilder.Entity<EmpleadosCategoriasAprobadores>(entity =>
            {
                entity.HasOne(d => d.Categoria)
                    .WithMany(p => p.EmpleadosCategoriasAprobadores)
                    .HasForeignKey(d => d.CategoriaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EmpleadosCategoriasAprobadores_Categorias");

                entity.HasOne(d => d.Empleado)
                    .WithMany(p => p.EmpleadosCategoriasAprobadores)
                    .HasForeignKey(d => d.EmpleadoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EmpleadosCategoriasAprobadores_Empleados");
            });

            modelBuilder.Entity<EmpleadosRoles>(entity =>
            {
                entity.HasOne(d => d.Empleado)
                    .WithMany(p => p.EmpleadosRoles)
                    .HasForeignKey(d => d.EmpleadoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EmpleadosRoles_Empleados");

                entity.HasOne(d => d.Rol)
                    .WithMany(p => p.EmpleadosRoles)
                    .HasForeignKey(d => d.RolId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EmpleadosRoles_Roles");
            });

            modelBuilder.Entity<Estados>(entity =>
            {
                entity.Property(e => e.Descripcion).HasMaxLength(100);

                entity.Property(e => e.Nombre).HasMaxLength(10);
            });

            modelBuilder.Entity<Parametros>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Descripcion).HasMaxLength(200);

                entity.Property(e => e.Token)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Valor)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.TipoDato)
                    .WithMany(p => p.Parametros)
                    .HasForeignKey(d => d.TipoDatoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Parametros_TipoDato");
            });

            modelBuilder.Entity<Permisos>(entity =>
            {
                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<RolesPermisos>(entity =>
            {
                entity.HasOne(d => d.Permiso)
                    .WithMany(p => p.RolesPermisos)
                    .HasForeignKey(d => d.PermisoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RolesPermisos_Permisos");

                entity.HasOne(d => d.Rol)
                    .WithMany(p => p.RolesPermisos)
                    .HasForeignKey(d => d.RolId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RolesPermisos_Roles");
            });

            modelBuilder.Entity<TipoDato>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Descripcion).HasMaxLength(50);
            });

            modelBuilder.Entity<Votos>(entity =>
            {
                entity.Property(e => e.FechaAprobado).HasColumnType("datetime");

                entity.Property(e => e.FechaVoto).HasColumnType("datetime");

                entity.HasOne(d => d.AprobadorEmpleado)
                    .WithMany(p => p.VotosAprobadorEmpleado)
                    .HasForeignKey(d => d.AprobadorEmpleadoId)
                    .HasConstraintName("FK_Votos_Empleados");

                entity.HasOne(d => d.Categoria)
                    .WithMany(p => p.Votos)
                    .HasForeignKey(d => d.CategoriaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Votos_Categorias");

                entity.HasOne(d => d.VotadoEmpleado)
                    .WithMany(p => p.VotosVotadoEmpleado)
                    .HasForeignKey(d => d.VotadoEmpleadoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Votos_Empleados1");

                entity.HasOne(d => d.VotanteEmpleado)
                    .WithMany(p => p.VotosVotanteEmpleado)
                    .HasForeignKey(d => d.VotanteEmpleadoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Votos_Empleados2");
            });
        }

    }



}


