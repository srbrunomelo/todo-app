import React, { useReducer } from 'react';
import FilterContext from './Context';
import FilterReducer from './reducer';

function Provider({ children }) {
    const [filter, dispatchToFilter] = useReducer(FilterReducer, 'all');
    return (
        <FilterContext.Provider value={{ filter, dispatchToFilter }}>
            {children}
        </FilterContext.Provider>
    )
}

export default Provider;