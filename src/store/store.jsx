
import { createStore, combineReducers } from 'redux'

let intialState = {
    selected: [],
    update: false,
    selectedcard: [],
    islogin: false,
    isregister: true,
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
            return {
                ...state
            }

        case "login":
            
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

const store = createStore(combineReducers({ adds, login }));
store.dispatch({
    type: "start"
})
console.log(store.getState())

export default store