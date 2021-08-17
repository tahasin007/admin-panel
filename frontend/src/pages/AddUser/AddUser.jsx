import { useState } from 'react'
import './AddUser.scss'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import * as yup from 'yup'

const AddUser = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setAddressEmail] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
  }

  let schema = yup.object().shape({
    firstName: yup
      .string()
      .min(3, '*First Name must have at least 2 characters')
      .max(10, "*First Name can't be longer than 10 characters")
      .required(),
    lastName: yup
      .string()
      .min(3, '*Last Name must have at least 2 characters')
      .max(10, "*Last Name can't be longer than 10 characters")
      .required(),
    emailAddress: yup
      .string()
      .email('*Must be a valid email address')
      .required('*Email is required'),
  })

  return (
    <Container fluid className='adduser-container'>
      <Row className='justify-content-center'>
        <Col lg={9} md={7} sm={8} className='form-wrapper'>
          <Form className='form-container' onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='formGroupFirstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formGroupLastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formGroupEmail'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={emailAddress}
                onChange={(e) => setAddressEmail(e.target.value)}
              />
            </Form.Group>
            <Row className='justify-content-end mr-1'>
              <Button variant='primary' type='submit'>
                Add User
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default AddUser
