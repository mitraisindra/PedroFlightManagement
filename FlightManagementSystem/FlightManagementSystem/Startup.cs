using FlightManagementSystem.Infrastructure;
using FlightManagementSystem.Infrastructure.Helpers;
using FlightManagementSystem.Service.Logger.Interfaces;
using FlightManagementSystem.Service.Logger;
using Microsoft.EntityFrameworkCore;
using NLog;
using NLog.Web;
using FlightManagementSystem.Service.Interfaces;
using FlightManagementSystem.Service;
using FlightManagementSystem.Domain.Interfaces;
using FlightManagementSystem.Infrastructure.Repositories;

namespace FlightManagementSystem
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            LogManager.Setup().LoadConfigurationFromAppSettings();
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                string[] allowedOrigins = {
                    "https://localhost:8080",
                };
                options.AddPolicy("MyDefaultPolicy", builder =>
                {
                    builder
                    .WithOrigins(allowedOrigins)
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });

            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            var conString = Configuration.GetValue<string>("ConnectionStrings:AppDbContext");
            services.AddDbContext<FlightManagementSystemDbContext>(option =>  option.UseSqlServer(conString));

            // Configure Logger Service
            services.AddSingleton<ILoggerService, LoggerService>();

            // Configure App service
            services.AddScoped<IAircraftService, AircraftService>();
            services.AddScoped<IAirportService, AirportService>();
            services.AddScoped<IFlightRouteService, FlightRouteService>();
            services.AddScoped<IFlightProcessingService, FlightProcessingService>();

            // Configure App Repository
            services.AddScoped<IAircraftRepository, AircraftRepository>();
            services.AddScoped<IAirportRepository, AirportRepository>();
            services.AddScoped<IRegionRepository, RegionRepository>();
            services.AddScoped<IFlightRouteRepository, FlightRouteRepository>();
            services.AddScoped<IFlightProcessingRepository, FlightProcessingRepository>();
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Configure the HTTP request pipeline.
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("MyDefaultPolicy");
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
