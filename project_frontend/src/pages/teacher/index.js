import React from 'react'
import axios from 'axios'
import { Button, Popconfirm, Table } from 'antd'
import { Link, Redirect } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'

export default function Teacher(){
  const queryClient = useQueryClient()
  const fetchTeacher = async () => {
    const res = await axios({
      url: 'http://localhost:53535/api/AddTeacher',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, DELETE, HEAD, OPTIONS',
        'Access-Control-Allow-Credentials': true
      },
    })
    const dataList = res?.data?.map((item, index)=>({
      studentId: item?.Sid,
      student: item?.Student,
      teacherId: item?.TeacherId,
      teacherName: item?.TeacherName,
      Id: item?.id
    }))
    return dataList;
  }
  const { data } = useQuery('fetchTeacher', fetchTeacher)
  async function deleteAPI(id) {
    return fetch(`http://localhost:53535/api/AddTeacher/${id}`, {
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
    queryClient.invalidateQueries('fetchTeacher', { exact: true })
  }
  const columns = [
    {
      title: 'Student Id',
      dataIndex: 'studentId',
    },
    {
      title: 'Student Name',
      dataIndex: 'student',
    },
    {
      title: 'Teacher Id',
      dataIndex: 'teacherId',
    },
    {
      title: 'Teacher Name',
      dataIndex: 'teacherName',
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
        <h3>Teacher List</h3>
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
            <Link to={'add-teacher'}>Add</Link>
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