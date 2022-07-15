import React from 'react'
import axios from 'axios'
import { Button, Popconfirm, Table } from 'antd'
import { Link, Redirect } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'

export default function Course(){
  const queryClient = useQueryClient()
  const fetchCourse = async () => {
    const res = await axios({
      url: 'http://localhost:53535/api/AddCourse',
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
      courseId: item?.CourseId,
      courseName: item?.CourseName,
      Id: item?.id
    }))
    return dataList;
  }
  const { data } = useQuery('fetchCourse', fetchCourse)
  async function deleteAPI(id) {
    return fetch(`http://localhost:53535/api/AddCourse/${id}`, {
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
    queryClient.invalidateQueries('fetchCourse', { exact: true })
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
      title: 'Course Id',
      dataIndex: 'courseId',
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
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
        <h3>Course List</h3>
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
            <Link to={'add-course'}>Add</Link>
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