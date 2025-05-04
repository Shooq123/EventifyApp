// Components/Events.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "reactstrap";

const Events = () => {
  const [events, setEvents] = useState([]);

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

  const bookEvent = async (eventId) => {
    try {
      const userId = "exampleUserId"; // Replace with actual user ID
      await axios.post("http://localhost:3001/api/events/bookEvent", { eventId, userId });
      alert("Event booked successfully!");
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  return (
    <div>
      <h1>Events</h1>
      {events.map(event => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>Location: {event.location}</p>
          <p>Price: ${event.price}</p> {/* Display price */}
          <p>Type: {event.type}</p> {/* Display type */}
          <Button onClick={() => bookEvent(event._id)}>Book Event</Button>
        </div>
      ))}
    </div>
  );
};

export default Events;