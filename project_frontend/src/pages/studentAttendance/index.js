import React from 'react'
import axios from 'axios'
import { Button, Popconfirm, Table } from 'antd'
import { Link, Redirect } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'

export default function StudentAttendance(){
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
      AtDate: item?.Atdate,
      status: item?.Status,
      Id: item?.Sid
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
  const columns = [
    {
      title: 'Attendance Date',
      dataIndex: 'AtDate',
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
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record?.Id)}>
          <Button>Delete</Button>
        </Popconfirm>
      ) : null,
    },
  ];
  if(!localStorage.getItem("user")){
    alert("please login first")
    return( <Redirect to="/"/> )
  }
  return(
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
  )
}