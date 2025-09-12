using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Service.DTOs
{
    public class FlightSearchFilterDTO
    {
        public DateTime DepartTime { get; set; }
        public string DepartRegion { get; set; }
        public string DestRegion { get; set; }
        public int TotalSeatsNeeded { get; set; }
    }
}
