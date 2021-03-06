import React, { useState } from 'react'
import { Button, Row, Col, Form, Input, DatePicker } from 'antd';
import { useQueryClient } from 'react-query'
import { useHistory, Redirect } from 'react-router-dom';
import moment from 'moment';

export default function AddAttendance(){
    const [fromDate, setStartDate] = useState();
    const [toDate, setEndDate] = useState();
    const [Class, setClass] = useState();
    const [Name, setName] = useState();
    const [Sid, setSid] = useState();
    const [Status, setStatus] = useState();
    const queryClient = useQueryClient()
    let history = useHistory();
    async function createStudentAttendance(credentials) {
      return fetch('http://localhost:53535/api/StudentAttendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
        .then(data => data.json())
    }
    const dataSubmit = async() => {
      try{
       await createStudentAttendance({
        Name,
        Class,
        Sid,
        fromDate,
        toDate,
        Status
       });
      }catch(error){
         // console.log(error)
      }finally{
         queryClient.invalidateQueries('fetchStudentAttendance', { exact: true })
         // setVisible(false)
         history.push('/student-attendance');
      }
   }
   const startOnchange = (date) =>{
    setStartDate(moment(date?._d).format('MM-YYYY-DD'));
   }
   const endOnchange = (date) =>{
    setEndDate(moment(date?._d).format('MM-YYYY-DD'));
   }
  if(!localStorage.getItem("user")){
    alert("please login first")
    return( <Redirect to="/"/> )
  }
  return(
    <div className='p-20'>
      <h3>Add Student Attendance</h3>
      <Row>
        <Col span={8} offset={8}>
          <Form
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
            >
              <Input 
                onChange={(e)=> setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Class"
              name="class"
            >
              <Input 
                onChange={(e)=> setClass(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Student Id"
              name="sid"
            >
              <Input 
                onChange={(e)=> setSid(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Start Date"
              name="start"
            >
              <DatePicker 
                onChange={startOnchange}
              />
            </Form.Item>
            <Form.Item
              label="End Date"
              name="end"
            >
              <DatePicker 
                onChange={endOnchange}
              />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
            >
              <Input 
                onChange={(e)=> setStatus(e.target.value)}
              />
            </Form.Item>
            <div className='flex gap-4'>
              <Button 
                type="primary" 
                className='mb-2'
                onClick={()=> history.goBack()}
              >Back
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                onClick={()=>dataSubmit()}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}