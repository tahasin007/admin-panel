import './Home.scss'
import { Container, Row, Col, Card } from 'react-bootstrap'

const Home = () => {
  return (
    <Container fluid className='home-container'>
      <Row className='card-container'>
        <Col lg={4} md={6}>
          <Card>
            <Card.Body>
              <Card.Subtitle className='mb-2 text-dark'>
                Employees
              </Card.Subtitle>
              <Card.Title className='text-dark'>100</Card.Title>
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
              <Card.Title className='text-dark'>$1,500</Card.Title>
              <Card.Text className='text-dark'>
                Compared to last month
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
