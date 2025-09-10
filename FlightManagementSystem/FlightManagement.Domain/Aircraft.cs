using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain
{
    public class Aircraft
    {
        public int Id { get; set; }
        public string AircraftCode { get; set; }
        public string AircraftName { get; set; }
        public int Capacity { get; set; }

        public virtual ICollection<FlightRoute>? FlightRoutes
        {
            get; set;
        }
    }
}
