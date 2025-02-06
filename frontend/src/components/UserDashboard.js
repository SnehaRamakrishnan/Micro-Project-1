// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';

function UserDashboard() {
  const [busSchedules, setBusSchedules] = useState([]); // State for bus schedules
  const [message, setMessage] = useState(''); // State for user messages

  const location = useLocation();
  const email = location.state?.email;

  // Fetch bus schedules from the server
  useEffect(() => {
    // Fetch bus schedules on component mount
    axios.get('http://localhost:4000/api/booking-schedules')
        .then(response => setBusSchedules(response.data))
        .catch(error => console.error('Error fetching movie schedules:', error));
}, []);

  // Handle booking a bus
  const handleBookNow = async (movieId) => {
    axios.post('http://localhost:4000/api/book-movie',{email:email,movieId:movieId}).then((response)=>{
        console.log('done');
        setMessage('movie booked successfully');
    })
  };

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>

      {message && <p className="message">{message}</p>}

      <h2>Available Movies</h2>
      {busSchedules.length > 0 ? (
        <table className="booking-schedule">
          <thead>
            <tr>
              <th>Movie name</th>
              <th>Time</th>
              <th>Date</th>
            
              <th>Seat Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
                    {busSchedules.map((schedule, index) => (
                        <tr key={index}>
                            <td>{schedule.movie_name}</td>
                            <td>{schedule.time}</td>
                            <td>{schedule.date}</td>
                            
                            <td>{schedule.seat}</td>
                            <td>
                                <button onClick={() => handleBookNow(schedule.id)}>BOOK NOW</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
        </table>
      ) : (
        <p>Loading movie schedules...</p>
      )}
    </div>
  );
}

export default UserDashboard;
