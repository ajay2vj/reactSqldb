import { useEffect, useState } from 'react';
import { Link, useHistory ,useParams} from 'react-router-dom';
import attandanceService from '../../services/attandanceservice';
import studentService from '../../services/studentservice';
import  swal from 'sweetalert';
import Avatar from '@mui/material/Avatar';
import { PieChart, Pie,Cell, Tooltip, ResponsiveContainer } from 'recharts';
import  '../style.css';
import {Redirect} from "react-router-dom";
const AttandanceReport = () => {
  const [attandance, setAttandance] = useState([0,0]);
  const[student,setStudent]=useState('');
  let x=attandance.map;

  
  const {sid} = useParams();
  const init1 = () => {
    studentService.get(sid)
      .then(response => {
        console.log('Printing student data', response.data);
        setStudent(response.data);
      })
      .catch(error => {
        console.log('Something went wrong', error);
      }) 
  }
  let mystyle={
    minHeight:"90vh"
}
 


  const init = () => {
    attandanceService.getcount(sid)
      .then(response => {
        console.log('Printing attandance data', response.data);
        setAttandance(response.data);
       })
      .catch(error => {
        console.log('Something went wrong', error);
      }) 
  }


 const total=attandance[0]+attandance[1]


  useEffect(() => {
    init1();
    
  }, []);

  
  useEffect(() => {
    init();
    
  }, []);
  const data=[
    { name: 'Present', value: attandance[0]},
    { name: 'Absent', value: attandance[1],color:"danger"},
  ];
  const COLORS = ['#5cb85c', '#bb2124'];
  if(!localStorage.getItem("user")){
    alert("please login first")
    return( <Redirect to="/"/> )
}
 return (
   <div>
   <div align="right">
       <Link to='/admin/addattandance'>
                    <button type="button" className="btn btn-primary" style={{ marginLeft: '.5rem' }}>back</button>
      </Link>
   </div>
    <div className='container'>  
     <br/>
     <div>
  <table className="table table-bordered table-striped">
    <thead className="thead-dark" align="left">
    <tr><td colSpan="2"><b>Student Id :</b>{' '}{student.sid} </td></tr>
            <tr><td colSpan="2"><b>Name : </b>{' '}{student.name} </td></tr>
            <tr><td colSpan="2"><b>Class :</b>{' '}{student.classes}</td></tr>
            <tr><td colSpan="2"><b>No of day Present :</b>{' '}{attandance[0]}/{total}</td></tr>
  </thead>
    

  </table>
</div>
<div className='login-form' align="center">
<div className="title">
<PieChart width={250} height={250}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            
            label
          >
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
          <Tooltip />
        </PieChart>
  
</div>
</div>
<br/>
</div>
</div>

  )
}


export default AttandanceReport;
