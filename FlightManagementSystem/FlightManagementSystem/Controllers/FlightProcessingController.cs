using FlightManagementSystem.Service.DTOs;
using FlightManagementSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FlightManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
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
        /// Use this function to add a ReservationFlight
        /// </summary>
        /// <param name="flightRouteDTO">>ReservationFlightDTO Object</param>
        /// <returns>>Task ActionResult of added ReservationFlightDTO</returns>
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

        /// <summary>
        /// Use this function to update a ReservationFlight
        /// </summary>
        /// <param name="flightRouteDTO">>ReservationFlightDTO Object</param>
        /// <returns>>Task ActionResult of updated ReservationFlightDTO</returns>
        [HttpPost(Name = "UpdateFlightProcessing")]
        public async Task<ActionResult<ReservationFlightDTO>> UpdateFlightProcessing(ReservationFlightDTO flightRouteDTO)
        {
            (ReservationFlightDTO? updatedFlightProcessing, bool IsExist) = await _flightRouteService.UpdateReservationFlight(flightRouteDTO);
            if (updatedFlightProcessing == null)
            {
                return BadRequest("FlightProcessing Can Not Updated");
            }
            else if (IsExist)
            {
                return BadRequest("FlightProcessing Is Exist");
            }

            return Ok(updatedFlightProcessing);
        }

        /// <summary>
        /// Use this function to get a ReservationFlight
        /// </summary>
        /// <param name="id">>ReservationFlight ID</param>
        /// <returns>>Task ActionResult of a specific ReservationFlightDTO</returns>
        [HttpPost(Name = "GetFlightProcessingById")]
        public async Task<ActionResult<ReservationFlightDTO>> GetFlightProcessingById(int id)
        {
            ReservationFlightDTO? updatedFlightProcessing = await _flightRouteService.GetFlightProcessingById(id);
            if (updatedFlightProcessing == null)
            {
                return BadRequest("FlightProcessing Can Not Be Found");
            }

            return Ok(updatedFlightProcessing);
        }
    }
}
