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
    public partial class FlightProcessingService : ServiceBase, IFlightProcessingService
    {
        private readonly IFlightProcessingRepository _flightProcessingRepository;
        private readonly IMapper _mapper;
        private readonly ILoggerService _logger;

        public FlightProcessingService(
            IFlightProcessingRepository flightProcessingRepository,
            IMapper mapper, ILoggerService logger
            ) : base(mapper, logger)
        {
            _flightProcessingRepository = flightProcessingRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<(ReservationFlightDTO?, bool)> AddFlightProcessing(ReservationFlightDTO flightProcessingDTO)
        {
            string methodName = "FlightProcessingService.AddFlightProcessing";
            try
            {
                if (flightProcessingDTO.FlightRouteIds.IsNullOrEmpty())
                {
                    _logger.LogWarn("Flight Routes has to be choosen", methodName);
                    return (null, false);
                }

                var flightProcessing = _mapper.Map<ReservationFlightDTO, ReservationFlight>(flightProcessingDTO);

                _logger.LogInfo("AddFlightProcessing Begin", methodName, flightProcessingDTO.FlightRouteIds);
                (ReservationFlight AddedFlightProcessing, bool IsExist) = await _flightProcessingRepository.Add(flightProcessing);
                _logger.LogInfo("AddFlightProcessing End", methodName, flightProcessingDTO.FlightRouteIds);
                var addedFlightProcessing = _mapper.Map<ReservationFlight, ReservationFlightDTO>(AddedFlightProcessing);
                return (addedFlightProcessing, IsExist);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return (null, false);
            }
        }

        //public async Task<ReservationFlightDTO?> GetFlightProcessingById(int id)
        //{
        //    string methodName = "FlightProcessingService.GetFlightProcessingById";
        //    try
        //    {
        //        _logger.LogInfo("GetFlightProcessingById Begin", methodName, id);
        //        var flightProcessing = await _flightProcessingRepository.GetById(id);
        //        _logger.LogInfo("GetFlightProcessingById End", methodName, id);
        //        var flightProcessingDTO = _mapper.Map<ReservationFlight, ReservationFlightDTO>(flightProcessing);
        //        return flightProcessingDTO;
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex);
        //        return null;
        //    }
        //}

        //public async Task<List<ReservationFlightDTO>> GetFlightProcessingsByFilter()
        //{
        //    string methodName = "FlightProcessingService.GetAllFlightProcessings";
        //    try
        //    {
        //        _logger.LogInfo("GetAllFlightProcessings Begin", methodName);
        //        var flightProcessings = await _flightProcessingRepository.GetAll();
        //        _logger.LogInfo("GetAllFlightProcessings End", methodName);
        //        var flightProcessingsDTO = _mapper.Map<List<ReservationFlight>, List<ReservationFlightDTO>>(flightProcessings);
        //        return flightProcessingsDTO;
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex);
        //        return new List<ReservationFlightDTO>();
        //    }
        //}
    }
}
