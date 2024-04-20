import React, { useState, useEffect } from 'react';
import { Card, Form, Col, Row, Button, Container } from 'react-bootstrap';
import { useStore } from "../store/apodLocalStore"

const Fetcher = () => {



  const {
    selectedForm,
    date, setDate,
    startDate, setStartDate,
    endDate, setEndDate,
    count, setCount,
    imageData, fetchError, loading,
    fetchData,
    setForm,
    resetDate
  } = useStore(state => ({
    selectedForm: state.selectedForm,
    date: state.date,
    setDate: state.setDate,
    startDate: state.startDate,
    setStartDate: state.setStartDate,
    endDate: state.endDate,
    setEndDate: state.setEndDate,
    count: state.count,
    setCount: state.setCount,
    imageData: state.imageData,
    fetchError: state.fetchError,
    loading: state.loading,
    fetchData: state.fetchData,
    setForm: state.setForm,
    resetDate : state.resetDate
  }));

  const { imageData2, fetchData2 } = useStore(state => ({
    imageData2: state.imageData,
    fetchData2: state.fetchData
  }));
  
  useEffect(() => {
      fetchData2();
    },[]);

  // useEffect(() => {
  //   fetchData();
  // }, [selectedForm, date, startDate, endDate, count, fetchData]);

  // useEffect(() => {
  //   if (date || (startDate && endDate) || count) {
  //     fetchData();
  //   }
  // }, [date, startDate, endDate, count]);

  useEffect(() => {
    // Clear state values when changing forms
    resetDate();
    setStartDate('');
    setEndDate('');
    setCount('');
  }, [selectedForm]); // This effect runs when selectedForm changes



  return (
    <Container>
      <Card className="mb-4" style={{ marginTop: '2rem', padding: '2rem' }}>
        <Row>
          <Col md={6}>
            {imageData[0] && imageData[0].media_type === "image" && (
              <Card.Img variant="top" src={imageData[0].url} alt="NASA APOD" />
            )}
          </Col>
          <Col md={6}>
            <Form>
              <Form.Group controlId="formSelection">
                <Form.Label>Select Form</Form.Label>
                <Form.Control as="select" onChange={e => setForm(e.target.value)} value={selectedForm}>
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
                      onChange={e => setDate(e.target.value)} value={date}
                    />
                  </Form.Group>
                  <Button onClick={() => { setStartDate(''); setEndDate(''); setCount('');fetchData(); }}>Fetch</Button>
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
                  <Button onClick={() => { setDate(''); setCount('');fetchData(); }}>Fetch</Button>
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
                  <Button onClick={() => { setDate(''); setStartDate(''); setEndDate('');fetchData(); }}>Fetch</Button>
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
                { item.url.toLowerCase().endsWith('.jpg') ? (
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

                  <b>Copyright :</b> {item.copyright}
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
