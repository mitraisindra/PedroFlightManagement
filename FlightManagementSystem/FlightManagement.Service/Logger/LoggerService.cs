using FlightManagementSystem.Service.Logger.Interfaces;
using NLog;

namespace FlightManagementSystem.Service.Logger
{
    public class LoggerService : ILoggerService
    {
        private static readonly ILogger logger = LogManager.GetCurrentClassLogger();
        public LoggerService()
        {
        }
        public void LogDebug(string message)
        {
            logger.Debug(message);
        }
        public void LogDebug(string message, string methodDetail)
        {
            logger.Debug(string.Concat("called in ", methodDetail, "|", message));
        }

        public void LogInfo(string message)
        {
            logger.Info(message);
        }
        public void LogInfo(string message, string methodDetail, string userId)
        {
            logger.Info(string.Concat("called in ", methodDetail, " by ", userId, "|", message));
        }

        public void LogWarn(string message)
        {
            logger.Warn(message);
        }
        public void LogWarn(string message, string methodDetail)
        {
            logger.Warn(string.Concat("called in ", methodDetail, "|", message));
        }

        public void LogError(string message)
        {
            logger.Error(message);
        }

        public void LogError(Exception exception)
        {
            logger.Error(exception);
        }
        public void LogError(string message, string methodDetail)
        {
            logger.Error(string.Concat("called in ", methodDetail, "|", message));
        }
    }
}
