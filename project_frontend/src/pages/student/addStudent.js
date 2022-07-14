import React, { useState } from 'react'
import { Button, Row, Col, Form, Input, DatePicker } from 'antd';
import moment from 'moment';
import { useQueryClient } from 'react-query'
import { useHistory, Redirect } from 'react-router-dom';

export default function StudentAdd(){
    const [StudentName, setStudent] = useState();
    const [Gender, setGender] = useState();
    const [DOB, setDOB] = useState();
    const [FatherName, setFname] = useState();
    const [Mobile, setMobile] = useState();
    const [Email, setEmail] = useState();
    const [Address, setAddress] = useState();
    const [Pincode, setPincode] = useState();
    const [Classes, setClasses] = useState();
    const [Admissiondate, setAdDate] = useState();
    const [FeeAmount, setFamount] = useState();
    const [Passcode, setPasscode] = useState();
    const queryClient = useQueryClient()
    let history = useHistory();
    async function createStudent(credentials) {
      return fetch('http://localhost:53535/api/AddStudent', {
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
       await createStudent({
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
        Passcode
       });
      }catch(error){
         // console.log(error)
      }finally{
         queryClient.invalidateQueries('fetchStudentList', { exact: true })
         // setVisible(false)
         history.push('/admin/view');
      }
   }
  const dobChnage = (date) =>{
    setDOB(moment(date?._d).format('MM-YYYY-DD h:mm:ss a'));
  }
  const adDateChnage = (date) =>{
    setAdDate(moment(date?._d).format('MM-YYYY-DD h:mm:ss a'));
  }

  if(!localStorage.getItem("user")){
    alert("please login first")
    return( <Redirect to="/"/> )
  }
  
  return(
    <div className='p-20'>
      <h3>Add student</h3>
      <Row>
        <Col span={8} offset={8}>
          <Form
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Student Name"
              name="StudentName"
            >
              <Input 
                onChange={(e)=> setStudent(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="Gender"
            >
              <Input 
                onChange={(e)=> setGender(e.target.value)}
              />
            </Form.Item>
            <div className='flex'>
              <Form.Item
                label="DOB"
                name="DOB"
              >
                <DatePicker onChange={dobChnage}/>
              </Form.Item>
            </div>
            <Form.Item
              label="Father Name"
              name="FatherName"
            >
              <Input onChange={(e)=> setFname(e.target.value)}/>
            </Form.Item>
            <Form.Item
              label="Mobile"
              name="Mobile"
            >
              <Input onChange={(e)=> setMobile(e.target.value)}/>
            </Form.Item>
            <Form.Item
              label="Email"
              name="Email"
            >
              <Input onChange={(e)=> setEmail(e.target.value)}/>
            </Form.Item>
            <Form.Item
              label="Address"
              name="Address"
            >
              <Input onChange={(e)=> setAddress(e.target.value)}/>
            </Form.Item>
            <Form.Item
              label="Pincode"
              name="Pincode"
            >
              <Input onChange={(e)=> setPincode(e.target.value)}/>
            </Form.Item>
            <Form.Item
              label="Classes"
              name="Classes"
            >
              <Input onChange={(e)=> setClasses(e.target.value)}/>
            </Form.Item>
            <div className='flex'>
              <Form.Item
                label="Admissiondate"
                name="Admissiondate"
              >
                <DatePicker onChange={adDateChnage}/>
              </Form.Item>
            </div>
            <Form.Item
              label="FeeAmount"
              name="FeeAmount"
            >
              <Input onChange={(e)=> setFamount(e.target.value)}/>
            </Form.Item>
            <Form.Item
              label="Password"
              name="Passcode"
            >
              <Input.Password onChange={(e)=> setPasscode(e.target.value)}/>
            </Form.Item>

            <div
              className='flex gap-4'
            >
              <Button 
                type="primary" 
                htmlType="submit"
                onClick={()=>history.goBack()}
              >
                Back
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