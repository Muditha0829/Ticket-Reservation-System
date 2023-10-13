/*
 * File: WebApiConfig.cs
 * Purpose: Registers Web API configuration and services.
 * Description: This file contains the configuration for the Web API, including CORS settings and route mapping.
 */

using System.Web.Http;
using System.Web.Http.Cors; // Add this line for CORS

namespace Web_Service
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Enable CORS
            var cors = new EnableCorsAttribute("http://localhost:3000", "*", "*");
            config.EnableCors(cors);

            // Web API configuration and services
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}