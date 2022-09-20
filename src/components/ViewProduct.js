import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { detailProduct, productSelector } from '../features/productSlice';

const ViewProduct = () => {

const [title, setTitle] = useState('');
const [price, setPrice] = useState('');
const dispatch = useDispatch();
const {id} = useParams();

const product = useSelector((state) => productSelector.selectById(state,id));

useEffect(() => {
    dispatch(detailProduct());
}, [dispatch]);

useEffect(() => {
    if(product) {
        setTitle(product.title);
        setPrice(product.price);
    }
},[product])


  return (
    <div>
        <div className='box mt-5'>
            <label className='label'>Title</label>
            <h1>{title}</h1>
            <label className='label'>Price</label>
            <h1>{price}</h1>
        </div>
    </div>
  )
}

export default ViewProduct