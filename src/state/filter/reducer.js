import * as filterTypes from './types';

function reducer(_, action) {  /*  _  simboliza o state  */
    switch (action.type) {
        case filterTypes.TOGGLE_FILTER:
            return action.payload.filter
        default:
            throw new Error(); 
    }
}

export default reducer;