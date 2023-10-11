import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, Button, Card, Container, Form } from 'react-bootstrap';

const GetAllTrainShedules = () => {
  const [trains, setTrains] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    axios.get('http://localhost:57549/api/trains/getalltrains')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleDelete = (TrainID) => {
    axios.delete(`http://localhost:57549/api/trains/deletetrain/${TrainID}`)
      .then(response => {
        toast.success('Train successfully deleted!');
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Error deleting train. Please try again later.');
      });
  };

  const filteredTrains = trains.filter(train =>
    train.TrainNumber.toLowerCase().includes(searchQuery.toLowerCase())
    // Adjust this condition based on your specific search criteria
  );

  const currentItems = filteredTrains.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container className="my-5 text-center" style={{ paddingLeft: "250px", maxWidth: "900px" }}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '15px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
        <Card.Body>
          <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Train Schedules</Card.Title>
          <Form.Control
  type="text"
  placeholder="Search by Train Number"
  value={searchQuery}
  onChange={handleSearchChange}
  style={{ marginBottom: '10px' }}
/>
          <Table striped bordered hover style={{ marginTop: '20px', width: '75%' }} className="mx-auto" responsive>
            <thead>
              <tr style={{ fontSize: "17px", fontFamily: "Montserrat" }}>
                <th>Train ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(train => (
                <tr key={train.ID} style={{ fontFamily: "Onest" }}>
                  <td>{train.TrainNumber}</td>
                  <td>{train.TrainStatus}</td>
                  <td>
                    <Link to={`/view/${train.TrainID}`}>
                      <Button variant="warning" style={{ marginRight: '5px', color: 'white' }}><i className="fas fa-eye"></i></Button>
                    </Link>
                    <Link to={`/update/${train.TrainID}`}>
                      <Button variant="success" style={{ marginRight: '5px' }}><i className="fas fa-edit"></i></Button>
                    </Link>
                    <Button variant="danger" onClick={() => handleDelete(train.TrainID)} style={{ marginRight: '5px' }}>
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="pagination" style={{ textAlign: 'Right', margin: "20px", marginLeft: "40%" }}>
            <span
              onClick={() => currentPage > 1 && handlePagination(currentPage - 1)}
              className={currentPage === 1 ? 'disabled' : ''}
              style={{ margin: "0 5px", cursor: "pointer" }}
            >
              &#8249;  {/* Left arrow */}
            </span>

            {Array.from({ length: Math.ceil(filteredTrains.length / itemsPerPage) }).map((_, index) => (
              <span
                key={index}
                onClick={() => handlePagination(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
                style={{ margin: "0 5px", cursor: "pointer" }}
              >
                {index + 1}
              </span>
            ))}

            <span
              onClick={() => currentPage < Math.ceil(filteredTrains.length / itemsPerPage) && handlePagination(currentPage + 1)}
              className={currentPage === Math.ceil(filteredTrains.length / itemsPerPage) ? 'disabled' : ''}
              style={{ margin: "0 5px", cursor: "pointer" }}
            >
              &#8250;  {/* Right arrow */}
            </span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GetAllTrainShedules;