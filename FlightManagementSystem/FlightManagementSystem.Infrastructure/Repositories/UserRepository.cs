using FlightManagementSystem.Domain;
using FlightManagementSystem.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly FlightManagementSystemDbContext _context;

        public UserRepository(FlightManagementSystemDbContext context)
        {
            _context = context;
        }

        public async Task<(User, bool)> Add(User user) {
            var isUserExist = false;
            var checkUser = GetUserByNIK(user.NIK);
            if (checkUser != null)
            {
                isUserExist = true;
                return (checkUser, isUserExist);
            }
            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();

            return (user, isUserExist);
        }

        public User? GetUserByNIK(string nik)
        {
            var user = _context.User.Where(x => x.NIK.ToLower().Equals(nik.ToLower())).FirstOrDefault();
            return user;
        }
    }
}
