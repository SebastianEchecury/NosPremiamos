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


ALTER PROCEDURE [dbo].[Categorias_Ganadores]

	@fechaVoto AS datetime,
	@filtroNombre AS nvarchar(max),
	@filtroCategoria AS nvarchar(max)

AS

	SELECT 
		C.Nombre as Categoria,
		ISNULL(Apellido+ ', '+Ganador.Nombre, 'Sin ganador') as Ganador,
		Ganador.CantVotos,
		(SELECT COUNT(*) FROM Votos 
			WHERE Votos.Aprobado = 1
				AND Votos.CategoriaId = C.Id
				AND Votos.FechaVoto >= @fechaVoto) as VotosCategoria
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
		AND (@filtroNombre IS NULL OR 
			Ganador.Nombre LIKE '%' + @filtroNombre + '%' OR
			Ganador.Apellido LIKE '%' + @filtroNombre + '%' OR @filtroNombre = '')
		AND (@filtroCategoria IS NULL OR 
			 C.Nombre LIKE '%' + @filtroCategoria + '%' OR @filtroCategoria = '')
	ORDER BY Ganador.CantVotos DESC