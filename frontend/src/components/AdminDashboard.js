import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [busSchedules, setBusSchedules] = useState([]);
    const [form, setForm] = useState({ movie_name: '', time: '', date: '', seat: '' });
    const [message, setMessage] = useState('');
    const [busBookings, setBusbookings] = useState([]);


    useEffect(() => {
        // Fetch bus schedules on component mount
        axios.get('http://localhost:4000/api/booking-schedules')
            .then(response => setBusSchedules(response.data))
            .catch(error => console.error('Error fetching movie schedules:', error));
    }, []);

    useEffect(() => {
        // Fetch bus schedules on component mount
        axios.get('http://localhost:4000/api/movie-bookings')
            .then(response => setBusbookings(response.data))
            .catch(error => console.error('Error fetching movie schedules:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/booking-schedules', form)
            .then(response => {
                setMessage(response.data.message);
                setBusSchedules([...busSchedules, form]); // Add new bus schedule to list
                setForm({ movie_name: '', time: '', date: '' , seat: '' });
            })
            .catch(error => setMessage('Error adding movie schedule.'));
    };


    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/api/booking-schedules/${id}`)
            .then(response => {
                setMessage(response.data.message);
                setBusSchedules(busSchedules.filter(schedule => schedule.id !== id)); // Remove deleted bus schedule from list
            })
            .catch(error => setMessage('Error deleting movie schedule.'));
    };




    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Add New Movie Schedule</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Movie Name" value={form.movie_name} onChange={(e) => setForm({ ...form, movie_name: e.target.value })} required />
                <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                <input type="number" placeholder="Seats" value={form.seat} onChange={(e) => setForm({ ...form, seat: e.target.value })} required />
                <button type="submit">Add Movie Schedule</button>
            </form>
            {message && <p>{message}</p>}

            <h3>Current Available Movie </h3>
            <table>
                <thead>
                    <tr>
                        <th>Movie Name</th>
                        <th>Time</th>
                        <th>Date</th>
                        
                        <th>Seat</th>
                        <th>Actions</th>
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
                                <button onClick={() => handleDelete(schedule.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Booking Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Movie name</th>
                        <th>Date</th>
                        <th>Seat</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {busBookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.User_name}</td>
                            <td>{booking.movie_name}</td>
                            <td>{booking.date}</td>
                            <td>{booking.seat}</td>
                        
        
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
