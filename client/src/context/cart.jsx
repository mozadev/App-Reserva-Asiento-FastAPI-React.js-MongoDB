import { createContext, useState } from 'react';

// 1. create context
export const CartContext = createContext();

// 2. create provider

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    const addToCart = product => {
        // check if product is already in cart, other form is con map and slice(more fast)
        // not use spread operator because is not a good practice copy superficially
        const productInCartIndex = cart.findIndex(item => item._id === product._id)

        if (productInCartIndex >= 0) {
            // a new form would be using structuredClone
            const newCart = structuredClone(cart)
            newCart[productInCartIndex].quantity += 1
            return setCart(newCart)
        }
        // product is not in cart
        setCart(prevState => ([
            ...prevState,
            {
                ...product,
                quantity: 1
            }
        ]))
    }

    const removeFromCart = product => {
        setCart(prevState => prevState.filter(item => item._id !== product._id))

    }


    const clearCart = () => {
        setCart([])
    }


    return (
        <CartContext.Provider value={{

            cart,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}


