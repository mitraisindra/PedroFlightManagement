using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain.Interfaces
{
    public interface IRegionRepository
    {
        public Task<(Region, bool)> Add(Region region);
        public Region? GetRegionByName(string regionName);
        public IEnumerable<Region> GetAllRegions();
    }
}
