using FlightManagementSystem.Service.DTOs;
using FlightManagementSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace FlightManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
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
        /// <param name="flightRouteDTO">FlightRouteDTO Object</param>
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

        /// <summary>
        /// Use this function to get Available Flight Route
        /// </summary>
        /// <param name="flightSearchFilterDTO">FlightSearchFilterDTO Object</param>
        /// <returns>>Task ActionResult of filtered FlightRouteDTO</returns>
        [HttpPost(Name = "GetAvailableFlightRouteByFilter")]
        public ActionResult<List<FlightRouteDTO>> GetAvailableFlightRouteByFilter(FlightSearchFilterDTO flightSearchFilterDTO)
        {
            if (flightSearchFilterDTO.DepartRegion.IsNullOrEmpty() || flightSearchFilterDTO.DestRegion.IsNullOrEmpty())
            {
                return BadRequest("Flight Search Filter Has To Be Setted");
            }
            var availableFlightRouteByFilter = _flightRouteService.GetAvailableFlightRouteByFilter(flightSearchFilterDTO);
            return Ok(availableFlightRouteByFilter);
        }
    }
}
