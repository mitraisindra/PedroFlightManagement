using FlightManagementSystem.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Service.Interfaces
{
    public interface IAirportService
    {
        Task<(AirportDTO?, bool)> AddAirport(AirportDTO airportDTO);
        Task<List<AirportDTO>> GetAllAirport();
    }
}
