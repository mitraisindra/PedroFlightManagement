using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain.Interfaces
{
    public interface IFlightProcessingRepository
    {
        Task<(ReservationFlight, bool)> Add(ReservationFlight flightProcessing);
        ReservationFlight? GetFlightProcessingByBookingId(string bookingId);
        IEnumerable<FlightAvailSeatsCount> GetFlightAvailSeatsCount(List<FlightRoute> flightSearchResults, int totalSeatsNeeded);
    }
}
