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
    public class StudentLogin : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public StudentLogin(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public JsonResult Post(Admin dep)
        {
            string query = @"select Email, Password from dbo.StudentLogin where Email='" + dep.Email + @"' and Password='" + dep.Password + @"'";
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

            if (table?.Rows?.Count > 0)
            {
                return new JsonResult(new { result = "Successfully Logged In", user = dep.Email + ',' + dep.Password, tokenSuccess = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI19jk" });
            }
            else
            {
                return new JsonResult(new { result = "Login Faild" });
            }
        }

    }
}
