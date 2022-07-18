import React from 'react';
import { Link } from 'react-router-dom';
// import studentService from '../../services/studentservice';
//import resultService from '../services/resultservice';
// import  swal from 'sweetalert';
import {Redirect} from "react-router-dom"
import Student from '../../pages/student/studenLog';
const StudentHome = () => {
//const studentid=this.state;
  // const [, setStudent] = useState([]);
  //const [sid, setSid] = useState([]);
  // const sid =(localStorage.getItem('sid'));
  // const init = () => {
  //   studentService.getView(sid)
  //     .then(response => {
  //       console.log('Printing student data', response.data);
  //       setStudent(response.data);
  //     })
  //     .catch(error => {
  //       console.log('Something went wrong', error);
  //     }) 
  // }



//   useEffect(() => {
//  // const sid =(localStorage.getItem('sid'));
//  // if (sid) {
//    //setSid(sid);}
//    init();
  
// }, []);
  const logout =()=>{
    localStorage.removeItem("sid");
    localStorage.removeItem("tokenSuccess");
  }
  
  let mystyle={
    minHeight:"90vh"
}
//setSid(localStorage.getItem("studentid"))
  



// useEffect(() => {
  
//   }, []);

 
  if(!localStorage.getItem("sid")){
    alert("please login first")
    return( <Redirect to="/"/> )
}

  return (
    <div className="container" style={mystyle} >
   
      
      <div>
        
   <div>
  <h3 align="center">Student Details</h3>
  <Student />
 </div>
      </div>
      <div align="center">
      <Link className="btn btn-primary mb-2" to={`/student`}>back</Link>{' '}
      <Link to="/"onClick={logout} className="btn btn-primary mb-2">logout</Link>
      <br/>
      </div>
    </div>
  );
}

export default StudentHome;
