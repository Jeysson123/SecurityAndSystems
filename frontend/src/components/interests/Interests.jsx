import React, { useState, useEffect, useRef } from 'react';
import './Styles.css';
import axios from "axios";


const Interests = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cubeRef = useRef(null);
  const [interest, setInterest] = useState({});


    useEffect(() => {
        const getInterests = async () => {
            const headers = {
                "Content-Type": "application/json"
            };
            try {
                const url = `http://localhost:5000/api/profile/content?type=interests`;
                const response = await axios.get(url, { headers });
                const interestList = response.data;
                for(let i = 1; i < 5; i++){
                  setInterest(interest => ({...interest, [`interest${i}`]: interestList[i-1]}));
                }
            } catch (error) {
                alert(error.message || "An error occurred");
            }
        };

        const intervalId = setInterval(() => {
          getInterests();
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startRotateX = rotateX;
    const startRotateY = rotateY;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      setRotateX(startRotateX + dx);
      setRotateY(startRotateY - dy);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    const cube = cubeRef.current;
    cube.style.setProperty('--rotateX', `${rotateX}deg`);
    cube.style.setProperty('--rotateY', `${rotateY}deg`);
  }, [rotateX, rotateY]);

  return (
    <div className="espacio">
      <div
        className="cubo"
        title='Arrastra el cubo!'
        ref={cubeRef}
        onMouseDown={handleMouseDown}
        style={{ cursor: 'grab' }}
      >
        <div className="frente"><p>{interest.interest1}</p></div>
        <div className="derecha"><p>{interest.interest2}</p></div>
        <div className="tracera"><p>{interest.interest3}</p></div>
        <div className="izquierda"><p>{interest.interest4}</p></div>
        <div className="tapa"></div>
        <div className="fondo"></div>
      </div>
    </div>
  );
};

export default Interests;
