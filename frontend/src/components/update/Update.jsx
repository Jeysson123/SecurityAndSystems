import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles.css';

const Update = (props) => {
  const [information, setInformation] = useState(["", ""]);
  const [about, setAbout] = useState("");
  const [interests, setInterests] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const {show} = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { 'Content-Type': 'application/json' };

        let response = await axios.get('http://localhost:5000/api/profile/content?type=information', { headers });
        setInformation(response.data);

        response = await axios.get('http://localhost:5000/api/profile/content?type=about', { headers });
        setAbout(response.data);

        response = await axios.get('http://localhost:5000/api/profile/content?type=interests', { headers });
        setInterests(response.data);

      } catch (error) {
        console.error(`Error fetching data: ${error.response ? error.response.data : error.message}`);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/profile/update', {
        information,
        about,
        interests,
      });
      setMessage(response.data);
      alert('Informacion Actualizada');
      show(false)
    } catch (error) {
    console.log(error)
      setMessage(`Error: ${error.response ? error.response.data : error.message}`);
    }
  };

  return (
    <div className="update-container">
      <h1>Actualizacion de Informacion</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="information">Informacion</label>
          <input
            type="text"
            id="information"
            value={information[0]}
            onChange={(e) => setInformation([e.target.value, information[1]])}
            placeholder="Title"
          />
          <input
            type="text"
            id="information-link"
            value={information[1]}
            onChange={(e) => setInformation([information[0], e.target.value])}
            placeholder="Image URL"
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">Sobre mi</label>
          <textarea
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="About text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="interests">Intereses</label>
          {interests.map((interest, index) => (
            <input
              key={index}
              type="text"
              value={interest}
              onChange={(e) => {
                const newInterests = [...interests];
                newInterests[index] = e.target.value;
                setInterests(newInterests);
              }}
              placeholder={`Interest ${index + 1}`}
            />
          ))}
        </div>
        <button type="submit">Actualizar</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Update;
