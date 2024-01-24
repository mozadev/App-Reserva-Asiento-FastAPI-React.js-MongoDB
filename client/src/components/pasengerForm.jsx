
import React, { useState } from 'react';
import './pasengerForm.css';

const PassengerForm = ({ selectedSeats }) => {
    const [passengerInfo, setPassengerInfo] = useState({});
    const [contactDetails, setContactDetails] = useState({});
    const isSinglePassenger = selectedSeats.length === 1;



    const handlePassengerChange = (index, e) => {
        const newPassengerInfo = { ...passengerInfo };
        newPassengerInfo[index] = {
            ...newPassengerInfo[index],
            [e.target.name]: e.target.value,
        };
        setPassengerInfo(newPassengerInfo);
    };

    const handleContactChange = (e) => {
        setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        // Aquí manejarías la lógica para procesar o almacenar la información del formulario
        console.log('Información del pasajero:', passengerInfo);
        console.log('Detalles de contacto:', contactDetails);
        // Aquí redirigirías al usuario al siguiente paso, por ejemplo, a la página de pago
    };

    return (
        <div className="passenger-form">
            {Array.from({ length: selectedSeats.length }, (_, index) => (
                <div key={index}>
                    <h3>Pasajero {index + 1}</h3>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Nombre"
                        onChange={(e) => handlePassengerChange(index, e)}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Apellido"
                        onChange={(e) => handlePassengerChange(index, e)}
                    />
                    {/* Más campos según necesites */}
                </div>
            ))}
            <h3>Detalles de contacto</h3>
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleContactChange}
            />
            <input
                type="text"
                name="phone"
                placeholder="Celular"
                onChange={handleContactChange}
            />
            {/* Más campos de contacto si son necesarios */}

            <div className="button-container">
                <button className='button-red' onClick={handleSubmit}>Realizar pago</button>
            </div>


        </div>
    );
};

export default PassengerForm;
