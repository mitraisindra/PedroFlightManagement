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

        public async Task<(ReservationFlightDTO?, bool)> UpdateReservationFlight(ReservationFlightDTO reservationFlightDto)
        {
            string methodName = "ReservationFlight.UpdateReservationFlight";
            try
            {
                if (reservationFlightDto.Id <= 0)
                {
                    _logger.LogWarn("UpdateReservationFlight ID has to be valid", methodName);
                    return (null, false);
                }

                var reservationFlight = _mapper.Map<ReservationFlightDTO, ReservationFlight>(reservationFlightDto);

                _logger.LogInfo("UpdateReservationFlight Begin", methodName, reservationFlight.Id.ToString());
                var (updatedReservationFlight, isSuccess) = await _flightProcessingRepository.Update(reservationFlight);
                _logger.LogInfo("UpdateReservationFlight End", methodName, reservationFlight.Id.ToString());
                var updatedReservationFlightDTO = _mapper.Map<ReservationFlight, ReservationFlightDTO>(updatedReservationFlight);
                return (updatedReservationFlightDTO, isSuccess);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return (null, false);
            }
        }

        public async Task<ReservationFlightDTO?> GetFlightProcessingById(int id)
        {
            string methodName = "FlightProcessingService.GetFlightProcessingById";
            try
            {
                _logger.LogInfo("GetFlightProcessingById Begin", methodName, id.ToString());
                var flightProcessing = await _flightProcessingRepository.GetReservationFlightById(id);
                _logger.LogInfo("GetFlightProcessingById End", methodName, id.ToString());
                var flightProcessingDTO = _mapper.Map<ReservationFlight, ReservationFlightDTO>(flightProcessing);
                return flightProcessingDTO;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return null;
            }
        }
    }
}
