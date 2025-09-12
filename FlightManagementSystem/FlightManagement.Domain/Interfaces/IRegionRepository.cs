using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain.Interfaces
{
    public interface IRegionRepository
    {
        Task<(Region, bool)> Add(Region region);
        Region? GetRegionByName(string regionName);
        IEnumerable<Region> GetAllRegions();
    }
}
