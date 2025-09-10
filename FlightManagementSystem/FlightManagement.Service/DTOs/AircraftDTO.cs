using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Service.DTOs
{
    public class AircraftDTO
    {
        public int Id { get; set; }
        public string AircraftCode { get; set; }
        public string AircraftName { get; set; }
        public int Capacity { get; set; }
    }
}
