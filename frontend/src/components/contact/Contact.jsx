import React, { useState } from 'react';
import './Styles.css';

const Contact = () => {
  const [contactName, setContactName] = useState("");
  const [contactMail, setContactMail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (contactName.length < 3) {
      tempErrors.contactName = "Nombre debe tener al menos 3 caracteres.";
    }
    if (!contactMail.includes("@")) {
      tempErrors.contactMail = "Correo debe ser válido.";
    }
    if (contactMsg.length < 3) {
      tempErrors.contactMsg = "Mensaje debe tener al menos 3 caracteres.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      alert("Mensaje Enviado");
      setContactName("");
      setContactMail("");
      setContactMsg("");
      setErrors({});
    }
  };

  return (
    <div className="contact">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="contactName"
            id="contactName"
            placeholder="Nombre:"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className={errors.contactName ? 'error' : ''}
          />
          {errors.contactName && <span className="error-message">{errors.contactName}</span>}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="contactMail"
            id="contactMail"
            placeholder="Correo:"
            value={contactMail}
            onChange={(e) => setContactMail(e.target.value)}
            className={errors.contactMail ? 'error' : ''}
          />
          {errors.contactMail && <span className="error-message">{errors.contactMail}</span>}
        </div>
        <div className="form-group">
          <textarea
            name="contactMsg"
            id="contactMsg"
            placeholder="Cual es tu mensaje?"
            value={contactMsg}
            onChange={(e) => setContactMsg(e.target.value)}
            className={errors.contactMsg ? 'error' : ''}
          ></textarea>
          {errors.contactMsg && <span className="error-message">{errors.contactMsg}</span>}
        </div>
        <input type="submit" value="Contactar" />
      </form>
    </div>
  );
}

export default Contact;
