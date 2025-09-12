using AutoMapper;
using FlightManagementSystem.Domain;
using FlightManagementSystem.Domain.Interfaces;
using FlightManagementSystem.Service.DTOs;
using FlightManagementSystem.Service.Interfaces;
using FlightManagementSystem.Service.Logger.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Service
{
    public partial class FlightRouteService : ServiceBase, IFlightRouteService
    {
        private readonly IFlightRouteRepository _flightRouteRepository;
        private readonly IFlightProcessingRepository _flightProcessingRepository;
        private readonly IMapper _mapper;
        private readonly ILoggerService _logger;

        public FlightRouteService(
            IFlightRouteRepository flightRouteRepository,
            IFlightProcessingRepository flightProcessingRepository,
            IMapper mapper, ILoggerService logger
            ) : base(mapper, logger)
        {
            _flightRouteRepository = flightRouteRepository;
            _flightProcessingRepository = flightProcessingRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<(FlightRouteDTO?, bool)> AddFlightRoute(FlightRouteDTO flightRouteDTO)
        {
            string methodName = "FlightRouteService.AddFlightRoute";
            try
            {
                if (!(flightRouteDTO.AircraftId > 0 || flightRouteDTO.DestinationAirport > 0 || flightRouteDTO.DepartAirport > 0))
                {
                    _logger.LogWarn("AircraftId, DestinationAirport and DepartAirport has to be choosen", methodName);
                    return (null, false);
                }

                var flightRoute = _mapper.Map<FlightRouteDTO, FlightRoute>(flightRouteDTO);

                _logger.LogInfo("AddFlightRoute Begin", methodName, flightRouteDTO.AircraftId.ToString());
                (FlightRoute AddedFlightRoute, bool IsExist) = await _flightRouteRepository.Add(flightRoute);
                _logger.LogInfo("AddFlightRoute End", methodName, flightRouteDTO.AircraftId.ToString());
                var addedFlightRoute = _mapper.Map<FlightRoute, FlightRouteDTO>(AddedFlightRoute);
                return (addedFlightRoute, IsExist);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return (null, false);
            }
        }

        public List<FlightRouteDTO> GetAvailableFlightRouteByFilter(FlightSearchFilterDTO flightSearchFilterDTO)
        {
            string methodName = "FlightRouteService.GetAvailableFlightRouteByFilter";
            try
            {
                _logger.LogInfo("GetAvailableFlightRouteByFilter Begin", methodName, flightSearchFilterDTO.DepartTime.ToString());
                var flightSearchResults = _flightRouteRepository.GetAvailableFlightRouteByFilter(flightSearchFilterDTO.DepartTime, flightSearchFilterDTO.DepartRegion, 
                    flightSearchFilterDTO.DestRegion, flightSearchFilterDTO.TotalSeatsNeeded);

                var flightAvailSeatsCount = _flightProcessingRepository.GetFlightAvailSeatsCount(flightSearchResults, flightSearchFilterDTO.TotalSeatsNeeded).ToList();
                var flightSearchResultsDTO = new List<FlightRouteDTO>();

                flightSearchResults.ForEach(x =>
                    {
                        if (flightAvailSeatsCount.Any(s => x.Id == s.FlightRouteId)) {
                            var newObj = _mapper.Map<FlightRoute, FlightRouteDTO>(x);
                            newObj.AvailSeatsCount = flightAvailSeatsCount.FirstOrDefault(f => f.FlightRouteId == x.Id)?.AvailableSeatsCount ?? 0;
                            flightSearchResultsDTO.Add(newObj);
                        }
                    });
                

                _logger.LogInfo("GetAvailableFlightRouteByFilter End", methodName, flightSearchFilterDTO.DepartTime.ToString());
                return flightSearchResultsDTO;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return new List<FlightRouteDTO>();
            }
        }
    }
}
