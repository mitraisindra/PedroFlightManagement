using FlightManagementSystem.Domain;
using FlightManagementSystem.Domain.Interfaces;
using FlightManagementSystem.Infrastructure.Helpers;
using System.Text.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace FlightManagementSystem.Infrastructure.Repositories
{
    public class FlightProcessingRepository : IFlightProcessingRepository
    {
        private readonly FlightManagementSystemDbContext _context;

        public FlightProcessingRepository(FlightManagementSystemDbContext context)
        {
            _context = context;
        }

        public async Task<(ReservationFlight, bool)> Add(ReservationFlight flightProcessing) {
            var isFlightProcessingExist = false;
            var checkFlightProcessing = GetFlightProcessingByBookingId(flightProcessing.BookingId);
            if (checkFlightProcessing != null)
            {
                isFlightProcessingExist = true;
                return (checkFlightProcessing, isFlightProcessingExist);
            }
            flightProcessing.BookingId = BookingCodeGenerator.GenerateBookingCode();
            await _context.ReservationFlight.AddAsync(flightProcessing);
            await _context.SaveChangesAsync();

            return (flightProcessing, isFlightProcessingExist);
        }

        public ReservationFlight? GetFlightProcessingByBookingId(string bookingId)
        {
            var flightProcessing = _context.ReservationFlight.Where(x => x.BookingId.Trim().ToLower().Equals(bookingId.Trim().ToLower())).FirstOrDefault();
            return flightProcessing;
        }

        public IEnumerable<FlightAvailSeatsCount> GetFlightAvailSeatsCount(List<FlightRoute> flightSearchResults, int totalSeatsNeeded)
        {
            // We narrow down the list 
            var reservationNearMatch = _context.ReservationFlight.Where(x => flightSearchResults.Select(s => s.Id).ToString().Contains(x.FlightRouteIds)).ToList();
            // Here we use JSONSerializer to convert the FlightRouteIds string to List<int>
            Regex regex = new Regex(@"\d+");
            var reservationMatch = new List<ReservationFlight>();
            reservationNearMatch.ForEach(x =>
            {
                MatchCollection matches = regex.Matches(x.FlightRouteIds);
                foreach (Match match in matches)
                {
                    if (flightSearchResults.Select(s => s.Id).ToList().Contains(int.Parse(match.Value)));
                    {
                        reservationMatch.Add(x);
                    }
                }
            });

            var flightAvailSeatsCount = flightSearchResults.Select(x => new FlightAvailSeatsCount()
            {
                FlightRouteId = x.Id,
                AvailableSeatsCount = x.Aircraft.Capacity - reservationMatch.Sum(rf => rf.NumberSeat)
            }).Where(w => w.AvailableSeatsCount >= totalSeatsNeeded).ToList();

            return flightAvailSeatsCount;
        }
    }
}
