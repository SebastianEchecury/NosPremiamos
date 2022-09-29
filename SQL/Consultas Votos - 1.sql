CREATE PROCEDURE dbo.Votos_Ranking 

	@categoriaID AS int,
	@fechaVoto AS datetime

AS

	SELECT TOP 3
		COUNT(*) as CantVotos, V.VotadoEmpleadoId, Votado.Nombre, Votado.Apellido, Votado.Usuario

	FROM Votos V
		INNER JOIN Categorias C ON V.CategoriaId = C.Id
		INNER JOIN Empleados Votado ON V.VotadoEmpleadoId = Votado.Id

	WHERE 
		C.EstadoId = 1
		AND V.Aprobado = 1
		AND (@categoriaID IS NULL OR V.CategoriaId = @categoriaID)
		AND V.FechaVoto >= @fechaVoto

	GROUP BY V.VotadoEmpleadoId, Votado.Nombre, Votado.Apellido, Votado.Usuario
	ORDER BY COUNT(*) DESC

GO 

CREATE PROCEDURE dbo.Categorias_Ganadores

	@fechaVoto AS datetime

AS

	SELECT 
		C.Nombre as Categoria,
		ISNULL(Ganador.Nombre + ' ' + Apellido, 'Sin ganador') as Ganador,
		Ganador.CantVotos
	FROM 
		Categorias C
		OUTER APPLY (
			SELECT TOP 1
				COUNT(*) as CantVotos, V.VotadoEmpleadoId, Votado.Nombre, Votado.Apellido, Votado.Usuario
			FROM Votos V
				INNER JOIN Empleados Votado ON V.VotadoEmpleadoId = Votado.Id
			WHERE 
				V.Aprobado = 1
				AND V.CategoriaId = C.Id
				AND V.FechaVoto >= @fechaVoto
			GROUP BY V.VotadoEmpleadoId, Votado.Nombre, Votado.Apellido, Votado.Usuario
			ORDER BY COUNT(*) DESC
		) AS Ganador
	WHERE 
		C.EstadoId = 1
	ORDER BY Ganador.CantVotos DESC
GO 

CREATE PROCEDURE dbo.Votos_VotosEmitidosEmpleado

	@empleadoVotanteId AS int,
	@fechaVoto AS datetime

AS

	SELECT 
		V.Id as VotoId, V.FechaVoto, V.Aprobado, V.FechaAprobado, V.Motivo,
		V.VotadoEmpleadoId, V.VotanteEmpleadoId,
		Votado.Nombre, Votado.Apellido, Votado.Usuario, 
		Aprobador.Nombre + ' ' + Aprobador.Apellido as Aprobador,
		C.Id as CategoriaId, C.Nombre as NombreCategoria
	FROM Votos V
		INNER JOIN Categorias C ON V.CategoriaId = C.Id
		INNER JOIN Empleados Votado ON V.VotadoEmpleadoId = Votado.Id
		LEFT JOIN Empleados Aprobador ON V.AprobadorEmpleadoId = Aprobador.Id
	WHERE 
		C.EstadoId = 1
		AND V.VotanteEmpleadoId = @empleadoVotanteId
		AND V.FechaVoto >= @fechaVoto

GO 


CREATE PROCEDURE dbo.Votos_VotosRecibidosEmpleado

	@empleadoVotadoId AS int,
	@fechaVoto AS datetime

AS

	SELECT 
		V.Id as VotoId, V.FechaVoto, V.Aprobado, V.FechaAprobado, V.Motivo,
		V.VotadoEmpleadoId, V.VotanteEmpleadoId,
		Votante.Nombre, Votante.Apellido, Votante.Usuario,
		Aprobador.Nombre + ' ' + Aprobador.Apellido as Aprobador,
		C.Id as CategoriaId, C.Nombre as NombreCategoria
	FROM Votos V
		INNER JOIN Categorias C ON V.CategoriaId = C.Id
		INNER JOIN Empleados Votante ON V.VotanteEmpleadoId = Votante.Id
		LEFT JOIN Empleados Aprobador ON V.AprobadorEmpleadoId = Aprobador.Id
	WHERE 
		C.EstadoId = 1
		AND V.VotadoEmpleadoId = @empleadoVotadoId
		AND V.Aprobado = 1
		AND V.FechaVoto >= @fechaVoto

GO 