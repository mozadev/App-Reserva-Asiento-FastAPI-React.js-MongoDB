import React, { useState } from 'react';
import './AsientosMapa.css';

const SeatMap = ({ rows, seatsPerRow }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeatSelection = (seatId) => {
        setSelectedSeats(prevSelectedSeats => {
            if (prevSelectedSeats.includes(seatId)) {
                return prevSelectedSeats.filter(id => id !== seatId);
            } else {
                return [...prevSelectedSeats, seatId];
            }
        });
    };

    const isSeatSelected = (seatId) => {
        return selectedSeats.includes(seatId);
    };

    const generateSeats = () => {
        return rows.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
                {seatsPerRow.map((seatNumber) => {
                    const seatId = `${rowIndex}-${seatNumber}`;
                    const isSelected = isSeatSelected(seatId);
                    return (
                        <div
                            key={seatId}
                            className={`seat ${isSelected ? 'selected' : ''}`}
                            onClick={() => toggleSeatSelection(seatId)}
                        >
                            {seatNumber}
                        </div>
                    );
                })}
            </div>
        ));
    };

    return (
        <div className="seat-map">
            {generateSeats()}
        </div>
    );
};

export default SeatMap;
