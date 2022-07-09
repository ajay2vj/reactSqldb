using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Student
    {

        public int Id { get; set; }

        public string StudentName { get; set; }
        public string Gender { get; set; }
        public DateTime DOB { get; set; }
        public string Fathername { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Pincode { get; set; }
        public string Classes { get; set; }
        public DateTime Admissiondate { get; set; }
        public int FeeAmount { get; set; }

        public string Passcode { get; set; }




    }
}
