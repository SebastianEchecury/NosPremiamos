CREATE PROCEDURE dbo.Votos_Ranking 

	@categoriaID AS int,
	@fechaVoto AS datetime

AS

	SELECT TOP 3
		COUNT(*), V.VotadoEmpleadoId, Votado.Nombre, Votado.Apellido, Votado.Usuario

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
		C.*,
		Ganador.*
	FROM 
		Categorias C
		OUTER APPLY (
			SELECT TOP 1
				COUNT(*) as Votos, V.VotadoEmpleadoId, Votado.Nombre, Votado.Apellido, Votado.Usuario
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

GO 

CREATE PROCEDURE dbo.Votos_VotosEmitidosEmpleado

	@empleadoVotanteId AS int,
	@fechaVoto AS datetime

AS

	SELECT 
		V.*,
		Votante.*,
		Aprobador.*,
		C.*
	FROM Votos V
		INNER JOIN Categorias C ON V.CategoriaId = C.Id
		INNER JOIN Empleados Votante ON V.VotanteEmpleadoId = Votante.Id
		LEFT JOIN Empleados Aprobador ON V.AprobadorEmpleadoId = Aprobador.Id
	WHERE 
		C.EstadoId = 1
		AND V.VotanteEmpleadoId = @empleadoVotanteId
		AND V.Aprobado = 1
		AND V.FechaVoto >= @fechaVoto

GO 


CREATE PROCEDURE dbo.Votos_VotosRecibidosEmpleado

	@empleadoVotadoId AS int,
	@fechaVoto AS datetime

AS

	SELECT 
		V.*,
		Votado.*,
		Aprobador.*,
		C.*
	FROM Votos V
		INNER JOIN Categorias C ON V.CategoriaId = C.Id
		INNER JOIN Empleados Votado ON V.VotadoEmpleadoId = Votado.Id
		LEFT JOIN Empleados Aprobador ON V.AprobadorEmpleadoId = Aprobador.Id
	WHERE 
		C.EstadoId = 1
		AND V.VotadoEmpleadoId = @empleadoVotadoId
		AND V.Aprobado = 1
		AND V.FechaVoto >= @fechaVoto

GO 