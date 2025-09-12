using AutoMapper;
using FlightManagementSystem.Domain.Interfaces;
using FlightManagementSystem.Domain;
using FlightManagementSystem.Service.DTOs;
using FlightManagementSystem.Service.Interfaces;
using FlightManagementSystem.Service.Logger.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Service
{
    public partial class AirportService : ServiceBase, IAirportService
    {
        private readonly IAirportRepository _airportRepository;
        private readonly IRegionRepository _regionRepository;
        private readonly IMapper _mapper;
        private readonly ILoggerService _logger;

        public AirportService(
            IAirportRepository airportRepository,
            IRegionRepository regionRepository,
            IMapper mapper, ILoggerService logger
            ) : base(mapper, logger)
        {
            _airportRepository = airportRepository;
            _regionRepository = regionRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<(AirportDTO?, bool)> AddAirport(AirportDTO airportDTO)
        {
            string methodName = "AirportService.AddAirport";
            try
            {
                if (airportDTO.IATA.Length < 2)
                {
                    _logger.LogWarn("Airport IATA need to more than one character", methodName);
                    return (null, false);
                }

                var airport = _mapper.Map<AirportDTO, Airport>(airportDTO);
                var region = _mapper.Map<RegionDTO, Region>(airportDTO.RegionDTO);

                _logger.LogInfo("AddAirport Begin", methodName, airportDTO.IATA);

                Region? regionExisting = _regionRepository.GetRegionByName(airportDTO.RegionDTO.RegionName);
                if (regionExisting != null)
                {
                    airport.RegionId = regionExisting.Id;
                } else
                {
                    await _regionRepository.Add(region);
                }
                (Airport addedAirport, bool IsExist) = await _airportRepository.Add(airport);                
                _logger.LogInfo("AddAirport End", methodName, airportDTO.IATA);
                var addedAirportDTO = _mapper.Map<Airport, AirportDTO>(addedAirport);
                return (addedAirportDTO, IsExist);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return (null, false);
            }
        }

        public async Task<List<AirportDTO>> GetAllAirport()
        {
            string methodName = "AirportService.GetAllAirport";
            try
            {
                _logger.LogInfo("GetAllAirport Begin", methodName, "");
                var allAirports = await _airportRepository.GetAll();
                var allAirportsDTO = new List<AirportDTO>();
                allAirports.ForEach(x => {
                    var newObj = _mapper.Map<Airport, AirportDTO>(x);
                    newObj.RegionDTO = _mapper.Map<Region, RegionDTO>(x.Region);
                    allAirportsDTO.Add(newObj);
                });
                 
                _logger.LogInfo("GetAllAirport End", methodName, "");
                return allAirportsDTO;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return new List<AirportDTO>();
            }
        }
    }
}
