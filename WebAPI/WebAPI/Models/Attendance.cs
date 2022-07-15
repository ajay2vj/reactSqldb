using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Attendance
    {


        public string Name { get; set; }
        public string Class { get; set; }
        public string fromDate { get; set; }
        public string toDate { get; set; }

        public string Status { get; set; }
        public string Sid { get; set; }
        public int id { get; set; }



    }
}
