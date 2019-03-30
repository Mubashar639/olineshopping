
import { createStore, combineReducers } from 'redux'

let intialState = {
    selected: [],
    update: false,
    selectedcard: [],
    islogin: false,
    isregister: false,
    register: [],
    cards:[],
    odered: [],
}

function adds(state = intialState, action) {
    switch (action.type) {
        case "start":

            return {
                ...state
            }
        case "fdata":
           state.cards=action.array
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}
function todo(state = intialState, action) {
    switch (action.type) {
        case "value":
            state.selected.push(action.index);
            state.selectedcard.push(state.cards[action.index])
            state.update = !state.update
            return {
                ...state,

            }


        default:
            return {
                ...state
            }
    }
}
function login(state = intialState, action) {

    switch (action.type) {
        case "register":
            state.register.push(action.match);
            state.isregister = true;
            return {
                ...state
            }

        case "login":
            let filter = state.register.filter((item) => {
                if (item.username === action.match.username && item.password === action.match.password) {
                    state.update = !state.update
                    state.islogin = true;
                    return true;
                }
            })
            return {
                ...state
            }
        case "ordered":
            state.odered.push(state.selectedcard[action.index]);
            state.odered.push(JSON.parse(localStorage.getItem("register")))

            state.odered.push(action.match);
            localStorage.setItem("odercomplete", JSON.stringify(state.odered))
            return {
                ...state
            }

        default:
            return {
                ...state
            }
    }
}

const store = createStore(combineReducers({ todo, adds, login }));
store.dispatch({
    type: "start"
})
console.log(store.getState())

export default store