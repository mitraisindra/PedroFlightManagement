using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Service.Logger.Interfaces
{
    public interface ILoggerService
    {
        void LogInfo(string message);
        void LogInfo(string message, string methodDetail, string userId);
        void LogWarn(string message);
        void LogWarn(string message, string methodDetail);
        void LogDebug(string message);
        void LogDebug(string message, string methodDetail);
        void LogError(string message);
        void LogError(string message, string methodDetail);
        void LogError(Exception exception);
    }
}
