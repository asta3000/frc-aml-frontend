const initialState = {
    menus: [],
    result: {
        status: null,
        message: null,
    }
}

const MenuReducer = (state = initialState, action) => {

    switch(action.type){
        
        case 'GET_MENUS_START' : return {
            ...state,
            result: {
                status: null,
                message: null,
            }
        };

        case 'GET_MENUS_SUCCESS' : return {
            ...state,
            menus: action.result.result,
            result: {
                ...state.result,
                status: "success",
                message: "Цэснүүдийг татаж дууслаа.",
            }
            
        };

        case 'GET_MENUS_ERROR' : return {
            ...state,
            result: {
                ...state.result,
                status: "error",
                message: "Цэснүүдийг дуудахад алдаа гарлаа. Дахин оролдоно уу."
            }
        };

        default:
            return state;
    }
}

export default MenuReducer;