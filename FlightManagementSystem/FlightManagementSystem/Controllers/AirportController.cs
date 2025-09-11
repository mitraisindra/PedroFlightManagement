using FlightManagementSystem.Service.DTOs;
using FlightManagementSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FlightManagementSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
        /// <param name="regionDTO">>RegionDTO Object</param>
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
    }
}
