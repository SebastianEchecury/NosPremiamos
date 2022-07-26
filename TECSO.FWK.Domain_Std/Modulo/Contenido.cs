using System;
using System.Collections.Generic;
using System.Text;
using TECSO.FWK.Domain;
using Microsoft.Extensions.DependencyInjection;

namespace TECSO.FWK.Domain_Std.Modulo
{
    public static class Contenido
    {
        public static Dictionary<string, Dictionary<string, string>> Mensajes = new Dictionary<string, Dictionary<string, string>>();
        
        public static string ObtenerMensaje(string modulo, string clave)
        {
            var mensaje = string.Empty;

            if(Mensajes.ContainsKey(modulo) && Mensajes[modulo].ContainsKey(clave))
            {
                return Mensajes[modulo][clave];
            }
            return mensaje;
        }
    }
}
