import React from 'react'
import axios from 'axios'
import { Button, Popconfirm, Table } from 'antd'
import { useQuery, useQueryClient } from 'react-query'
import { Redirect } from 'react-router-dom'

export default function Student(){
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
    const dataList = res?.data?.map((item, index)=>({
      studentName: item?.StudentName,
      gender: item?.Gender,
      dob: item?.DOB,
      fName: item?.FatherName,
      mobile: item?.Mobile,
      email: item?.Email,
      Id: item?.Id
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
    <div className='p-20'>
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