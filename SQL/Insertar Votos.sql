USE [NosPremiamos]
GO

-- Se necesita que existan los empleados de IDs 35 y 36
DECLARE @empleado1 as int
INSERT INTO [dbo].[Empleados]([Nombre],[Apellido],[Usuario],[Contraseña],[Eliminado],[PrimerIngreso])
VALUES('Nombre1','Apellido1','usuario1@yopmail.com','',0,0)
SET @empleado1 = (SELECT @@IDENTITY);

DECLARE @empleado2 as int
INSERT INTO [dbo].[Empleados]([Nombre],[Apellido],[Usuario],[Contraseña],[Eliminado],[PrimerIngreso])
VALUES('Nombre2','Apellido2','usuario2@yopmail.com','',0,0)
SET @empleado2 = (SELECT @@IDENTITY);

DECLARE @empleado3 as int
INSERT INTO [dbo].[Empleados]([Nombre],[Apellido],[Usuario],[Contraseña],[Eliminado],[PrimerIngreso])
VALUES('Nombre3','Apellido3','usuario1@yopmail.com','',0,0)
SET @empleado3 = (SELECT @@IDENTITY);

DECLARE @empleado4 as int

INSERT INTO [dbo].[Empleados]([Nombre],[Apellido],[Usuario],[Contraseña],[Eliminado],[PrimerIngreso])
VALUES('Nombre4','Apellido4','usuario4@yopmail.com','',0,0)
SET @empleado4 = (SELECT @@IDENTITY);

DECLARE @empleado5 as int
INSERT INTO [dbo].[Empleados]([Nombre],[Apellido],[Usuario],[Contraseña],[Eliminado],[PrimerIngreso])
VALUES('Nombre5','Apellido5','usuario5@yopmail.com','',0,0)
SET @empleado5 = (SELECT @@IDENTITY);

INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado1,'01-15-2022',1,'Motivo1',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado2,'01-15-2022',2,'Motivo2',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado3,'04-15-2022',3,'Motivo3',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado4,'01-15-2022',1,'Motivo4',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado5,'01-15-2022',2,'Motivo5',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado1,'02-15-2022',3,'Motivo6',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado2,'03-15-2022',1,'Motivo7',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado3,'02-15-2022',2,'Motivo8',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado4,'02-15-2022',3,'Motivo9',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado5,'03-15-2022',1,'Motivo10',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado1,'04-15-2022',2,'Motivo11',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado2,'06-15-2022',3,'Motivo12',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado3,'06-15-2022',1,'Motivo13',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado4,'06-15-2022',2,'Motivo14',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado5,'06-15-2022',3,'Motivo15',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado1,'06-15-2022',1,'Motivo16',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado2,'07-15-2022',2,'Motivo17',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado3,'07-15-2022',3,'Motivo18',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado4,'07-15-2022',1,'Motivo19',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado5,'07-15-2022',2,'Motivo20',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado1,'07-15-2022',3,'Motivo21',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado2,'07-15-2022',1,'Motivo22',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado3,'07-15-2022',2,'Motivo23',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado4,'07-15-2022',3,'Motivo24',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado5,'07-15-2022',1,'Motivo25',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado1,'07-15-2022',2,'Motivo26',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado2,'07-15-2022',3,'Motivo27',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado3,'08-15-2022',1,'Motivo28',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado4,'08-15-2022',2,'Motivo29',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado5,'08-15-2022',3,'Motivo30',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado1,'08-15-2022',1,'Motivo31',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado2,'08-15-2022',2,'Motivo32',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado3,'08-15-2022',3,'Motivo33',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado4,'08-15-2022',1,'Motivo34',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado5,'09-15-2022',2,'Motivo35',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado1,'09-15-2022',3,'Motivo36',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado2,'09-15-2022',1,'Motivo37',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado3,'09-15-2022',2,'Motivo38',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado4,'09-15-2022',3,'Motivo39',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado5,'09-15-2022',1,'Motivo40',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado1,'08-15-2022',2,'Motivo41',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado2,'07-15-2022',3,'Motivo42',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado3,'06-15-2022',1,'Motivo43',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado4,'01-15-2022',2,'Motivo44',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado5,'02-15-2022',3,'Motivo45',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado1,'03-15-2022',1,'Motivo46',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado2,'09-15-2022',2,'Motivo47',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado3,'08-15-2022',3,'Motivo48',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (35,@empleado4,'07-15-2022',1,'Motivo49',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado5,'06-15-2022',2,'Motivo50',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado1,'01-15-2022',3,'Motivo51',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado2,'02-15-2022',1,'Motivo52',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado3,'03-15-2022',2,'Motivo53',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado4,'09-15-2022',3,'Motivo54',0)
INSERT INTO [dbo].[Votos] ([VotadoEmpleadoId],[VotanteEmpleadoId],[FechaVoto],[CategoriaId],[Motivo],[Aprobado]) VALUES (36,@empleado5,'08-15-2022',1,'Motivo55',0)

