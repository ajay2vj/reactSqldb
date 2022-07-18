import React, {useState} from 'react'
import axios from 'axios'
import { Button, Popconfirm, Table, Modal } from 'antd'
import { Link, Redirect } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import styled from 'styled-components'

export default function StudentAttendance(){
  const [showModal, setShowModal] = useState(false)
  const [viewData, setViewData] = useState()
  const queryClient = useQueryClient()
  const fetchStudentAttendance = async () => {
    const res = await axios({
      url: 'http://localhost:53535/api/StudentAttendance',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, DELETE, HEAD, OPTIONS',
        'Access-Control-Allow-Credentials': true
      },
    })
    
    const dataList = res?.data?.map((item, index)=>({
      studentId: item?.Sid,
      name: item?.Name,
      class: item?.Class,
      fromDate: item?.fromDate,
      toDate: item?.toDate,
      status: item?.Status,
      Id: item?.id
    }))
    return dataList;
  }
  const { data } = useQuery('fetchStudentAttendance', fetchStudentAttendance)
  async function deleteAPI(id) {
    return fetch(`http://localhost:53535/api/StudentAttendance/${id}`, {
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
    queryClient.invalidateQueries('fetchStudentAttendance', { exact: true })
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
      title: 'Student Id',
      dataIndex: 'studentId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Class',
      dataIndex: 'class',
    },
    {
      title: 'Start',
      dataIndex: 'fromDate',
    },
    {
      title: 'End',
      dataIndex: 'toDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) =>
      data?.length >= 1 ? (
        <div className='flex gap-3'>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record?.Id)}>
            <Button>Delete</Button>
          </Popconfirm>
          {pathName === '/student/view' ? <Button onClick={() => handleView(record)}>View</Button>: null}
        </div>
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
        title="View Attendance"
        visible={showModal} 
        onOk={handleOk} 
        onCancel={handleCancel}
        width={800}
        heigh={400}
      >
          <Column>
            <div className='font-bold'>Student ID</div>
            <div className='font-bold'>Name</div>
            <div className='font-bold'>Class</div>
            <div className='font-bold'>Start</div>
            <div className='font-bold'>End</div>
            <div className='font-bold'>Status</div>
            <div>{viewData?.studentId}</div>
            <div>{viewData?.name}</div>
            <div>{viewData?.class}</div>
            <div>{viewData?.fromDate}</div>
            <div>{viewData?.toDate}</div>
            <div>{viewData?.status}</div>
          </Column>
      </Modal>
      <div className='p-40'>
        <div className='flex justify-between'>
          <h3>Student Attendance</h3>
          <div className='flex gap-4'>
            <Button 
              type="primary" 
              className='mb-2'
              onClick={()=> {}}
            >
              <Link to={'/admin/view'}>Back</Link>
            </Button>
            <Button 
              type="primary" 
              className='mb-2'
              onClick={()=> {}}
            >
              <Link to={'add-attendance'}>Add</Link>
            </Button>
          </div>
        </div>
        <Table
          // rowSelection={{
          //   type: selectionType,
          //   ...rowSelection,
          // }}
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
  grid-template-columns: auto auto auto auto auto auto;
`;