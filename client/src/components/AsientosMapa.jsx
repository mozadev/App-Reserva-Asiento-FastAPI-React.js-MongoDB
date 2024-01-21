import React from 'react';
import './AsientosMapa.css'; // Asegúrate de que el archivo CSS está en el mismo directorio que este componente

const SeatMap = () => {
    // Definir las filas y la cantidad de asientos por fila
    const seatRows = {
        0: [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45],
        1: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46],
        2: [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43],
        3: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44]
    };

    return (
        <div className="seat-map">
            {Object.values(seatRows).map((row, index) => (
                <div key={index} className="seat-row">
                    {row.map(seatNumber => (
                        <div key={seatNumber} className="seat">{seatNumber}</div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SeatMap;

