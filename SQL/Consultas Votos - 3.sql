ALTER PROCEDURE [dbo].[Votos_VotosEmitidosEmpleado]

	@empleadoVotanteId AS int,
	@fechaVoto AS datetime

AS

	SELECT 
		CONVERT (nvarchar, V.FechaVoto, 3) as FechaVoto, V.Motivo,
		Votado.Apellido +', '+ Votado.Nombre as Votante,
		Aprobador.Apellido +', '+ Aprobador.Nombre as Aprobador, C.Nombre as NombreCategoria
	FROM Votos V
		INNER JOIN Categorias C ON V.CategoriaId = C.Id
		INNER JOIN Empleados Votado ON V.VotadoEmpleadoId = Votado.Id
		LEFT JOIN Empleados Aprobador ON V.AprobadorEmpleadoId = Aprobador.Id
	WHERE 
		C.EstadoId = 1
		AND V.VotanteEmpleadoId = @empleadoVotanteId
		AND V.FechaVoto >= @fechaVoto
GO
		


ALTER PROCEDURE [dbo].[Votos_VotosRecibidosEmpleado]

	@empleadoVotadoId AS int,
	@fechaVoto AS datetime

AS

	SELECT  CONVERT (nvarchar, V.FechaVoto, 3) as FechaVoto, V.Motivo,Votante.Apellido+ ', '+ Votante.Nombre AS Votante, 
	    Aprobador.Nombre + ' ' + Aprobador.Apellido as Aprobador,
		C.Nombre as NombreCategoria
	FROM Votos V
		INNER JOIN Categorias C ON V.CategoriaId = C.Id
		INNER JOIN Empleados Votante ON V.VotanteEmpleadoId = Votante.Id
		LEFT JOIN Empleados Aprobador ON V.AprobadorEmpleadoId = Aprobador.Id
	WHERE 
		C.EstadoId = 1
		AND V.VotadoEmpleadoId = @empleadoVotadoId
		AND V.Aprobado = 1 OR (V.Aprobado is NULL and C.RequiereAprobacion = 0)
		AND V.FechaVoto >= @fechaVoto
GO
