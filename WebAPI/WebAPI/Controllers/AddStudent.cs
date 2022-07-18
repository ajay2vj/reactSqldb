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
    public class AddStudent : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AddStudent(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select Id, StudentName, Gender, DOB, FatherName, Mobile, Email, Address, Pincode, Classes, Admissiondate, FeeAmount, Passcode, Sid from dbo.studentDetails";
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
        public JsonResult Post(Student dep)
        {
            string query = @"
                    insert into dbo.studentDetails
                    (
                        StudentName, 
                        Gender, 
                        DOB,
                        FatherName,
                        Mobile,
                        Email,
                        Address,
                        Pincode,
                        Classes,
                        Admissiondate,
                        FeeAmount,
                        Passcode,
                        Sid
                    ) values
                        (
                            '" + dep.StudentName + @"', 
                            '" + dep.Gender + @"', 
                            '" + dep.DOB + @"', 
                            '" + dep.Fathername + @"',
                            '" + dep.Mobile + @"',
                            '" + dep.Email + @"',
                            '" + dep.Address + @"',
                            '" + dep.Pincode + @"',
                            '" + dep.Classes + @"',
                            '" + dep.Admissiondate + @"',
                            '" + dep.FeeAmount + @"',
                            '" + dep.Passcode + @"',
                            '" + dep.Sid + @"'
                        )";
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

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Student dep)
        {
            string query = @"
                    update dbo.studentDetails set 
                    Sid = '"+dep.Sid+@"',
                    StudentName = '"+dep.StudentName + @"',
                    Gender = '" + dep.Gender + @"',
                    DOB = '" + dep.DOB + @"',
                    FatherName = '" + dep.Fathername + @"',
                    Mobile = '" + dep.Mobile + @"',
                    Email = '" + dep.Email + @"',
                    Address = '" + dep.Address + @"',
                    Pincode = '" + dep.Pincode + @"', 
                    Classes = '" + dep.Classes + @"',
                    Admissiondate = '" + dep.Admissiondate + @"',
                    FeeAmount = '" + dep.FeeAmount + @"',
                    Passcode = '" + dep.Passcode + @"',
                    where Id = " + dep.Id + @" 
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
                    delete from dbo.studentDetails
                    where Id = " + id + @" 
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
