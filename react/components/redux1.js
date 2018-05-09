import {createStore,combineReducers} from "redux";
import uuid from "uuid";


const myPersonsReducer = (state=[],{type,person,id})=>{
    switch (type){
        case "ADD":
            return [...state,
                {...person,
                id:uuid()}
                ];
        case "EDIT":
            const newState = state.map ((itm,ii)=>{
                    if (itm.id===id){
                        return {...itm,
                                ...person};
                    }
                    else{
                        return itm;
                    }
            });
            return newState;
        default:
            return state;
    }
}

const defaultFilterObject = {
    text:"",
    sortBy:"date",
    startDate:0,
    endDate:0,
}

const myFilterReducer = (state = defaultFilterObject,{type,filter}) => {
    switch (type){
        case "SET_TEXT":
            return {
                ...state,
                ...filter,
            };
        default:
            return state;
    }
}


const filterByText = (text="")=>({
    type:"SET_TEXT",
    filter:{
        text,
    },
});

const addPerson = (person)=>({
    type:"ADD",
    person
});

const editPerson = (id,person)=>({
    type:"EDIT",
    id,
    person,
})

const stateReducer={
    persons:myPersonsReducer,
    filter:myFilterReducer,
}

const reducers=combineReducers(stateReducer);

const store=createStore(reducers);

store.subscribe(()=>{
    console.log (store.getState());
})

store.dispatch (addPerson({"name":"blibli",age:30}));
store.dispatch ({type:"aaa"});
store.dispatch (addPerson({"name":"shugu",age:58}));

store.dispatch(editPerson(
    store.getState().persons[0].id,
    {
        name:"abu talila",
    },
))

store.dispatch(filterByText("lalali"))
