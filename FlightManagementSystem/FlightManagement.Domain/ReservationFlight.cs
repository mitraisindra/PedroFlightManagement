using FlightManagementSystem.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain
{
    public class ReservationFlight
    {
        public int Id { get; set; }
        public string BookingId { get; set; }
        public int UserId { get; set; }
        public string FlightRouteIds { get; set; }
        public int FlightStatus { get; set; } = (int)FlightStatusEnum.Booked;
        public int NumberSeat { get; set; }
        public string PassengerSeats { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; } = DateTime.Now;

        public virtual User User { get; set; }
    }
}
