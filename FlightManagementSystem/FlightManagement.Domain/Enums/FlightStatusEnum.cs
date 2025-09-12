using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain.Enums
{
    public enum FlightStatusEnum
    {
        [Description("Booked a Flight")]
        Booked = 1,
        [Description("Boarded a Flight")]
        Boarded = 2,
        [Description("Departed a Flight")]
        Departed = 3,
        [Description("Flight Canceled")]
        Canceled = 4
    }
}
