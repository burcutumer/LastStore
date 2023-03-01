import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/basket";


// interface  for BasketState
// initial state
// Basket Slice
// CREATE SLICE  name,initialState,REDUCERS
// inside slice we need reducers
// Reducers  use  (state,action)
// EXPORT ACTIONS

interface BasketState {
    basket: Basket | null,
    status: string
}

const initialState:BasketState = {
    basket: null,
    status: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<Basket, {productId:number,quantity?:number}>(
    'basket/addBasketItemAsync',
    async({productId,quantity = 1}) => {
        try {
            return await agent.Basket.addItem(productId,quantity);
        } catch (error) {
            console.log(error);
        }
    }
)
export const removeBasketItemAsync = createAsyncThunk<void,
    {productId:number,quantity:number, name?:string}>(
    'basket/removeBasketItemAsync',  //type prefix
    async ({productId,quantity}) => {     // async method
        try {
            await agent.Basket.removeItem(productId,quantity);
        } catch (error) {
            console.log(error);
        }
    }
)

export const basketSlice = createSlice({
    name:'basket',
    initialState,
    reducers: {
        setBasket: (state,action) => {
            state.basket = action.payload
        },
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            console.log(action);
            state.status = 'pendingAddItem'+action.meta.arg.productId;
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.pending, (state,action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state,action) => {
            const {productId,quantity} = action.meta.arg;                     //action payloaddan prodctId ve quantity lazim
           const itemIndex = state.basket?.items.findIndex(i => i.productId ===productId)  // FINDINDEX bulamazsa  -1 doner
           if (itemIndex === -1 || itemIndex === undefined) return;
           state.basket!.items[itemIndex].quantity -= quantity;
           if (state.basket?.items[itemIndex].quantity === 0)
              state.basket.items.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        });
    })
})

export const {setBasket} = basketSlice.actions;