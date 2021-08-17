import './Users.scss'
import { Container, Row, Col } from 'react-bootstrap'
import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'

const Users = () => {
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

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon' , emailAddress: 'jon@gmail.com'},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', emailAddress: 'jon@gmail.com'},
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', emailAddress: 'jon@gmail.com'},
    { id: 4, lastName: 'Stark', firstName: 'Arya', emailAddress: 'jon@gmail.com'},
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', emailAddress: 'jon@gmail.com'},
    { id: 6, lastName: 'Melisandre', firstName: null, emailAddress: 'jon@gmail.com'},
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', emailAddress: 'jon@gmail.com'},
    { id: 8, lastName: 'Frances', firstName: 'Rossini', emailAddress: 'jon@gmail.com'},
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', emailAddress: 'jon@gmail.com'},
  ]

  return (
    <Container fluid className='users-container'>
      <Row>
        <Col xl={10} style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows}
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
