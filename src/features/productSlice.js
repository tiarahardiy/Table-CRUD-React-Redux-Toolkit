import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"
import axios from "axios";

//menampilkan data dari json server/api

export const getProducts = createAsyncThunk("products/getProducts", async () => {
    const response = await axios.get('http://localhost:5000/products');
    return response.data;
});

//menambahkan data

export const saveProduct = createAsyncThunk("products/saveProducts", async ({title, price}) => {
    const response = await axios.post('http://localhost:5000/products',{
        title,
        price
    });
    return response.data;
});

//mengedit data
export const updateProduct = createAsyncThunk("products/updateProducts", async ({id,title, price}) => {
    const response = await axios.patch(`http://localhost:5000/products/${id}`,{
        title,
        price
    });
    return response.data;
});


//detail per data
export const detailProduct = createAsyncThunk("products/detailProducts", async ({id,title, price}) => {
    const response = await axios.get(`http://localhost:5000/products/${id}`,{
        title,
        price
    });
    return response.data;
});




//menghapus data

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
    await axios.get(`http://localhost:5000/products/${id}`);
    return id;
});

const productEntity = createEntityAdapter({
    selectId: (product) => product.id
});

const productSlice = createSlice({
    name:"product",
    initialState: productEntity.getInitialState(),
   extraReducers: {




    //menampilkan data
    [getProducts.fulfilled]: (state, action) => {
        productEntity.setAll(state, action.payload);
    },

    //menyimpan data yg ditambahkan
    [saveProduct.fulfilled]: (state, action) => {
        productEntity.addOne(state, action.payload);
    },

    //menghapus data
    [deleteProduct.fulfilled]: (state, action) => {
        productEntity.removeOne(state, action.payload);
    },

    //mengedit data
    [updateProduct.fulfilled]: (state, action) => {
        productEntity.updateOne(state, {id: action.payload.id, updates: action.payload});
    },

     //detail data
    [detailProduct.fulfilled]: (state, action) => {
        productEntity.setOne(state, {id: action.payload.id, updates: action.payload});
    }
   }

   
});

export const productSelector = productEntity.getSelectors(state => state.product);
export default productSlice.reducer;