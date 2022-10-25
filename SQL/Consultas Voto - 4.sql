ALTER PROCEDURE [dbo].[Votos_VotosRecibidosEmpleado]

	@empleadoVotadoId AS int,
	@fechaVoto AS datetime,
	@categoria AS nvarchar(max),
	@aprobador AS nvarchar(max),
	@votante AS nvarchar(max),
	@motivo AS nvarchar(max)

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
		AND (@categoria IS NULL OR C.Nombre LIKE '%' + @categoria + '%')
		AND (@aprobador IS NULL OR Aprobador.Apellido LIKE '%' + @aprobador + '%' OR Aprobador.Nombre LIKE '%' + @aprobador + '%')
		AND (@votante IS NULL OR Votante.Apellido LIKE '%' + @votante + '%' OR Votante.Nombre LIKE '%' + @votante + '%')
		AND (@motivo IS NULL OR V.Motivo LIKE '%' + @motivo + '%')
		AND V.VotadoEmpleadoId = @empleadoVotadoId
		AND (V.Aprobado = 1 OR (V.Aprobado is NULL and C.RequiereAprobacion = 0))
		AND V.FechaVoto >= @fechaVoto