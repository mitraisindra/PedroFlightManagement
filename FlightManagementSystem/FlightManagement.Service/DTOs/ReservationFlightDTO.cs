using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Service.DTOs
{
    public class ReservationFlightDTO
    {
        public int Id { get; set; }
        public string BookingId { get; set; }
        public int UserId { get; set; }
        public string FlightRouteIds { get; set; }
        public int FlightStatus { get; set; }
        public int NumberSeat { get; set; }
        public string PassengerSeats { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }

        public List<FlightRouteDTO> FlightRoutesList { get; set; }
        public List<UserDTO> PassengerSeatsList { get; set; }
        public UserDTO PassengerInCharge { get; set; }
    }
}
