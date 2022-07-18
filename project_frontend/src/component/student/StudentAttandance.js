import React from 'react';
import { Link} from 'react-router-dom';
// import attandanceService from '../../services/attandanceservice';
// import studentService from '../../services/studentservice';
// import  swal from 'sweetalert';
// import Avatar from '@mui/material/Avatar';
import {Redirect} from "react-router-dom";
import StudentAttendance from '../../pages/studentAttendance/studentAtt';

const AttandanceStudent = () => {
  // const [attandance, setAttandance] = useState([]);
  
  // const[student,setStudent]=useState('');
  // const[startdate,setStartDate]=useState('');
  // const[enddate,setEndDate]=useState('');
  // const sid =(localStorage.getItem('sid'));
  
  const logout =()=>{
    localStorage.removeItem("sid");
    localStorage.removeItem("tokenSuccess");
  }
  // const init1 = () => {
  //   studentService.getdetail(sid)
  //     .then(response => {
  //       console.log('Printing student data', response.data);
  //       setStudent(response.data);
  //     })
  //     .catch(error => {
  //       console.log('Something went wrong', error);
  //     }) 
  // }
  let mystyle={
    minHeight:"90vh"
}


  // const init = () => {
  //   attandanceService.get(sid,`${startdate}`,`${enddate}`)
  //     .then(response => {
  //       console.log('Printing attandance data', response.data);
  //       setAttandance(response.data);
  //       if({startdate}>{enddate}){
  //         swal({
  //           title: "End date should be greater than start date",
  //           text: "You clicked the button!",
  //           icon: "warning",
  //         });
  //       }

  //     })
  //     .catch(error => {
  //       console.log('Something went wrong', error);
  //     }) 
  // }


 


  // useEffect(() => {
  //   init1();
  // }, []);

  
  if(!localStorage.getItem("sid")){
    alert("please login first")
    return( <Redirect to="/"/> )
  }
  return (

    <div style={mystyle}>
      <StudentAttendance />
      <div align="center">
        <Link className="btn btn-primary mb-2" to={`/student`}>back</Link>{' '}
        <Link to="/"onClick={logout} className="btn btn-primary mb-2">logout</Link>
        <br/>
      </div>
    </div>
  )
}


export default AttandanceStudent;
