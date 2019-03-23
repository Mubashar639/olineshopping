
import { createStore, combineReducers } from 'redux'

const cards = [{ img: "https://firebasestorage.googleapis.com/v0/b/myecomerane.appspot.com/o/demopictures%2Fgal1.png?alt=media&token=d5582a20-15e5-4988-9467-6d04c867d390", name: "Origenal lakeme cc Cream and Conditional", Prize: "RS . 199" },

{ img: "https://firebasestorage.googleapis.com/v0/b/myecomerane.appspot.com/o/demopictures%2Fgal3.png?alt=media&token=95e587b7-d137-4090-9a41-190f7d9cb600", name: "Watch kid Special", Prize: "RS . 300" },

{ img: "https://firebasestorage.googleapis.com/v0/b/myecomerane.appspot.com/o/demopictures%2Fgal5.png?alt=media&token=60810ca7-5483-4c23-b3b7-d9b3223363a1", name: "Balcher free full Solution of Hairs problem", Prize: "RS . 350"},
{ img: "https://firebasestorage.googleapis.com/v0/b/myecomerane.appspot.com/o/demopictures%2Fgal6.png?alt=media&token=92cebc81-08b8-437b-aefd-2513d0bae44c", name:"32 GB memory card Branded", Prize: "RS . 650"  },
{ img: "https://firebasestorage.googleapis.com/v0/b/myecomerane.appspot.com/o/demopictures%2Fgal7.png?alt=media&token=aea3f5fc-2682-4168-b665-ceac2fe9e93d", name: "Dalta Ghee 10Kg mamta special", Prize: "RS . 1450"},
{ img: "https://firebasestorage.googleapis.com/v0/b/myecomerane.appspot.com/o/demopictures%2Fgal8.png?alt=media&token=4d84e8fb-a334-496f-a8c5-a24018bb9a00", name:  "Pairs of shirt differant size available", Prize: "RS . 800"  },
{ img: "https://firebasestorage.googleapis.com/v0/b/myecomerane.appspot.com/o/demopictures%2Fgal9.png?alt=media&token=deff57dd-55a9-4cc2-9263-6c70cb816ae0", name: "pamper 8 hours relex garentee", Prize: "RS . 1400" },
{ img: "https://firebasestorage.googleapis.com/v0/b/myecomerane.appspot.com/o/demopictures%2Fgal10.png?alt=media&token=529b55d2-23e3-4670-8792-e43b5966c25d", name: "Cock jamboo pack", Prize: "RS . 450" },
{ img: "https://firebasestorage.googleapis.com/v0/b/myecomerane.appspot.com/o/demopictures%2Fgal11.png?alt=media&token=b156e506-3ae9-4943-8178-8ba2c4c1400e", name: "heiwe y9 full spec", Prize: "RS . 29000" },
{ img: "https://firebasestorage.googleapis.com/v0/b/myecomerane.appspot.com/o/demopictures%2Fgal12.png?alt=media&token=d001fa0e-085b-4413-b01c-027942e3a927", name: "Moltifix pamper jambopack", Prize: "RS . 1199" },
];
let intialState = {
    selected: [],
    update: false,
    selectedcard: [],
    islogin: false,
    isregister: false,
    register: [],
    cards,
    odered:[],
}

function adds(state = intialState, action) {
    switch (action.type) {
        case "start":

            return {
                ...state
            }
        case "upload":
                cards.push(action.upload)
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
            state.selectedcard.push(cards[action.index])
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
         localStorage.setItem("odercomplete",JSON.stringify(state.odered))
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