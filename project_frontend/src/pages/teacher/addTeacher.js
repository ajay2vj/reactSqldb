import React, { useState } from 'react'
import { Button, Row, Col, Form, Input } from 'antd';
import { useQueryClient } from 'react-query'
import { useHistory, Redirect } from 'react-router-dom';

export default function AddTeacher(){
    const [Student, setStuName] = useState();
    const [TeacherId, setTeacherId] = useState();
    const [TeacherName, setTeacherName] = useState();
    const [Sid, setSid] = useState();
    const queryClient = useQueryClient()
    let history = useHistory();
    async function createTeacher(credentials) {
      return fetch('http://localhost:53535/api/AddTeacher', {
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
       await createTeacher({
        Student,
        TeacherId,
        Sid,
        TeacherName,
       });
      }catch(error){
         // console.log(error)
      }finally{
         queryClient.invalidateQueries('fetchTeacher', { exact: true })
         // setVisible(false)
         history.push('/teacher');
      }
   }
  if(!localStorage.getItem("user")){
    alert("please login first")
    return( <Redirect to="/"/> )
  }
  return(
    <div className='p-20'>
      <h3>Add Teacher</h3>
      <Row>
        <Col span={8} offset={8}>
          <Form
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Student Id"
              name="sid"
            >
              <Input 
                onChange={(e)=> setSid(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Student Name"
              name="stuName"
            >
              <Input 
                onChange={(e)=> setStuName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Teacher Id"
              name="teacherId"
            >
              <Input 
                onChange={(e)=> setTeacherId(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Teacher Name"
              name="teacherName"
            >
              <Input
                onChange={(e)=> setTeacherName(e.target.value)}
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