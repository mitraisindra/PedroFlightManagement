using FlightManagementSystem.Domain;
using FlightManagementSystem.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Service.Interfaces
{
    public interface IFlightProcessingService
    {
        Task<(ReservationFlightDTO?, bool)> AddFlightProcessing(ReservationFlightDTO flightProcessingDTO);
        Task<(ReservationFlightDTO?, bool)> UpdateReservationFlight(ReservationFlightDTO reservationFlightDto);
        Task<ReservationFlightDTO?> GetFlightProcessingById(int id);
    }
}
