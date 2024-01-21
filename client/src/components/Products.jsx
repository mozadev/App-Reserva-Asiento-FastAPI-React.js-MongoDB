import React, { useState } from 'react';
import './Products.css';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx';
import { useCart } from '../hooks/useCart.js';
import SeatMap from './AsientosMapa.jsx';

export function Products({ products }) {
    const { addToCart, removeFromCart, cart } = useCart();
    const [showAsientosMapa, setShowAsientosMapa] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const checkProductInCart = (product) => {
        return cart.some((item) => item._id === product._id);
    };

    // la primera vez cuando se invoca con la lista completa es false  showAsientosMapa cuando se invoca dando click muestra porque se convierte en verdadero
    // pero tenermos que volverlo a poner en false para que la segunda vez que se invoque desde la lista completa se vuelva a pintar
    const handleToggleAsientosMapa = () => {
        setShowAsientosMapa(!showAsientosMapa);
        if (showAsientosMapa) {
            setShowAsientosMapa(showAsientosMapa);
        }
    };

    const handleToggleSelectedProduct = (product) => {

        // la primera vez que se carga la página.se filtra un producto no esta en el carrito porque esta dentro del boton esta check. es false, se vuelve verd
        // como el producto es un item y selected product int this moment es null entonces no son iguales por lo que se establece in product la seleccion
        // por eso es que ser repinta uno solo viaje con la seleccion.
        if (!checkProductInCart(product)) {
            setSelectedProduct(product === selectedProduct ? null : product);
        }
        // en este caso el producto esta en el carrito y esta filtrado lo que quiero es que vuelva a cargar todos los productos. para esto debo establecer la seleecion en null
        if (checkProductInCart(product)) {
            setSelectedProduct(null);
        }

    };

    return (

        <main className='products'>
            <div className="table-and-seatmap-container">
                <div className="table-container">
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
                            {selectedProduct ? (
                                <tr key={selectedProduct._id}>
                                    <td>
                                        <img
                                            src={selectedProduct.thumbnail}
                                            alt={selectedProduct.title}
                                        />
                                    </td>
                                    <td><strong>{selectedProduct.title}</strong></td>
                                    <td>{selectedProduct.price}</td>
                                    <td>{selectedProduct.asientos_disponibles}</td>
                                    <td>{selectedProduct.origen}</td>
                                    <td>{selectedProduct.destino}</td>
                                    {/* <td>{product.fecha_salida}</td> */}
                                    <td>{selectedProduct.fecha_salida ? selectedProduct.fecha_salida.split('T')[0] : ''}</td>
                                    <td>{selectedProduct.hora_salida}</td>
                                    <td>{selectedProduct.hora_llegada}</td>
                                    <td>{selectedProduct.tipo_servicio}</td>
                                    <td>
                                        <button
                                            style={{ backgroundColor: checkProductInCart(selectedProduct) ? 'red' : '#09f' }}
                                            onClick={() => {
                                                checkProductInCart(selectedProduct)
                                                    ? removeFromCart(selectedProduct)
                                                    : addToCart(selectedProduct);

                                                // en este punto el producto esta en el carrito no necesitamos q se repinte el mapa por eso lo negamos para que no entre
                                                if (!checkProductInCart(selectedProduct)) {
                                                    handleToggleAsientosMapa();
                                                }

                                                // Selecciona / deselecciona el producto
                                                handleToggleSelectedProduct(selectedProduct);


                                            }}
                                        >
                                            {checkProductInCart(selectedProduct)
                                                ? <RemoveFromCartIcon />
                                                : <AddToCartIcon />
                                            }
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                // Muestra todas las filas si no hay un producto seleccionado
                                products.slice(0, 15).map(product => (
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
                                                style={{ backgroundColor: checkProductInCart(product) ? 'red' : '#09f' }}
                                                onClick={() => {
                                                    checkProductInCart(product)
                                                        ? removeFromCart(product)
                                                        : addToCart(product);

                                                    // cuando carga todos los viajes no hay nada en el carrito deberia mostrar mapa de asiento, ademas si regresesa de mapa de asientos se quita del carrito 
                                                    if (!checkProductInCart(product)) {
                                                        handleToggleAsientosMapa();
                                                    }

                                                    // Selecciona/deselecciona el producto, aqui todavia no esta en el carrito
                                                    handleToggleSelectedProduct(product);
                                                }}
                                            >
                                                {checkProductInCart(product)
                                                    ? <RemoveFromCartIcon />
                                                    : <AddToCartIcon />
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
                {/* Mostrar el mapa de asientos si showAsientosMapa es true */}
                {showAsientosMapa && <SeatMap />}
            </div>
        </main>
    );
}
