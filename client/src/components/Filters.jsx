import { useState, useId } from 'react'
import { useFilters } from '../hooks/useFilters.js'
import './Filters.css'


export function Filters() {

    const { filters, setFilters } = useFilters()
    const [minPrice, setMinPrice] = useState(0)  // state local
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    //review this  
    const handleChangeMinPrice = (event) => {

        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {

        // review this as well
        // we stay set to native state actualization function  of react to a component children
        // we need something more concrete to update the state of the parent component   
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
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
                    max='100'
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                />
                <span>${filters.minPrice}</span>
            </div>

            <div>
                <label htmlFor={categoryFilterId}>Category</label>
                <select id={categoryFilterId} onChange={handleChangeCategory} >
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
        </section>
    )
}