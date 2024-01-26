import { useContext } from 'react'
import { FiltersContext } from '../context/filters.jsx'


export function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext)

  const filterProducts = (products) => {

    if (!Array.isArray(products)) {
      // Si no es un array, muestra un error en la consola y retorna un array vacío
      console.error('filterProducts espera un array, recibió:', products);
      return [];
    }

    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        (
        (filters.origen === 'all' || filters.origen === product.origen) && // Filtra por origen
        (filters.destino === 'all' || filters.destino === product.destino) && // Filtra por destino
        (filters.fecha_salida === 'all' || filters.fecha_salida === product.fecha_salida) // Filtra por fecha_salida
        )
      )
    })
  }
  return { filters, filterProducts, setFilters }
}