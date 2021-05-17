const initialState = {
    username: '',
    profile_pic: ''
}

const UPDATE_USER  = 'UPDATE_USER'
const LOGOUT_USER = 'LOGOUT_USER'


export const updateUser = (user) => { //user obj will be the value used whenever this func is invoked in the frontend
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export const logout = () => {
    return {
        type: LOGOUT_USER
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return {...state, user: action.payload}
        case LOGOUT_USER:
            return { username: '', profile_pic: '' }
    
        default:
            return state; //both cases are ignored, state is unchanged
    }
}  