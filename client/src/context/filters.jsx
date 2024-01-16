import { createContext, useState } from "react";

// create the context, this is the object that will be shared between components
// this is the context we have to consume
export const FiltersContext = createContext();

// 2. create the provider, to provide the context to the children
// this is the that us provided of access to the context
export function FiltersProvider({ children }) {

    const [filters, setFilters] = useState({
        category: "all",
        minPrice: 0,

    })
    return (

        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}
        >
            {children}
        </FiltersContext.Provider>
    )
}

