using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain
{
    public class Region
    {
        public int Id { get; set; }
        public string RegionName { get; set; }
        public string Province { get; set; }
        public string Country { get; set; }

        public virtual ICollection<Airport> Airports { get; set; }
    }
}
