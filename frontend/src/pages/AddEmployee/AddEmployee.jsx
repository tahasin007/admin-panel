import './AddEmployee.scss'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Publish } from '@material-ui/icons'
import { Tooltip, Zoom } from '@material-ui/core'
import axios from 'axios'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import { Link } from 'react-router-dom'
import Meta from '../../components/Meta/Meta'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { options } from '../../constants/constants'

const AddEmployee = ({ history }) => {
  const [infoMessage, setinfoMessage] = useState(null)
  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(3, '*First Name must have at least 3 characters')
      .max(10, "*First Name can't be longer than 10 characters")
      .required('*First Name is required'),
    lastName: yup
      .string()
      .min(3, '*Last Name must have at least 3 characters')
      .max(10, "*Last Name can't be longer than 10 characters")
      .required('*Last Name is required'),
    emailAddress: yup
      .string()
      .email('*Must be a valid email address')
      .required('*Email is required'),
  })

  const toastHandler = () => {
    toast.info(infoMessage, options)
    setinfoMessage(null)
  }

  return (
    <>
      <Meta title={'Add Employee'} />
      {infoMessage ? toastHandler() : ''}
      <Container fluid className='adduser-container'>
        <Row className='justify-content-center'>
          <Col lg={9} md={7} sm={8} className='form-wrapper'>
            <Formik
              initialValues={{ firstName: '', lastName: '', emailAddress: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                actions.setSubmitting(true)
                axios
                  .post('/api/users', values)
                  .then((res) => {
                    // console.log(res.data)
                    actions.setSubmitting(false)
                    actions.resetForm()
                    setinfoMessage(res.data.message)
                    // history.push('/users')
                  })
                  .catch((error) => {
                    actions.setSubmitting(false)
                    actions.resetForm()
                  })
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form className='form-container' onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='formGroupFirstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='First Name'
                      name='firstName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      className={
                        touched.firstName && errors.firstName ? 'error' : null
                      }
                    />
                    {touched.firstName && errors.firstName ? (
                      <ErrorMessage message={errors.firstName} />
                    ) : null}
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formGroupLastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Last Name'
                      name='lastName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      className={
                        touched.lastName && errors.lastName ? 'error' : null
                      }
                    />
                    {touched.lastName && errors.lastName ? (
                      <ErrorMessage message={errors.lastName} />
                    ) : null}
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formGroupEmail'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter Email'
                      name='emailAddress'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.emailAddress}
                      className={
                        touched.emailAddress && errors.emailAddress
                          ? 'error'
                          : null
                      }
                    />
                    {touched.emailAddress && errors.emailAddress ? (
                      <ErrorMessage message={errors.emailAddress} />
                    ) : null}
                  </Form.Group>
                  <Row className='justify-content-end mr-1'>
                    <Button variant='primary btn-style' type='submit'>
                      Add Employee
                    </Button>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
          <Col sm={4} lg={3} className='button-container'>
            <Row className='justify-content-center'>
              <Tooltip
                TransitionComponent={Zoom}
                title='Add Multiple Employees'
                arrow
              >
                <Link to='/uploadcsv'>
                  <Button variant='primary'>
                    <Publish className='mr-2' />
                    Upload CSV
                  </Button>
                </Link>
              </Tooltip>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AddEmployee
