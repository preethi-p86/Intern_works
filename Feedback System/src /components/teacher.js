import React, { useState } from 'react';
import { Form, Button, Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import waveImage from '../assets/wave-bg.svg'; // 🖼️ adjust path & name accordingly

const subjects = [
  { code: "16MDS41", name: "NLP" },
  { code: "16MDS42", name: "SHP" },
  { code: "16MDS43", name: "LLM" },
  { code: "16MDS44", name: "Statistics" },
  { code: "16MDS45", name: "Subject" },
  { code: "16MDS11", name: "NLP Lab" },
  { code: "16MDS13", name: "SHP Lab" },
  { code: "16MDS19", name: "LLM Laboratory" }
];

const electives = [
  "16MDS47 - Image Processing",
  "16MDS54 - Web Scraping",
  "16MDS51 - React JS"
];

const teachers = [
  "Dr. Velvadivu", "Dr. Kalai", "Mrs. Alagu P",
  "Dr. Preethi PA", "Dr. Abinaya P",
  "Mr. Rakesh", "Ms. Ananthi", "Mr. Kailash"
];

const TeacherSelection = () => {
  const [selections, setSelections] = useState({});
  const [elective, setElective] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (code, value) => {
    setSelections(prev => ({ ...prev, [code]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.keys(selections).length !== subjects.length ||
      !Object.values(selections).every(val => val) ||
      !elective
    ) {
      setError("Please fill in all the fields before proceeding.");
      return;
    }

    localStorage.setItem('teacherSelections', JSON.stringify({ subjects: selections, elective }));
    navigate('/feedback');
  };

  return (
    <div style={{
      backgroundImage: `url(${waveImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <Container>
        <Card className="p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
          <Card.Title className="mb-4">Choose your teacher for your respective subjects</Card.Title>
          <Form onSubmit={handleSubmit}>
            {subjects.map(({ code, name }) => (
              <Form.Group as={Row} className="mb-3" key={code}>
                <Form.Label column sm={4}>
                  {code} - {name}
                </Form.Label>
                <Col sm={8}>
                  <Form.Select
                    value={selections[code] || ''}
                    onChange={e => handleChange(code, e.target.value)}
                    required
                  >
                    <option value="">-- Select Teacher --</option>
                    {teachers.map((teacher, i) => (
                      <option key={i} value={teacher}>{teacher}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
            ))}

            <hr />

            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm={4}><strong>Select Elective</strong></Form.Label>
              <Col sm={8}>
                <Form.Select
                  value={elective}
                  onChange={e => setElective(e.target.value)}
                  required
                >
                  <option value="">-- Choose Elective --</option>
                  {electives.map((subj, i) => (
                    <option key={i} value={subj}>{subj}</option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button type="submit" variant="primary">Proceed to Feedback</Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default TeacherSelection;
