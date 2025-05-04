import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import art from "../Images/art.jpg";
import night from "../Images/night.jpg";

const Home = () => {
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1); // Default to 1 ticket
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
    setTicketQuantity(1); // Reset ticket quantity when modal is closed
  };

  const handleBookNow = (event) => {
    setSelectedEvent(event);
    toggleModal();
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const taxRate = 0.1; // 10% tax
    const ticketPrice = selectedEvent.price * ticketQuantity;
    const taxAmount = ticketPrice * taxRate;
    const totalAmount = ticketPrice + taxAmount;

    try {
      // Payment logic goes here
      alert(`Payment processed for ${ticketQuantity} tickets of ${selectedEvent.title} for a total of $${totalAmount.toFixed(2)}`);
      toggleModal(); // Close the modal after payment
    } catch (err) {
      setError('Payment failed.'); // Handle payment errors
    }
  };

  return (
    <div className="home-container">

      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <p>No events available at the moment</p>
      ) : (
        events.map((event, index) => (
          <div key={event._id} className="event-card">
            {index === 0 && (
              <img src={night} alt={event.title} className="event-image" />
            )}
            {index === 1 && (
              <img src={art} alt={event.title} className="event-image" />
            )}
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
            <p>Price: ${event.price}</p>
            <p>Type: {event.type}</p>
            <Button className="book-button" onClick={() => handleBookNow(event)}>Book Now</Button>
          </div>
        ))
      )}

      {/* Modal for booking details */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Booking Details</ModalHeader>
        <ModalBody>
          {selectedEvent && (
            <>
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.description}</p>
              <p>Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p>Location: {selectedEvent.location}</p>
              <p>Price per ticket: ${selectedEvent.price}</p>
              <div className="form-group">
                <label>Number of Tickets</label>
                <input
                  type="number"
                  value={ticketQuantity}
                  onChange={(e) => setTicketQuantity(Math.max(1, e.target.value))}
                  min="1"
                  required
                />
              </div>
              <p>Total Price (including tax): ${(selectedEvent.price * ticketQuantity * 1.1).toFixed(2)}</p>
            </>
          )}
          <form onSubmit={handlePayment}>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
            {error && <div className="error">{error}</div>}
            <Button type="submit" color="primary">Pay Now</Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Home;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "reactstrap";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import art from "../Images/art.jpg";
// import night from "../Images/night.jpg";

// const Home = () => {
//   const email = useSelector((state) => state.users.user.email);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!email) {
//       navigate("/login");
//     }
//   }, [email, navigate]);

//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/events");
//         setEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <div className="home-container">
//       <p className="appTitle">Discover and book amazing events happening near you</p>

//       <h1>Upcoming Events</h1>
//       {events.length === 0 ? (
//         <p>No events available at the moment</p>
//       ) : (
//         events.map((event ,index)=> (
//           <div key={event._id} className="event-card">
//              {index === 0 && (
//             <img src={night} alt={event.title} className="event-image" />
//           )}
//             {index === 1 && (
//             <img src={art} alt={event.title} className="event-image" />
//           )}
//             <h3>{event.title}</h3>
//             <p>{event.description}</p>
//             <p>Date: {new Date(event.date).toLocaleDateString()}</p>
//             <p>Location: {event.location}</p>
//             <p>Price: ${event.price}</p>
//             <p>Type: {event.type}</p>
//             <Button className="book-button" onClick={() => alert(`Booking ${event.title}`)}>Book Now</Button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Home;