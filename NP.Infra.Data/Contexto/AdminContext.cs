using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TECSO.FWK.Domain;
using TECSO.FWK.Domain.Auditing;
using TECSO.FWK.Domain.bus;
using TECSO.FWK.Domain.Entities;
using TECSO.FWK.Domain.Event;
using TECSO.FWK.Domain.Interfaces.Entities;
using TECSO.FWK.Domain.Interfaces.Services;
using TECSO.FWK.Domain.UOW;
using Microsoft.Extensions.DependencyInjection;
using TECSO.FWK.Infra.Data.Transaction;
using NP.Admin.Domain.Interfaces.Repositories;
using NP.Domain.Entities;
using NP.Admin.Domain.Entities;
using NP.infra.Data.EntityConfig;

namespace NP.infra.Data.Contexto
{
    public class AdminContext : BaseContext, IAdminDbContext
    { 
        public AdminContext(DbContextOptions<AdminContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Para regenerar todo el modelo nuevamente correr
            //En package Manager Console lo siguiente
            //scaffold-dbcontext 'Server=172.16.17.59;Database=SW;User Id=sa; Password=Pa$$w0rd'  Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force 
            //En la carpeta Modelss se van a generar todas las clases.

            modelBuilder.ApplyConfigurations();
            

        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            //if (ResilientTransaction.IsResilientTransaction())
            //{
            //    return Task.FromResult(0);
            //}
            return base.SaveChangesAsync(cancellationToken);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            //if (ResilientTransaction.IsResilientTransaction())
            //{
            //    return Task.FromResult(0);
            //} 
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }


        public virtual DbSet<Categorias> Categorias { get; set; }
        public virtual DbSet<Empleados> Empleados { get; set; }
        public virtual DbSet<EmpleadosCategoriasAprobadores> EmpleadosCategoriasAprobadores { get; set; }
        public virtual DbSet<EmpleadosRoles> EmpleadosRoles { get; set; }
        public virtual DbSet<Estados> Estados { get; set; }
        public virtual DbSet<Parametros> Parametros { get; set; }
        public virtual DbSet<Permisos> Permisos { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<RolesPermisos> RolesPermisos { get; set; }
        public virtual DbSet<TipoDato> TipoDato { get; set; }
        public virtual DbSet<Votos> Votos { get; set; }

       
    }


    public class AdminDBResilientTransaction : IAdminDBResilientTransaction
    {
        private readonly ResilientTransaction<AdminContext> resilientTransaction;

        public AdminDBResilientTransaction(AdminContext context)
        {
            this.resilientTransaction = ResilientTransaction<AdminContext>.New(context);
        }

        public Task ExecuteAsync(Func<Task> action)
        {
            return this.resilientTransaction.ExecuteAsync(action);
        }

        public bool IsResilientTransaction()
        {
            return this.resilientTransaction.IsResilientTransaction();
        }
    }


    public class BaseContext : DbContext, ITransientDependency
    {

        public BaseContext(DbContextOptions options)
            : base(options)
        {
            this.InitializeDbContext();
            authService = ServiceProviderResolver.ServiceProvider.GetService<IAuthService>();

        }


        public override void Dispose()
        {
            base.Dispose();
        }

        private void InitializeDbContext()
        {
            this.SetNullsForInjectedProperties();
        }

        private void SetNullsForInjectedProperties()
        {
            //this.EntityChangeEventHelper = (IEntityChangeEventHelper)NullEntityChangeEventHelper.Instance;
            //this.EventBus = (IEventBus)NullEventBus.Instance;
        }
        //public IEventBus EventBus { get; set; }

        //public IEntityChangeEventHelper EntityChangeEventHelper { get; set; }

        protected IAuthService authService { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(ConfigurationManager.ConnectionStrings["BloggingDatabase"].ConnectionString);
            base.OnConfiguring(optionsBuilder);
        }


        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            EntityChangeReport entityChangeReport = this.ApplyAbpConcepts();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override int SaveChanges()
        {

            try
            {
                EntityChangeReport entityChangeReport = this.ApplyAbpConcepts();
                int num = base.SaveChanges();
                //todo falta ver los eventos
                //this.EntityChangeEventHelper.TriggerEvents(entityChangeReport);
                return num;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new TecsoConcurrencyException(ex.Message, (Exception)ex);
            }
        }

        protected virtual EntityChangeReport ApplyAbpConcepts()
        {
            EntityChangeReport changeReport = new EntityChangeReport();
            int? auditUserId = this.GetAuditUserId();
            foreach (EntityEntry entry in this.ChangeTracker.Entries().ToList<EntityEntry>())
            {
                this.ApplyAbpConcepts(entry, auditUserId, changeReport);
            }
                
            return changeReport;
        }


