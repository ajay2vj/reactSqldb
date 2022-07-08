import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Popconfirm, Table } from 'antd'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'

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
      rollNumber: item?.RollNumber,
      mobile: item?.Mobile,
      dept: item?.Dept,
      Id: item?.id
    }))
    return dataList;
  }
  const {data} = useQuery('fetchStudentList', fetchStudentList)
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
      title: 'Roll Number',
      dataIndex: 'rollNumber',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
    {
      title: 'Dept',
      dataIndex: 'dept',
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
  return(
    <div className='p-20'>
      <div className='flex justify-between'>
        <h3>Student List</h3>
        <Button 
          type="primary" 
          className='mb-2'
          onClick={()=> {}}
        >
          <Link to={'student-add'}>Add</Link>
        </Button>
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