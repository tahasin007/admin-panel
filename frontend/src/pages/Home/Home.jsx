import './Home.scss'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Meta from '../../components/Meta/Meta'
import Chart from '../../components/Charts/Chart'
import { employeedata } from '../../data/activeEmployee'
import { ArrowUpward, ArrowDownward } from '@material-ui/icons'

const Home = () => {
  return (
    <>
      <Meta title={'Home Page'} />
      <Container fluid className='home-container'>
        <Row className='card-container'>
          <Col lg={4} md={6}>
            <Card>
              <Card.Body>
                <Card.Subtitle className='mb-2 text-dark'>
                  Employees
                </Card.Subtitle>
                <Card.Title className='text-dark'>
                  100
                  <span className='m-2' style={{ fontSize: '.9rem' }}>
                    {' '}
                    +12% <ArrowUpward style={{ color: '#4A8551' }} />
                  </span>
                </Card.Title>
                <Card.Text className='text-dark'>
                  Compared to last month
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6}>
            <Card>
              <Card.Body>
                <Card.Subtitle className='mb-2 text-dark'>
                  Revanue
                </Card.Subtitle>
                <Card.Title className='text-dark'>
                  $1,500
                  <span className='m-2' style={{ fontSize: '.9rem' }}>
                    {' '}
                    -2% <ArrowDownward style={{ color: 'rgb(153, 51, 51)' }} />
                  </span>
                </Card.Title>
                <Card.Text className='text-dark'>
                  Compared to last month
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className='justify-content-center mt-4'>
          <Col>
            <Chart
              data={employeedata}
              title='Employee Analytics'
              grid
              dataKey='Active Employee'
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
