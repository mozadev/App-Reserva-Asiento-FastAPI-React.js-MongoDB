import React, { useEffect } from 'react';
import products from './products_paypal.json'
import { Products } from './Products';
import axios from 'axios'
// No necesitas importar axios a menos que lo estés usando en alguna otra parte de tu componente.

function PaypalButton() {
    // Función para cargar el SDK de PayPal
    const loadPaypalScript = () => {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AWO3ncoo_FsHviNewL6iCLSuWH4OUmsQqQuBik1lH1GgO3cm2uvr_4v3jKJGXv4ganKZwRkb6AKn9O5K";
        script.addEventListener("load", () => {
            renderPaypalButton(); // Llama a renderPaypalButton una vez que el SDK esté cargado
        });
        document.body.appendChild(script);
    };

    // Función para renderizar el botón de PayPal
    const renderPaypalButton = () => {
        if (window.paypal) { // Asegúrate de que paypal está definido en window
            window.paypal
                .Buttons({
                    createOrder: async () => {
                        try {
                            const respons = await axios({

                                url: "http://localhost:8000/create-order",
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                data: products

                            })
                            console.log("Respuesta del servidor para crear orden:", respons.data);

                            return respons.data.id


                        } catch (error) {
                            console.log(error);
                        }
                    },
                    onCancel: function (data) {
                        console.log("Compra cancelada")
                    },
                    onApprove: function (data, actions) {
                        console.log(data)
                        return actions.order.capture()
                    }

                    // createOrder: (data, actions) => {
                    //     // Esta función configura los detalles de la transacción, incluido el monto
                    //     return actions.order.create({
                    //         purchase_units: [{
                    //             amount: {
                    //                 value: "1" // Asegúrate de reemplazar esto con el monto que deseas cobrar
                    //             }
                    //         }]
                    //     });
                    // },
                    // Puedes añadir más funciones como onApprove, onCancel aquí si es necesario
                })
                .render('#paypal-button-container');
        }
    };

    // Hook useEffect para cargar el script cuando el componente se monte
    useEffect(() => {
        loadPaypalScript();
        // La dependencia [] significa que este efecto solo se ejecutará una vez después del montaje inicial del componente
    }, []);

    // Renderiza el contenedor donde se insertará el botón de PayPal
    return (
        <div id="paypal-button-container"></div>
    );
}

export default PaypalButton;
