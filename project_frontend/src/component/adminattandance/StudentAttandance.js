import { useState,useRef}  from 'react';
import { Link} from 'react-router-dom';
// import attandanceService from '../../services/attandanceservice';
// import studentService from '../../services/studentservice';
// import  swal from 'sweetalert';
import {Redirect} from "react-router-dom";
import ReactToPrint from 'react-to-print';//print

const AttandanceList = () => {
  const [attandance, ] = useState([]);
  const[student,]=useState('');
  const[startdate,setStartDate]=useState('');
  const[enddate,setEndDate]=useState('');
  // const {sid} = useParams();
  const componentRef = useRef();//print
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

  if(!localStorage.getItem("user")){
    alert("please login first")
    return( <Redirect to="/"/> )
}
return (
    <div className='container' style={mystyle}>  
     <br/>
     <div align="right">
       
    <ReactToPrint
        trigger={() => <button >Print this out!</button>}
        content={() => componentRef.current}
      />
      </div>
      

     
     Starting Date :
      <input 
                        type="date" 
                        id="startdate"
                        value={startdate}
                        onChange={(s) => setStartDate(s.target.value)}
                        placeholder="Enter Admission Date"
                    />{'  '}
        End Date :
        <input 
                        type="date" 
                        id="enddate"
                        value={enddate}
                        onChange={(s) => setEndDate(s.target.value)}
                        placeholder="Enter Admission Date"
                    />
                    {' '}
     <button type="submit"onClick={()=>{}} className="btn btn-primary" >sumbit</button>  
     <div ref={componentRef}>
<h2 align="center">Attandance</h2>  
<div>
  <table className="table table-bordered table-striped">
    <thead className="thead-dark" align="left">
    <tr><td colSpan="2"><b>Student Id :</b>{' '}{student.sid} </td></tr>
            <tr><td colSpan="2"><b>Name : </b>{' '}{student.name} </td></tr>
            <tr><td colSpan="2"><b>Class :</b>{' '}{student.classes}</td></tr>
      <tr>
        <td>Date</td>
        <td>Status</td>
      </tr>
    </thead>
    <tbody>
     {
            attandance.map(attandance => (
              <tr key={attandance.aid}>
                <td>{new Date(attandance.date).toLocaleDateString()}</td>
                <td>{attandance.status}</td>
    
              </tr>
              ))}
    </tbody>

  </table>
</div>
</div>
<div align="center">
       <Link to='/admin/addattandance'>
                    <button type="button" className="btn btn-primary" style={{ marginLeft: '.5rem' }}>back</button>
      </Link>
      
   </div>
   <br/>
</div>
  )
}


export default AttandanceList;
