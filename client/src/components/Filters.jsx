import { useState, useId } from 'react'
import { useFilters } from '../hooks/useFilters.js'
//import { DateRangePicker } from "react-date-range-picker"
import DateRangePicker from "react-date-picker";

//import './Filters.css'




export function Filters() {

    const { filters, setFilters } = useFilters()
    const [minPrice, setMinPrice] = useState(0)  // state local
    const minPriceFilterId = useId()
    const origenFilterId = useId()
    const destinoFilterId = useId()
    const fechaSalidaFilterId = useId()


    //review this  
    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeOrigen = (event) => {
        setFilters(prevState => ({
            ...prevState,
            origen: event.target.value
        }))
    }

    const handleChangeDestino = (event) => {
        setFilters(prevState => ({
            ...prevState,
            destino: event.target.value
        }))
    }

    const handleFechaIda = (event) => {

        // const input = event.target;
        // const calendar = new DateRangePicker({
        //     input: input,
        //     format: "YYYY-MM-DD", // Ajusta el formato según tus necesidades
        // });

        // calendar.open();

        // calendar.onClose = (selectedDates) => {
        //     const fechaSeleccionada = selectedDates[0]; // Suponemos solo una fecha seleccionada
        //     // setFilters((prevState) => ({
        //     //     ...prevState,   
        //     //     fecha_salida: fechaSeleccionada,
        //     // }));
        // };
        const fechaFormatDateTime = event.target.value ? `${event.target.value}T00:00:00` : null;
        setFilters(prevState => ({
            ...prevState,
            fecha_salida: fechaFormatDateTime
        }))
    }
    return (
        <section className='filters'>
            <div>
                <label htmlFor={minPriceFilterId}>Precio minimo: </label>
                <input
                    type='range'
                    id={minPriceFilterId}
                    min='0'
                    max='200'
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                />
                <span>${filters.minPrice}</span>
            </div>

            <div>
                <label htmlFor={origenFilterId}>Origen</label>
                <select id={origenFilterId} onChange={handleChangeOrigen} >
                    <option value='all'>All</option>
                    <option value='Puno'>Puno</option>
                    <option value='Ancash'>Ancash</option>
                    <option value='Loreto'>Loreto</option>
                    <option value='Madre de Dios'>Madre de Dios</option>
                    <option value='Amazonas'>Amazonas</option>
                    <option value='Cusco'>Cusco</option>
                    <option value='Ica'>Ica</option>
                    <option value='Lima'>Lima</option>

                </select>
            </div>

            <div>
                <label htmlFor={destinoFilterId}>Destino</label>
                <select id={destinoFilterId} onChange={handleChangeDestino} >
                    <option value='all'>All</option>
                    <option value='Puno'>Puno</option>
                    <option value='Ancash'>Ancash</option>
                    <option value='Loreto'>Loreto</option>
                    <option value='Madre de Dios'>Madre de Dios</option>
                    <option value='Amazonas'>Amazonas</option>
                    <option value='Cusco'>Cusco</option>
                    <option value='Ica'>Ica</option>
                    <option value='Lima'>Lima</option>

                </select>
            </div>

            <div>
                <label htmlFor={fechaSalidaFilterId}>Fecha de ida</label>
                <input
                    type="date"
                    id={fechaSalidaFilterId}
                    placeholder="Fecha de ida"
                    onChange={handleFechaIda}
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                />
            </div>

        </section>
    )
}


