import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts, productSelector, updateProduct } from '../features/productSlice';
import Swal from 'sweetalert2';

const EditProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

     //data yg ditampilkan pada edit
    const product = useSelector((state) => productSelector.selectById(state, id));

    // ambil data dari store
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])


    //data yg ditampilkan pada edit
    useEffect(() => {
        if(product) {
            setTitle(product.title);
            setPrice(product.price);
        }
    },[product])

    const handleUpdate = async (e) => {
        e.preventDefault();
        await dispatch(updateProduct({id,title, price}))
        .then (
            () => {
                e.preventDefault();
                Swal.fire({
                    title: 'Success',
                    text: "Success edit data!",
                    icon: 'success',
                    timer: 2250,
                    showConfirmButton: false,
                    }).then(() =>
                    navigate('/')
                );
            },
            () => {
                e.preventDefault();
                Swal.fire(
                    "Failed",
                    "Fail to editDATA, please try again later",
                    "error"
                );
            }
        )

        .catch(() => {
            e.preventDefault();
            Swal.fire(
                "Failed",
                "Fail to edit training, please try again later",
                "error"
            );
        })
        // navigate('/');
    }
  return (
    <div>
        <form onSubmit={handleUpdate} className='box mt-5' >
            <div className='field'>
                <label className='label'>Title</label>
                <div className='control'>
                    <input 
                        type='text'
                        className='input'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            </div>
            <div className='field'>
                <label className='label'>Price</label>
                <div className='control'>
                    <input 
                        type='text'
                        className='input'
                        placeholder='Price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
            </div>
            <div className='field'>
                <button className='button is-success'>Update</button>
            </div>

        </form>
    </div>
  )
}

export default EditProduct