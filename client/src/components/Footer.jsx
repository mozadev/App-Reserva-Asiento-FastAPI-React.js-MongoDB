import { useCart } from '../hooks/useCart.js'
import { useFilters } from '../hooks/useFilters'
import './Footer.css'


export function Footer() {

    const { filters } = useFilters()
    const { cart } = useCart()
    return (

        <footer className='footer'>

            {/* {
                JSON.stringify(filters, null, 2)
            }

            {
                JSON.stringify(cart, null, 2)
            } */}
            {/* <h4>MetaBus Shop 🛒 —
                <span> ©2021 MetaBus Shop. All rights reserved.</span></h4>
            <h5> MetaBus & Ship</h5> */}
        </footer>
    )
}


