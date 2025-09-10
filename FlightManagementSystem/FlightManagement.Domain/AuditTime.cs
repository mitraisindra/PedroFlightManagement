using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain
{
    public class AuditTime
    {
        public DateTime? CreatedOn { get; set; }

        [StringLength(100, ErrorMessage = "CreatedOn must be less than 100 characters.")]
        public string CreatedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }

        [StringLength(100, ErrorMessage = "ModifiedOn must be less than 100 characters.")]
        public string ModifiedBy { get; set; }
    }
}
