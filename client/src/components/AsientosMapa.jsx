import React, { useState } from 'react';
import './AsientosMapa.css';

const SeatMap = ({ onSeatSelect }) => {
    const totalSeats = 45;
    const unavailableSeats = [1, 44, 45]; // Asientos no disponibles
    const [selectedSeats, setSelectedSeats] = useState([]);

    const isSeatAvailable = (seatNumber) => !unavailableSeats.includes(seatNumber);
    const isSeatSelected = (seatNumber) => selectedSeats.includes(seatNumber);

    const handleSeatClick = (seatNumber) => {
        if (isSeatAvailable(seatNumber)) {
            setSelectedSeats((prevSelectedSeats) => {
                const newSelectedSeats = isSeatSelected(seatNumber)
                    ? prevSelectedSeats.filter((number) => number !== seatNumber)
                    : [...prevSelectedSeats, seatNumber];

                // Llamar a la función de selección de asientos
                onSeatSelect(newSelectedSeats);
                return newSelectedSeats

                // if (isSeatSelected(seatNumber)) {
                //     // Si ya está seleccionado, lo deseleccionamos
                //     return prevSelectedSeats.filter((number) => number !== seatNumber);
                // } else {
                //     // Si no está seleccionado, lo agregamos a los seleccionados
                //     return [...prevSelectedSeats, seatNumber];
                // }
            });
        }
    };

    // const totalPrice = selectedSeats.length * pricePerSeats

    // Imaginemos que tienes una función que se llama cuando se selecciona un asiento:
    const onSeatSelected = (seatNumber) => {
        // Logica para manejar la selección de asientos
        // ...
        // Luego informas al componente padre sobre la selección
        onSelectSeats(seatsSeleccionadosActualizados);
    };

    return (
        <div>
            <div className="bus-container">
                <div className="driver-seat">{!isSeatAvailable(1) && 'Conductor'}</div>
                <div className="seats">
                    {Array.from({ length: totalSeats - 1 }, (_, index) => index + 2)
                        .map((seatNumber) => (
                            <div
                                key={seatNumber}
                                className={`seat ${isSeatAvailable(seatNumber) ? 'available' : 'unavailable'} ${isSeatSelected(seatNumber) ? 'selected' : ''}`}
                                onClick={() => handleSeatClick(seatNumber)}
                            >
                                {seatNumber}
                            </div>
                        ))}
                </div>
                <div className="bathroom-seats">
                    {unavailableSeats.slice(1).map((seatNumber) => (
                        <div key={seatNumber} className="seat unavailable">{seatNumber}</div>
                    ))}
                </div>
            </div>

            {/* 
            {selectedSeats.length > 0 && (
                <div className="checkout-info">
                    <div>Terminal de salida: información de salida</div>
                    <div>Destino: información de destino </div>
                    <div>Asientos seleccionados: {selectedSeats.join(', ')}</div>
                    <div>Precio total: PEN {totalPrice.toFixed(2)}</div>
                    <button onClick={onContinue}>Siguiente</button>
                </div>
            )} */}
        </div>
    );
};

export default SeatMap;


