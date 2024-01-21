import React, { useState } from 'react';
import './Products.css';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx';
import { useCart } from '../hooks/useCart.js';
import AsientosMapa from './AsientosMapa.jsx'; // Importa tu componente de mapa de asientos


export function Products({ products }) {
    const { addToCart, removeFromCart, cart } = useCart();
    const [showAsientosMapa, setShowAsientosMapa] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const checkProductInCart = (product) => {
        return cart.some((item) => item._id === product._id);
    };

    const handleToggleAsientosMapa = () => {
        setShowAsientosMapa(!showAsientosMapa);
    };

    const handleToggleSelectedProduct = (product) => {
        // Si el producto seleccionado ya está en el carrito, no cambies el estado de selectedProduct
        if (!checkProductInCart(product)) {
            setSelectedProduct(product === selectedProduct ? null : product);
        }
    };

    return (
        <main className='products'>
            <table>
                <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Asientos</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Fecha Salida</th>
                        <th>Hora Salida</th>
                        <th>Hora Llegada</th>
                        <th>Tipo Servicio</th>
                        <th>Comprar</th>
                    </tr>
                </thead>
                <tbody>
                    {products.slice(0, 15).map(product => {
                        const isProductInCart = checkProductInCart(product);
                        return (
                            <tr key={product._id}>
                                <td>
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                    />
                                </td>
                                <td><strong>{product.title}</strong></td>
                                <td>{product.price}</td>
                                <td>{product.asientos_disponibles}</td>
                                <td>{product.origen}</td>
                                <td>{product.destino}</td>
                                {/* <td>{product.fecha_salida}</td> */}
                                <td>{product.fecha_salida ? product.fecha_salida.split('T')[0] : ''}</td>
                                <td>{product.hora_salida}</td>
                                <td>{product.hora_llegada}</td>
                                <td>{product.tipo_servicio}</td>

                                <td>
                                    <button
                                        style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }}
                                        onClick={() => {
                                            isProductInCart
                                                ? removeFromCart(product)
                                                : addToCart(product)

                                            // Si el producto está en el carrito, muestra/oculta el mapa de asientos
                                            if (isProductInCart) {
                                                handleToggleAsientosMapa();
                                            }

                                            // Selecciona/deselecciona el producto
                                            handleToggleSelectedProduct(product);

                                        }}
                                    >
                                        {isProductInCart
                                            ? <RemoveFromCartIcon />
                                            : <AddToCartIcon />
                                        }
                                    </button>

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Mostrar el mapa de asientos si showAsientosMapa es true */}
            {showAsientosMapa && <AsientosMapa />}


            {/* Mostrar detalles del producto seleccionado */}
            {selectedProduct && (
                <div>
                    <h2>Detalles del Producto Seleccionado</h2>
                    {/* Agrega aquí la presentación de detalles del producto */}
                    <p>Nombre: {selectedProduct.title}</p>
                    <p>Precio: {selectedProduct.price}</p>
                    {/* Agrega más detalles según tus necesidades */}
                </div>
            )}


        </main>
    );
}
