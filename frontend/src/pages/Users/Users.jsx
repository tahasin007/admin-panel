import './Users.scss'
import { Container, Row, Col } from 'react-bootstrap'
import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/users').then((res) => {
      setUsers(res.data)
    })
  }, [])
  const columns = [
    { field: 'id', headerName: 'ID', width: 120, editable: false },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 200,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 200,
      editable: false,
    },
    {
      field: 'emailAddress',
      headerName: 'Email',
      width: 200,
    },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   width: 200,
    // },
  ]

  return (
    <Container fluid className='users-container'>
      <Row>
        <Col xl={10} style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[4]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Users
