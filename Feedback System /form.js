import React, { useState } from 'react';
import { Card, Container, Form, Row, Col, Button, Alert, Table } from 'react-bootstrap';
import waveImage from '../assets/wave-bg.svg';

function FeedbackForm() {
  const [displayform, setDisplay] = useState(true);
  const [teacherName, setTeacherName] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [error_msg, setErrorMsg] = useState('');
  const [responses, setResponses] = useState({});

  const questions = {
    q1: "The syllabus clearly explains the key technical concepts required.",
    q2: "The syllabus matches well with the stated learning objectives.",
    q3: "There is a good balance between theoretical and practical aspects.",
    q4: "The syllabus covers current, relevant engineering topics effectively.",
    q5: "Projects, internships, or research work enhance the syllabus content.",
    q6: "Evaluation methods are fair, transparent, and easy to understand.",
    q7: "Syllabus encourages critical thinking and real-world problem solving.",
    q8: "Faculty have flexibility to use innovative teaching methods.",
    q9: "Resources and infrastructure support the syllabus delivery well."
  };

  const setNames = [
    "16MDS41", "16MDS42", "16MDS43", "16MDS44",
    "16MDS45", "16MDS11", "16MDS13", "16MDS19"
  ];

  const designationOptions = ["Assistant Professor", "Associate Professor", "Head of Department"];
  const departmentOptions = [
    "B.E. ECE", "B.E. EEE", "B.E. Mechanical", "B.E. Chemical",
    "B.Tech IT", "B.E. CSE", "M.Sc. Software Systems", "M.Sc. Data Science",
    "M.Sc. Decision and Computing Science", "M.Sc. AIML"
  ];

  const handleResponseChange = (qKey, setIdx, value) => {
    setResponses(prev => ({
      ...prev,
      [qKey]: {
        ...prev[qKey],
        [setNames[setIdx]]: value
      }
    }));
  };

  const validateForm = () => {
    if (!teacherName.trim() || !designation || !department || !email.trim()) return false;
    if (!email.includes('@') || !email.includes('.')) return false;
    if (Object.keys(responses).length < Object.keys(questions).length) return false;
    return true;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let existingEntries = JSON.parse(localStorage.getItem("syllabusFeedback")) || [];
      const newEntry = {
        id: existingEntries.length,
        teacherName,
        designation,
        department,
        email,
        responses,
        recommendations
      };
      existingEntries.push(newEntry);
      localStorage.setItem("syllabusFeedback", JSON.stringify(existingEntries));
      setDisplay(false);
    } else {
      setErrorMsg('Please fill all required fields correctly before submitting.');
    }
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

      {/* Main content */}
      <Container className="py-5">
        {displayform ? (
          <Card className="p-4 shadow-lg">
            <Card.Title className="mb-4">Syllabus Feedback Form</Card.Title>
            <Form onSubmit={formSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="teacherName">
                    <Form.Label>Teacher Name <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      value={teacherName}
                      onChange={e => setTeacherName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="designation">
                    <Form.Label>Designation <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      value={designation}
                      onChange={e => setDesignation(e.target.value)}
                      required
                    >
                      <option value="">-- Select Designation --</option>
                      {designationOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="department">
                    <Form.Label>Department <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      value={department}
                      onChange={e => setDepartment(e.target.value)}
                      required
                    >
                      <option value="">-- Select Department --</option>
                      {departmentOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <hr />

              <div style={{ overflowX: 'auto' }}>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th rowSpan="2" style={{ minWidth: '250px' }}>Question</th>
                      {setNames.map((setName, idx) => (
                        <th key={idx} colSpan={5} className="text-center">{setName}</th>
                      ))}
                    </tr>
                    <tr>
                      {setNames.flatMap(() =>
                        [5, 4, 3, 2, 1].map(score => (
                          <th key={Math.random()} className="text-center">{score}</th>
                        ))
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(questions).map(([qKey, question], qIdx) => (
                      <tr key={qKey}>
                        <td style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                          {qIdx + 1}. {question}
                        </td>
                        {setNames.flatMap((setName, setIdx) =>
                          [5, 4, 3, 2, 1].map(score => {
                            const fieldId = `${qKey}-${setName}-score${score}`;
                            return (
                              <td key={fieldId} className="text-center">
                                <Form.Check
                                  type="radio"
                                  name={`${qKey}-${setName}`}
                                  value={score}
                                  checked={responses[qKey]?.[setName] === String(score)}
                                  onChange={e => handleResponseChange(qKey, setIdx, e.target.value)}
                                  id={fieldId}
                                />
                              </td>
                            );
                          })
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <hr />

              <Form.Group className="mb-4">
                <Form.Label>
                  <strong>10. What specific areas of improvement or modifications would you recommend for revising the syllabi?</strong>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={recommendations}
                  onChange={e => setRecommendations(e.target.value)}
                  placeholder="Your suggestions here..."
                  required
                />
              </Form.Group>

              {error_msg && (
                <Alert variant="danger" className="mt-3">{error_msg}</Alert>
              )}

              <Button variant="primary" type="submit">Submit Feedback</Button>
            </Form>
          </Card>
        ) : (
          <Card className="text-center p-5">
            <h4>Thank you for your feedback!</h4>
            <p>We appreciate your valuable input towards improving our syllabi.</p>
            <Button variant="success" onClick={() => window.location.reload()}>Submit Another Response</Button>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default FeedbackForm;
