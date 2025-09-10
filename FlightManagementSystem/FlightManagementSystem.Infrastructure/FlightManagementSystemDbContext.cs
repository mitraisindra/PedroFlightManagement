using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using FlightManagementSystem.Domain;
using FlightManagementSystem.Domain.Constants;
using System.Security.AccessControl;

namespace FlightManagementSystem.Infrastructure
{
    public partial class FlightManagementSystemDbContext : DbContext
    {
        public FlightManagementSystemDbContext()
        {
        }

        public FlightManagementSystemDbContext(DbContextOptions<FlightManagementSystemDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Aircraft> Aircraft { get; set; }
        public virtual DbSet<Airport> Airport { get; set; }
        public virtual DbSet<FlightRoute> FlightRoute { get; set; }
        public virtual DbSet<Region> Region { get; set; }
        public virtual DbSet<ReservationFlight> ReservationFlight { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Aircraft Entity
            modelBuilder.Entity<Aircraft>(entity =>
            {
                entity.ToTable("Aircraft");
            });

            // Region Entity
            var BaliRegion = new Region { Id = 1, Country = "Indonesia", Province = "BALI", RegionName = "KABUPATEN BADUNG" };
            var BalikpapanRegion= new Region { Id = 2, Country = "Indonesia", Province = "KALIMANTAN TIMUR", RegionName = "KOTA BALIKPAPAN" };
            var JakartaRegion = new Region { Id = 3, Country = "Indonesia", Province = "DKI JAKARTA", RegionName = "KOTA ADMINISTRASI JAKARTA TIMUR" };
            var BandungRegion = new Region { Id = 4, Country = "Indonesia", Province = "JAWA BARAT", RegionName = "KABUPATEN BANDUNG" };
            modelBuilder.Entity<Region>(entity =>
            {
                entity.ToTable("Region");

                entity.HasData(
                    BaliRegion,
                    JakartaRegion,
                    BalikpapanRegion,
                    BandungRegion);
            });

            // Airport Entity
            modelBuilder.Entity<Airport>(entity =>
            {
                entity.ToTable("Airport");
                entity.HasOne(d => d.Region)
                    .WithMany(p => p.Airports)
                    .HasForeignKey(d => d.RegionId)
                    .HasConstraintName("FK_Region_Airport");

                entity.HasData(
                    new Airport { Id = 1, IATA = "DPS",  ICAO = "WADD", RegionId = BaliRegion.Id, UsageClass = UsageClassConstants.International, AirportName = "I GUSTI NGURAH RAI" },
                    new Airport { Id = 2, IATA = "WALL", ICAO = "BPN", RegionId = BalikpapanRegion.Id, UsageClass = UsageClassConstants.International, AirportName = "SULTAN AJI MUHAMMAD SULAIMAN" },
                    new Airport { Id = 3, IATA = "HLP", ICAO = "WIHH", RegionId = JakartaRegion.Id, UsageClass = UsageClassConstants.International, AirportName = "HALIM PERDANA KUSUMA" },
                    new Airport { Id = 4, IATA = "BDO", ICAO = "WICC", RegionId = BandungRegion.Id, UsageClass = UsageClassConstants.International, AirportName = "HUSEIN SASTRANEGARA" }
                    );
            });

            // User Entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");
            });
            modelBuilder.Entity<User>()
                .Property(b => b.CreatedOn).HasColumnName("Created_On").HasColumnType("timestamp with time zone");

            modelBuilder.Entity<User>()
                .Property(b => b.CreatedBy).HasColumnName("Created_By");

            modelBuilder.Entity<User>()
                .Property(b => b.ModifiedOn).HasColumnName("Modified_On").HasColumnType("timestamp with time zone");

            modelBuilder.Entity<User>()
                .Property(b => b.ModifiedBy).HasColumnName("Modified_By");

            // FlightRoute Entity
            modelBuilder.Entity<FlightRoute>(entity =>
            {
                entity.ToTable("FlightRoute");

                entity.HasOne(d => d.DepAirport)
                    .WithMany(p => p.FlightRoutesDep)
                    .HasForeignKey(d => d.DepartAirport)
                    .HasConstraintName("FK_FlightRoute_DepAirport");

                entity.HasOne(d => d.DestAirport)
                    .WithMany(p => p.FlightRoutesDest)
                    .HasForeignKey(d => d.DestinationAirport)
                    .HasConstraintName("FK_FlightRoute_DestAirport");

                entity.HasOne(d => d.Aircraft)
                    .WithMany(p => p.FlightRoutes)
                    .HasForeignKey(d => d.AircraftId)
                    .HasConstraintName("FK_FlightRoute_Aircraft");
            });

            // ReservationFlight Entity
            modelBuilder.Entity<ReservationFlight>(entity =>
            {
                entity.ToTable("ReservationFlight");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ReservationFlights)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_ReservationFlight_User");
            });

            modelBuilder.Entity<ReservationFlight>()
                .Property(b => b.CreatedOn).HasColumnName("Created_On").HasColumnType("timestamp with time zone");

            modelBuilder.Entity<ReservationFlight>()
                .Property(b => b.CreatedBy).HasColumnName("Created_By");

            modelBuilder.Entity<ReservationFlight>()
                .Property(b => b.ModifiedOn).HasColumnName("Modified_On").HasColumnType("timestamp with time zone");

            modelBuilder.Entity<ReservationFlight>()
                .Property(b => b.ModifiedBy).HasColumnName("Modified_By");

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
