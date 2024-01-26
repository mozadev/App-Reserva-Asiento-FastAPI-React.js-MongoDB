import './Headers.css'

import { Filters } from './Filters.jsx'


export function Header() {
    // export function Header({ children }) {
    return (
        <header>
            <h1><center>Moza-Bus Viajes 🚌</center></h1>
            <Filters />
            {/* {children} */}
        </header>
    )
} 
