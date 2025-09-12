using FlightManagementSystem.Domain.Interfaces;
using FlightManagementSystem.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Infrastructure.Repositories
{
    public class RegionRepository : IRegionRepository
    {
        private readonly FlightManagementSystemDbContext _context;

        public RegionRepository(FlightManagementSystemDbContext context)
        {
            _context = context;
        }

        public async Task<(Region, bool)> Add(Region region)
        {
            var isRegionExist = false;
            var checkRegion = GetRegionByName(region.RegionName);
            if (checkRegion != null)
            {
                isRegionExist = true;
                return (checkRegion, isRegionExist);
            }
            await _context.Region.AddAsync(region);
            await _context.SaveChangesAsync();

            return (region, isRegionExist);
        }

        public IEnumerable<Region> GetAllRegions()
        {
            var regionList = _context.Region.Select(x => x);
            return regionList;
        }

        public Region? GetRegionById(int id)
        {
            var region = _context.Region.Where(x => x.Id.Equals(id)).FirstOrDefault();
            return region;
        }

        public Region? GetRegionByName(string regionName)
        {
            var region = _context.Region.Where(x => x.RegionName.ToLower().Equals(regionName.ToLower())).FirstOrDefault();
            return region;

        }
    }
}
