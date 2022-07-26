using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TECSO.FWK.Domain_Std.Renaper
{
    public class ValidarPersonaDto
    {
        public ValidarPersonaDto()
        {
            this.PersonaRenaper = new PersonaDto();
            this.PersonaDocumento = new PersonaDocumentoDto();
            this.Errores = new List<ErrorValidacion>();
        }

        public PersonaDocumentoDto PersonaDocumento { get; set; }

        public PersonaDto PersonaRenaper { get; set; }

        public List<ErrorValidacion> Errores { get; set; }
    }

    public class PersonaDocumentoDto
    {
        public string Tramite { get; set; }
        public string Apellido { get; set; }
        public string Nombre { get; set; }
        public string Sexo { get; set; }
        public string NroDocumento { get; set; }
        public string Ejemplar { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public DateTime? FechaEmision { get; set; }
        public string Identificacion { get; set; }
    }

    public class PersonaDto
    {
        public string Codigo { get; set; }
        public string Mensaje { get; set; }
        public string Valido { get; set; }


        public string TipoDocumento { get; set; }
        public string NumeroDNI { get; set; }
        public string Genero { get; set; }
        public string Apellido { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Copia { get; set; }
        public DateTime FechaValidez { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string Cuil { get; set; }
        public string Direccion { get; set; }
        public string NumeroDireccion { get; set; }
        public string Piso { get; set; }
        public string Departamento { get; set; }
        public string CodigoPostal { get; set; }
        public string Ciudad { get; set; }
        public string Municipio { get; set; }
        public string Provincia { get; set; }
        public string Pais { get; set; }
        public string MensajeFallecimiento { get; set; }
        public string Nacionalidad { get; set; }
        public string PaisNacimiento { get; set; }
    }

    public class ErrorValidacion
    {
        public int CodigoError { get; set; }

        public string Descripcion { get; set; }

        public enum Error
        {
            PDF417_SinImagen = 100,
            PDF417_ErrorDecode = 110,

            PDF417_ErrorTramite = 115,
            PDF417_ErrorApellido = 120,
            PDF417_ErrorNombre = 125,
            PDF417_ErrorSexo = 130,
            PDF417_ErrorNroDocumento = 135,
            PDF417_ErrorEjemplar = 140,
            PDF417_ErrorFechaNacimiento = 145,
            PDF417_ErrorFechaEmision = 150,
            PDF417_ErrorIdentificacion = 155,


            Renaper_ErrorRespuesta = 500,
            Renaper_NoVigente = 510,
            Renaper_PersonaFallecida = 520,
            Renaper_ErrorNroDocumento = 550,
            Renaper_ErrorSexo = 555,
            Renaper_ErrorNombre = 560,
            Renaper_ErrorApellido = 565,
            Renaper_ErrorFechaNacimiento = 570,
            Renaper_ErrorEjemplar = 575,
            Renaper_ErrorFechaValidez = 580,
            Renaper_ErrorFechaCreacion = 585,
            Renaper_ErrorCuil = 590,
            Renaper_ErrorDireccion = 595,
            Renaper_ErrorAltura = 600,
            Renaper_ErrorPiso = 605,
            Renaper_ErrorDepartamento = 610,
            Renaper_ErrorCodigoPostal = 615,
            Renaper_ErrorCiudad = 620,
            Renaper_ErrorMunicipio = 625,
            Renaper_ErrorProvincia = 630,
            Renaper_ErrorPais = 635,
            Renaper_ErrorNacionalidad = 640,
            Renaper_ErrorPaisNacimiento = 645
        }
    }
}