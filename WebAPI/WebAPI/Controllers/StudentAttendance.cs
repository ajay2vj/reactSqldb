using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAttendance : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public StudentAttendance(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select Name, Class, fromDate, toDate, Status, Sid, id from dbo.studentAttendance";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(Attendance dep)
        {
            string query = @"
                    insert into dbo.studentAttendance(fromDate, toDate, Class, Name, Sid, Status) values('" + dep.fromDate + @"', '" + dep.toDate + @"', '" + dep.Class + @"', '" + dep.Name + @"','" + dep.Sid + @"', '" + dep.Status + @"')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Attendance dep)
        {
            string query = @"
                    update dbo.studentAttendance set 
                    fromDate = '" + dep.fromDate + @"',
                    toDate = '" + dep.toDate + @"',
                    CLass = '" + dep.Class + @"',
                    Name = '" + dep.Name + @"',
                    Sid = '" + dep.Sid + @"',
                    Status = '" + dep.Status + @"'
                    where id = " + dep.id + @"
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.studentAttendance
                    where id = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}
