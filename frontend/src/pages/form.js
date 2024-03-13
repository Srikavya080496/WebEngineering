import React, { useState, useEffect } from 'react';
import { Card, Form, Col, Row, Button, Container } from 'react-bootstrap';

const Fetcher = () => {
    const formatDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
      };
    
      const today = formatDate(new Date());
  const [selectedForm, setSelectedForm] = useState('byDate');
  const [date, setDate] = useState(today);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [count, setCount] = useState('');
  const [imageData, setImageData] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const fetchData = async () => {
    try {
      let url = 'https://api.nasa.gov/planetary/apod?api_key=rg6gbzupnDax7xQry6XXVr68bdcU5CHJS57hhGfd&';

      if (date) {
        url += `date=${date}`;
      } else if (startDate && endDate) {
        url += `start_date=${startDate}&end_date=${endDate}`;
      } else if (count) {
        url += `count=${count}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      if (Array.isArray(data)) {
        setImageData(data);
      } else {
        setImageData([data]); // Ensure imageData is always an array for consistent mapping
      }
    } catch (error) {
      setFetchError('Failed to fetch data');
    }
  };
  

  useEffect(() => {
    if (date || (startDate && endDate) || count) {
      fetchData();
    }
  }, [date, startDate, endDate, count]);
  useEffect(() => {
    // Clear state values when changing forms
    setDate(today); // Reset to today for 'byDate'
    setStartDate('');
    setEndDate('');
    setCount('');
  }, [selectedForm]); // This effect runs when selectedForm changes

  

  return (
    <Container>
      <Card className="mb-4" style={{marginTop:'2rem',padding:'2rem'}}>
        <Row>
          <Col md={6}>
            {imageData[0] && imageData[0].media_type==="image" &&(
              <Card.Img variant="top" src={imageData[0].url} alt="NASA APOD" />
            )}
          </Col>
          <Col md={6}>
            <Form>
              <Form.Group controlId="formSelection">
                <Form.Label>Select Form</Form.Label>
                <Form.Control as="select" onChange={e => setSelectedForm(e.target.value)} value={selectedForm}>
                  <option value="">Select...</option>
                  <option value="byDate">By Date</option>
                  <option value="byRange">By Date Range</option>
                  <option value="byCount">By Count</option>
                </Form.Control>
              </Form.Group>

              {selectedForm === 'byDate' && (
                <>
                  <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={e => setDate(e.target.value) } value={date}
                    />
                  </Form.Group>
                  <Button onClick={() => { setStartDate(''); setEndDate(''); setCount(''); }}>Fetch</Button>
                </>
              )}

              {selectedForm === 'byRange' && (
                <>
                  <Form.Group controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={e => setStartDate(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="endDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={e => setEndDate(e.target.value)}
                    />
                  </Form.Group>
                  <Button onClick={() => { setDate(''); setCount(''); }}>Fetch</Button>
                </>
              )}

              {selectedForm === 'byCount' && (
                <>
                  <Form.Group controlId="count">
                    <Form.Label>Count</Form.Label>
                    <Form.Control
                      type="number"
                      onChange={e => setCount(e.target.value)}
                    />
                  </Form.Group>
                  <Button onClick={() => { setDate(''); setStartDate(''); setEndDate(''); }}>Fetch</Button>
                </>
              )}
            </Form>
          </Col>
        </Row>
      </Card>

      <Row xs={1} md={2} lg={3} className="g-4">
        {imageData.map((item, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                {item.media_type === "image" ? (
                  <Card.Img variant="top" src={item.url} />
                ) : (
                  <iframe title={item.title} src={item.url} frameBorder="0" allowFullScreen></iframe>
                )}
                <Card.Text>
                  {item.explanation}
                  <br></br>
                  <b>hdurl:</b> <a href={item.hdurl}>{item.hdurl}</a>
                  <br></br>
                  <b>version:</b> {item.version}
                  <br></br>
                  <b>date:</b> {item.date}
                </Card.Text>
                {item.copyright && <footer className="blockquote-footer">
                
                <b>Copyright :</b> { item.copyright}
                </footer>}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Fetcher;
