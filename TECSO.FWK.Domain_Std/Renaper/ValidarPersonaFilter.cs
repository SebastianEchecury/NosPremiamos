using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TECSO.FWK.Domain_Std.Renaper
{
    public class ValidarPersonaFilter
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
        public DateTime? FechaValidez { get; set; }
        public DateTime? FechaCreacion { get; set; }
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

        public string ImagenDocumento { get; set; }

    }
}