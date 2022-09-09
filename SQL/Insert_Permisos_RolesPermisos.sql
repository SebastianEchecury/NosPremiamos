INSERT INTO [dbo].[Permisos]
           ([Nombre]
           ,[Descripcion]
           ,[Activo])
     VALUES
           ('ver.voto.emitidos'
           ,'Permite ver los votos que emitio el usuario'
           ,1)
GO

INSERT INTO [dbo].[Permisos]
           ([Nombre]
           ,[Descripcion]
           ,[Activo])
     VALUES
           ('ver.voto'
           ,'Permite ver los votos que a recibido el usuario '
           ,1)
GO

INSERT INTO [dbo].[Permisos]
           ([Nombre]
           ,[Descripcion]
           ,[Activo])
     VALUES
           ('ver.voto.ranking'
           ,'Permite ver las categorias con sus respectivos ganadares'
           ,1)
GO

INSERT INTO [dbo].[RolesPermisos]
           ([RolId]
           ,[PermisoId])
     VALUES
           (2
           ,13)
GO

INSERT INTO [dbo].[RolesPermisos]
           ([RolId]
           ,[PermisoId])
     VALUES
           (2
           ,14)
GO

INSERT INTO [dbo].[RolesPermisos]
           ([RolId]
           ,[PermisoId])
     VALUES
           (2
           ,15)
GO