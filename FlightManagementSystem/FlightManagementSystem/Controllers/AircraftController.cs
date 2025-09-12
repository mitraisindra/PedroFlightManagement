using FlightManagementSystem.Service.DTOs;
using FlightManagementSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FlightManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AircraftController : ControllerBase
    {
        private readonly IAircraftService _aircraftService;
        private readonly ILogger<AircraftController> _logger;

        public AircraftController(IAircraftService aircraftService, ILogger<AircraftController> logger)
        {
            _aircraftService = aircraftService;
            _logger = logger;
        }
        /// <summary>
        /// Use this function to add a Aircraft
        /// </summary>
        /// <param name="aircraftDTO">>AircraftDTO Object</param>
        /// <returns>>Task ActionResult of added AircraftDTO</returns>
        [HttpPost(Name = "AddAircraft")]
        public async Task<ActionResult<AircraftDTO>> AddAircraft(AircraftDTO aircraftDTO)
        {
            (AircraftDTO? addedAircraft, bool IsExist) = await _aircraftService.AddAircraft(aircraftDTO);
            if (addedAircraft == null)
            {
                return BadRequest("AddedAircraft Can Not Added");
            }
            else if (IsExist)
            {
                return BadRequest("AddedAircraft Is Exist");
            }

            return Ok(addedAircraft);
        }
    }
}
