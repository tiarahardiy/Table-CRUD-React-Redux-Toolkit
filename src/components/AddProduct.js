import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveProduct } from '../features/productSlice';
import Swal from 'sweetalert2'

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createProduct = async (e) => {
        e.preventDefault();
        await dispatch(saveProduct({title, price}))
            .then (
                () => {
                    e.preventDefault();
                    Swal.fire({
                        title: 'Success',
                        text: "Success add data!",
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
        <form onSubmit={createProduct} className='box mt-5' >
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
                <button className='button is-success'>Submit</button>
            </div>

        </form>
    </div>
  )
}

export default AddProduct