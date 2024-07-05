import React, { useEffect, useState } from "react";
import axios from "axios";
import './Styles.css';

const About = () => {
  const [fact, setFact] = useState('');

  useEffect(() => {
      const getAbout = async () => {
          const headers = {
              "Content-Type": "application/json"
          };
          try {
              const url = `http://localhost:5000/api/profile/content?type=about`;
              const response = await axios.get(url, { headers });
              const [ab] = response.data;
              setFact(ab);
          } catch (error) {
              alert(error.message || "An error occurred");
          }
      };

      const intervalId = setInterval(() => {
          getAbout();
      }, 3000);

      return () => clearInterval(intervalId);
  }, []);
  return (
    <p>{fact}</p>
  );
}

export default About;