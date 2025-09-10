using AutoMapper;
using FlightManagementSystem.Domain;
using FlightManagementSystem.Service.DTOs;
using FlightManagementSystem.Service.DTOs;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Infrastructure.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Aircraft, AircraftDTO>();
            CreateMap<AircraftDTO, Aircraft>();

            CreateMap<Airport, AirportDTO>();
            CreateMap<AircraftDTO, Aircraft>();

            CreateMap<FlightRoute, FlightRouteDTO>();
            CreateMap<FlightRouteDTO, FlightRoute>();

            CreateMap<Region, RegionDTO>();
            CreateMap<RegionDTO, Region>();

            CreateMap<ReservationFlight, ReservationFlightDTO>();
            CreateMap<ReservationFlightDTO, ReservationFlight>();

            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();
        }
    }
}
