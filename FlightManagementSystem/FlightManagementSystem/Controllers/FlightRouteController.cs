using FlightManagementSystem.Service.DTOs;
using FlightManagementSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FlightManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlightRouteController : ControllerBase
    {
        private readonly IFlightRouteService _flightRouteService;
        private readonly ILogger<FlightRouteController> _logger;

        public FlightRouteController(IFlightRouteService flightRouteService, ILogger<FlightRouteController> logger)
        {
            _flightRouteService = flightRouteService;
            _logger = logger;
        }
        /// <summary>
        /// Use this function to add a FlightRoute
        /// </summary>
        /// <param name="flightRouteDTO">>FlightRouteDTO Object</param>
        /// <returns>>Task ActionResult of added FlightRouteDTO</returns>
        [HttpPost(Name = "AddFlightRoute")]
        public async Task<ActionResult<FlightRouteDTO>> AddFlightRoute(FlightRouteDTO flightRouteDTO)
        {
            (FlightRouteDTO? addedFlightRoute, bool IsExist) = await _flightRouteService.AddFlightRoute(flightRouteDTO);
            if (addedFlightRoute == null)
            {
                return BadRequest("FlightRoute Can Not Added");
            }
            else if (IsExist)
            {
                return BadRequest("FlightRoute Is Exist");
            }

            return Ok(addedFlightRoute);
        }
    }
}
