using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<(User, bool)> Add(User user);
        User? GetUserByNIK(string nik);
    }
}
