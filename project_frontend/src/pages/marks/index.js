import React, { useState } from 'react'
import axios from 'axios'
import { Button, Table, Modal } from 'antd'
import { Link, Redirect } from 'react-router-dom'
import { useQuery } from 'react-query'
import styled from 'styled-components'

export default function Viewmark(){
  const [showModal, setShowModal] = useState(false)
  const [viewData, setViewData] = useState()
  const handleOk = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  const fetchMarkList = async () => {
    const res = await axios({
      url: 'http://localhost:53535/api/MarkView',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, DELETE, HEAD, OPTIONS',
        'Access-Control-Allow-Credentials': true
      },
    })
    const dataList = res?.data?.map((item, index)=>({
      studentId: item?.Sid,
      registerId: item?.registerId,
      subject: item?.subject,
      mark: item?.mark,
      Id: item?.id
    }))
    return dataList;
  }
  const { data } = useQuery('fetchMarkList', fetchMarkList)
  
  const handleView = async(key) => {
    setViewData(key)
    setShowModal(true)
  }
  const columns = [
    {
      title: 'Student Id',
      dataIndex: 'studentId',
    },
    {
      title: 'Register Id',
      dataIndex: 'registerId',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
    },
    {
      title: 'Mark',
      dataIndex: 'mark',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) =>
      data?.length >= 1 ? (
        <Button onClick={() => handleView(record)}>View</Button>
      ) : null,
    },
  ];
  if(!localStorage.getItem("user")){
    alert("please login first")
    return( <Redirect to="/"/> )
  }
  return(
    <>
      <Modal 
        title="View Mark"
        visible={showModal} 
        onOk={handleOk} 
        onCancel={handleCancel}
      >
          <Column>
            <div className='font-bold'>Student ID</div>
            <div className='font-bold'>Register Id</div>
            <div className='font-bold'>Subject</div>
            <div className='font-bold'>Mark</div>
            <div>{viewData?.studentId}</div>
            <div>{viewData?.registerId}</div>
            <div>{viewData?.subject}</div>
            <div>{viewData?.mark}</div>
          </Column>
      </Modal>
      <div className='p-40'>
        <div className='flex justify-between'>
          <h3>Mark List</h3>
          <div className='flex gap-4'>
            <Button 
              type="primary" 
              className='mb-2'
              onClick={()=> {}}
            >
              <Link to={'/admin/view'}>Back</Link>
            </Button>
          </div>
        </div>
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
  grid-template-columns: auto auto auto auto;
`;