using FlightManagementSystem.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Service.Interfaces
{
    public interface IAircraftService
    {
        Task<(AircraftDTO?, bool)> AddAircraft(AircraftDTO aircraftDTO);
    }
}
