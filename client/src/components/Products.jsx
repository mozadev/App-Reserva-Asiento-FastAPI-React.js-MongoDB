import './Products.css';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx';
import { useCart } from '../hooks/useCart.js';

export function Products({ products }) {
    const { addToCart, removeFromCart, cart } = useCart();

    const checkProductInCart = (product) => {
        return cart.some((item) => item._id === product._id);
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
        </main>
    );
}
