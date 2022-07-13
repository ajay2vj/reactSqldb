import React, { useState } from 'react'
import { Button, Row, Col, Form, Input, DatePicker } from 'antd';
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom';

export default function AddFees(){
    const [FeeAmount, setFeeAmount] = useState();
    const [Status, setStatus] = useState();
    const queryClient = useQueryClient()
    let history = useHistory();
    async function createStudent(credentials) {
      return fetch('http://localhost:53535/api/StudentFees', {
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
        FeeAmount,
        Status
       });
      }catch(error){
         // console.log(error)
      }finally{
         queryClient.invalidateQueries('fetchStudentFees', { exact: true })
         // setVisible(false)
         history.push('/student-fee');
      }
   }
  
  return(
    <div className='p-20'>
      <h3>Add Student Fees</h3>
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
              label="Amount"
              name="amount"
            >
              <Input 
                onChange={(e)=> setFeeAmount(e.target.value)}
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