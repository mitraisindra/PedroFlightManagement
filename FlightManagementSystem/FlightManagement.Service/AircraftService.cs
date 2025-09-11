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
    public partial class AircraftService : ServiceBase, IAircraftService
    {
        private readonly IAircraftRepository _aircraftRepository;
        private readonly IMapper _mapper;
        private readonly ILoggerService _logger;

        public AircraftService(
            IAircraftRepository aircraftRepository,
            IMapper mapper, ILoggerService logger
            ) : base(mapper, logger)
        {
            _aircraftRepository = aircraftRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<(AircraftDTO?, bool)> AddAircraft(AircraftDTO aircraftDTO)
        {
            string methodName = "AircraftService.AddAircraft";
            try
            {
                if (aircraftDTO.AircraftCode.IsNullOrEmpty())
                {
                    _logger.LogWarn("AircraftCode cannot be empty", methodName);
                    return (null, false);
                }

                var aircraft = _mapper.Map<AircraftDTO, Aircraft>(aircraftDTO);

                _logger.LogInfo("AddAircraft Begin", methodName, aircraftDTO.AircraftCode);
                (Aircraft AddedAircraft, bool IsExist) = await _aircraftRepository.Add(aircraft);
                _logger.LogInfo("AddAircraft End", methodName, aircraftDTO.AircraftCode);
                var addedAircraft = _mapper.Map<Aircraft, AircraftDTO>(AddedAircraft);
                return (addedAircraft, IsExist);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return (null, false);
            }
        }
    }
}