        protected virtual void ApplyAbpConcepts(EntityEntry entry, int? userId, EntityChangeReport changeReport)
        {
            switch (entry.State)
            {
                case EntityState.Deleted:
                    this.ApplyAbpConceptsForDeletedEntity(entry, userId, changeReport);
                    break;
                case EntityState.Modified:
                    this.ApplyCountryId(entry);
                    this.ApplyAbpConceptsForModifiedEntity(entry, userId, changeReport);
                    break;
                case EntityState.Added:
                    this.ApplyCountryId(entry);
                    this.ApplyAbpConceptsForAddedEntity(entry, userId, changeReport);
                    break;
            }
            
            this.AddDomainEvents(changeReport.DomainEvents, entry.Entity);
        }

        private void ApplyCountryId(EntityEntry entry)
        {
            ICountryId entity = entry.Entity as ICountryId;
            if (entity != null && entity.CountryId <= 0)
            {
                entity.CountryId = this.GetCurretCountryId();
            }
        }

        protected virtual void AddDomainEvents(List<DomainEventEntry> domainEvents, object entityAsObj)
        {
            IGeneratesDomainEvents igeneratesDomainEvents = entityAsObj as IGeneratesDomainEvents;
            if (igeneratesDomainEvents == null || TECSO.FWK.Extensions.CollectionExtensions.IsNullOrEmpty<IEventData>((ICollection<IEventData>)igeneratesDomainEvents.DomainEvents))
                return;
            domainEvents.AddRange(((IEnumerable<IEventData>)igeneratesDomainEvents.DomainEvents).Select<IEventData, DomainEventEntry>((Func<IEventData, DomainEventEntry>)(eventData => new DomainEventEntry(entityAsObj, eventData))));
            igeneratesDomainEvents.DomainEvents.Clear();
        }



        protected virtual void SetCreationAuditProperties(object entityAsObj, int? userId)
        {
            EntityAuditingHelper.SetCreationAuditProperties(entityAsObj, userId);
        }

        protected virtual void SetModificationAuditProperties(object entityAsObj, int? userId)
        {
            EntityAuditingHelper.SetModificationAuditProperties(entityAsObj, userId);
        }

        protected virtual void SetDeletionAuditProperties(object entityAsObj, int? userId)
        {
            EntityAuditingHelper.SetDeletionAuditProperties(entityAsObj, userId);
        }


        protected virtual void ApplyAbpConceptsForAddedEntity(EntityEntry entry, int? userId, EntityChangeReport changeReport)
        {
            this.CheckAndSetId(entry);

            this.SetCreationAuditProperties(entry.Entity, userId);
            changeReport.ChangedEntities.Add(new EntityChangeEntry(entry.Entity, (EntityChangeType)0));
        }

        protected virtual void ApplyAbpConceptsForModifiedEntity(EntityEntry entry, int? userId, EntityChangeReport changeReport)
        {
            this.SetModificationAuditProperties(entry.Entity, userId);
            if (entry.Entity is ISoftDelete && ((ISoftDelete)ObjectExtensions.As<ISoftDelete>(entry.Entity)).IsDeleted)
            {
                this.SetDeletionAuditProperties(entry.Entity, userId);
                changeReport.ChangedEntities.Add(new EntityChangeEntry(entry.Entity, (EntityChangeType)2));
            }
            else
                changeReport.ChangedEntities.Add(new EntityChangeEntry(entry.Entity, (EntityChangeType)1));
        }

        protected virtual void ApplyAbpConceptsForDeletedEntity(EntityEntry entry, int? userId, EntityChangeReport changeReport)
        {
            this.CancelDeletionForSoftDelete(entry);
            this.SetDeletionAuditProperties(entry.Entity, userId);
            changeReport.ChangedEntities.Add(new EntityChangeEntry(entry.Entity, (EntityChangeType)2));
        }


        protected virtual void CancelDeletionForSoftDelete(EntityEntry entry)
        {
            if (!(entry.Entity is ISoftDelete))
                return;
            entry.Reload();
            entry.State = EntityState.Modified;
            ((ISoftDelete)ObjectExtensions.As<ISoftDelete>(entry.Entity)).IsDeleted = true;
        }


        protected virtual void CheckAndSetId(EntityEntry entry)
        {
            //IEntity<Guid> entity = entry.Entity as IEntity<Guid>;
            //if (entity == null || !(entity.Id == Guid.Empty))
            //    return;
            //DatabaseGeneratedAttribute attributeOrDefault = (DatabaseGeneratedAttribute)ReflectionHelper.GetSingleAttributeOrDefault<DatabaseGeneratedAttribute>((MemberInfo)entry.Property("Id").Metadata.PropertyInfo, (M0)null, true);
            //if (attributeOrDefault != null && attributeOrDefault.DatabaseGeneratedOption != DatabaseGeneratedOption.None)
            //    return;
            //entity.set_Id(this.GuidGenerator.Create());
        }

        protected int? AuditUserId { get; set; }
        protected int CountryId { get; set; }

        public virtual int? GetAuditUserId()
        {
            //sacar id de la sesscion?
            return AuditUserId ?? (AuditUserId = authService.GetCurretUserId());
        }

        public virtual int GetCurretCountryId()
        {
            return CountryId == 0 ? (CountryId = authService.GetCurretCountryId()): CountryId;
        }

    }
}
