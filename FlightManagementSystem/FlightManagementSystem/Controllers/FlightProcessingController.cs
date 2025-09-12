using FlightManagementSystem.Service.DTOs;
using FlightManagementSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FlightManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlightProcessingController : ControllerBase
    {
        private readonly IFlightProcessingService _flightRouteService;
        private readonly ILogger<FlightProcessingController> _logger;

        public FlightProcessingController(IFlightProcessingService flightRouteService, ILogger<FlightProcessingController> logger)
        {
            _flightRouteService = flightRouteService;
            _logger = logger;
        }
        /// <summary>
        /// Use this function to add a FlightProcessing
        /// </summary>
        /// <param name="flightRouteDTO">>FlightProcessingDTO Object</param>
        /// <returns>>Task ActionResult of added FlightProcessingDTO</returns>
        [HttpPost(Name = "AddFlightProcessing")]
        public async Task<ActionResult<ReservationFlightDTO>> AddFlightProcessing(ReservationFlightDTO flightRouteDTO)
        {
            (ReservationFlightDTO? addedFlightProcessing, bool IsExist) = await _flightRouteService.AddFlightProcessing(flightRouteDTO);
            if (addedFlightProcessing == null)
            {
                return BadRequest("FlightProcessing Can Not Added");
            }
            else if (IsExist)
            {
                return BadRequest("FlightProcessing Is Exist");
            }

            return Ok(addedFlightProcessing);
        }
    }
}
