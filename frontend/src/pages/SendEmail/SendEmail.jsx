import './SendEmail.scss'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import * as yup from 'yup'
import { Formik } from 'formik'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Send } from '@material-ui/icons'

const SendEmail = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/users').then((res) => {
      setUsers(res.data)
    })
  }, [])

  yup.addMethod(yup.mixed, 'employeeExist', function (errorMessage) {
    let emails = []
    let emailsfound = []
    return this.test(`test-email`, errorMessage, function (value) {
      const { path, createError } = this
      if (value) {
        emails = value ? value.split(',') : ''
        emailsfound = emails.filter((email) => {
          return users.filter((user) => user.emailAddress === email.trim())
            .length > 0
            ? 1
            : 0
        })
      }
      //   let found = users.filter((user) => user.emailAddress === email).length > 0
      if (emails.length > emailsfound) {
        createError({ path, message: 'Null' })
      }
      return (
        emails.length === emailsfound.length ||
        createError({ path, message: errorMessage })
      )
    })
  })

  const validationSchema = yup.object().shape({
    emailAddress: yup
      .string()
      .required('*Email Address is required')
      .employeeExist('*Employee Email Address does not exist'),
    emailSubject: yup.string().required('*Subject is required'),
    emailBody: yup.string().required("*Email Body can't be empty"),
  })

  return (
    <Container fluid className='mail-container'>
      <Row className='justify-content-center'>
        <Col lg={9} md={7} sm={8} className='mail-wrapper'>
          <Formik
            initialValues={{
              emailAddress: '',
              emailSubject: '',
              emailBody: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true)
              axios
                .post('http://localhost:5000/api/users/mail', values)
                .then((res) => {
                  actions.setSubmitting(false)
                  actions.resetForm()
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
                <Form.Group className='mb-3' controlId='formGroupEmailAddress'>
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Email Address'
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
                <Form.Group className='mb-3' controlId='formGroupSubject'>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Subject'
                    name='emailSubject'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emailSubject}
                    className={
                      touched.emailSubject && errors.emailSubject
                        ? 'error'
                        : null
                    }
                  />
                  {touched.emailSubject && errors.emailSubject ? (
                    <ErrorMessage message={errors.emailSubject} />
                  ) : null}
                </Form.Group>
                <Form.Group className='mb-3' controlId='formGroupEmailBody'>
                  <Form.Label>Email Body</Form.Label>
                  <Form.Control
                    as='textarea'
                    name='emailBody'
                    style={{ height: '150px' }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emailBody}
                    className={
                      touched.emailBody && errors.emailBody ? 'error' : null
                    }
                  />
                  {touched.emailBody && errors.emailBody ? (
                    <ErrorMessage message={errors.emailBody} />
                  ) : null}
                </Form.Group>
                <Row className='justify-content-end mr-1'>
                  <Button variant='primary btn-style' type='submit'>
                    Send Mail <Send className='ml-2' />
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  )
}

export default SendEmail
