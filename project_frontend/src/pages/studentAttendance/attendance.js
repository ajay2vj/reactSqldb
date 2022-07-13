import React, { useState } from 'react'
import { Button, Row, Col, Form, Input, DatePicker } from 'antd';
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom';
import moment from 'moment';

export default function AddAttendance(){
    const [Atdate, setAtdate] = useState();
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
        Atdate,
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
   const attendanceDate = (date) =>{
    setAtdate(moment(date?._d).format('MM-YYYY-DD h:mm:ss a'));
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
              label="Attendance Date"
              name="atdate"
            >
              <DatePicker 
                onChange={attendanceDate}
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
            <Form.Item
            >
              <Button 
                type="primary" 
                htmlType="submit"
                onClick={()=>dataSubmit()}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}