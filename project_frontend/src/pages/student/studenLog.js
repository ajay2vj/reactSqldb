import React, {useState} from 'react'
import axios from 'axios'
import { Button, Popconfirm, Table, Modal } from 'antd'
import { useQuery, useQueryClient } from 'react-query'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

export default function StudentLog(){
  const [showModal, setShowModal] = useState(false)
  const [viewData, setViewData] = useState()
  const queryClient = useQueryClient()
  const fetchStudentList = async () => {
    const res = await axios({
      url: 'http://localhost:53535/api/AddStudent',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, DELETE, HEAD, OPTIONS',
        'Access-Control-Allow-Credentials': true
      },
    })
    const loggedInUser = localStorage.getItem('sid')
    const dataList = res?.data?.filter((item, index)=> item?.Sid === JSON.parse(loggedInUser)).map((item, index)=>({
      studentName: item?.StudentName,
      studentId: item?.Sid,
      gender: item?.Gender,
      dob: item?.DOB,
      fName: item?.FatherName,
      mobile: item?.Mobile,
      email: item?.Email,
      Id: item?.Id,
      Address: item?.Address,
      Admissiondate: item?.Admissiondate,
      Classes: item?.Classes,
      Email: item?.Email,
      FeeAmount: item?.FeeAmount,
      Pincode: item?.Pincode,
    }))
    return dataList;
  }
  const { data } = useQuery('fetchStudentList', fetchStudentList)
  async function deleteAPI(id) {
    return fetch(`http://localhost:53535/api/AddStudent/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    })
      .then(data => data.json())
  }
  const handleDelete = async(key) => {
    await deleteAPI(key);
    queryClient.invalidateQueries('fetchStudentList', { exact: true })
  }
  const handleView = async(key) => {
    setViewData(key)
    setShowModal(true)
  }
  const handleOk = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const pathName = window.location.pathname;

  const columns = [
    {
      title: 'Studen Name',
      dataIndex: 'studentName',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
    },
    {
      title: 'Father Name',
      dataIndex: 'fName',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) =>
      data?.length >= 1 ? (
        <div className='flex gap-3'>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record?.Id)}>
            <Button style={{display: 'none'}}>Delete</Button>
          </Popconfirm>
          {pathName === '/student/view' ? <Button onClick={() => handleView(record)}>View</Button>: null}
        </div>
      ) : null,
    },
  ];
  if(!localStorage.getItem("sid")){
    alert("please login first")
    return( <Redirect to="/"/> )
  }
  return(
    <>
      <Modal
        title="View Student"
        visible={showModal} 
        onOk={handleOk} 
        onCancel={handleCancel}
        width={500}
        heigh={800}
      >
        <Column>
          <div>
            <div className='font-bold'>Student Id</div>
            <div className='font-bold'>Student Name</div>
            <div className='font-bold'>Classes</div>
            <div className='font-bold'>Gender</div>
            <div className='font-bold'>Date of birth</div>
            <div className='font-bold'>Address</div>
            <div className='font-bold'>Father Name</div>
            <div className='font-bold'>Mobile</div>
            <div className='font-bold'>Email</div>
            <div className='font-bold'>Fee Amount</div>
            <div className='font-bold'>Pincode</div>
            <div className='font-bold'>AD Date</div>
          </div>
          <div>
            <div>{viewData?.studentId}</div>
            <div>{viewData?.studentName}</div>
            <div>{viewData?.Classes}</div>
            <div>{viewData?.gender}</div>
            <div>{viewData?.dob}</div>
            <div>{viewData?.Address}</div>
            <div>{viewData?.fName}</div>
            <div>{viewData?.mobile}</div>
            <div>{viewData?.email}</div>
            <div>{viewData?.FeeAmount}</div>
            <div>{viewData?.Pincode}</div>
            <div>{viewData?.Admissiondate}</div>
          </div>
        </Column>
      </Modal>
      <div className='p-20'>
        <Table
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  )
}

const Column = styled.div`
  border: 1px solid #ddd9d9;
  padding: 10px 20px;
  display: grid;
  gap: 20px;
  grid-template-columns: auto auto;
`;