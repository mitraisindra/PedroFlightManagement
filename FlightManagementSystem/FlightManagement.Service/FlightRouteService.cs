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
        private readonly IMapper _mapper;
        private readonly ILoggerService _logger;

        public FlightRouteService(
            IFlightRouteRepository flightRouteRepository,
            IMapper mapper, ILoggerService logger
            ) : base(mapper, logger)
        {
            _flightRouteRepository = flightRouteRepository;
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
    }
}
