using FlightManagementSystem.Service.DTOs;
using FlightManagementSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FlightManagementSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AirportController : ControllerBase
    {
        private readonly IAirportService _airportService;
        private readonly ILogger<AirportController> _logger;

        public AirportController(IAirportService airportService, ILogger<AirportController> logger)
        {
            _airportService = airportService;
            _logger = logger;
        }
        /// <summary>
        /// Use this function to add a Airport and their Region
        /// </summary>
        /// <param name="airportDTO">>AirportDTO Object</param>
        /// <returns>>Task ActionResult of added AirportDTO</returns>
        [HttpPost(Name = "AddAirport")]
        public async Task<ActionResult<AirportDTO>> AddAirport(AirportDTO airportDTO)
        {
            (AirportDTO? addedAirport, bool IsExist) = await _airportService.AddAirport(airportDTO);
            if (addedAirport == null)
            {
                return BadRequest("AddedAirport Can Not Added");
            }
            else if (IsExist)
            {
                return BadRequest("AddedAirport Is Exist");
            }

            return Ok(addedAirport);
        }

        /// <summary>
        /// Use this function to get all Airport and their Region
        /// </summary>
        /// <returns>>Task ActionResult of added AirportDTO</returns>
        [HttpGet(Name = "GetAllAirport")]
        public async Task<ActionResult<List<AirportDTO>>> GetAllAirport()
        {
            var allAirports = await _airportService.GetAllAirport();

            return Ok(allAirports);
        }
    }
}
