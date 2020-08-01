import {CURSOR_INIT} from 'api/Cursors';

export default commonCursorReducers = (name,state,action,config = {}) => {
    switch ( action.type ) {        
        case 'PURGE': {
            console.log("Pritge !");
            return null;
        }
        case 'CURSOR_ERROR':{
            return {
                ...state,
                error:{
                    message:action.message,
                    info:action.info
                }
            }
        }
        case `${name}_MOVE`:
            return {
                ...state,
                cursor:{
                    ...state.cursor,
                    page:action.page,
                    loading:true
                }
            }
        case `${name}_SETPAGE`:{
            return {
                ...state,
                cursor:{
                    ...state.cursor
                    ,page:action.page
                }
            }
        }
        case `${name}_LOADING`:
            return {
                ...state,
                cursor:{
                    ...state.cursor,
                    loading:action.loading
                }
            }
        case `${name}_RESET`:
            return {
                ...state,
                cursor:{
                    ...state.cursor
                    ,CURSOR_INIT
                }
            }
        default:
           return state;
    }
}


