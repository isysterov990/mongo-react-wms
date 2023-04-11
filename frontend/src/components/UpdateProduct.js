import React from 'react';
import {TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';

const BASE_URL = 'https://wawmsproject-backend.azurewebsites.net'
const UpdateProductForm = ({openUpdate, handleClose}) => {
    const FormTextField = ({autoFocus, id, label, type}) => (
        <TextField
            autoFocus={autoFocus}
            margin="dense"
            id={id}
            name={id}
            label={label}
            type={type}
            fullWidth
            variant="standard"
            inputProps={id === 'id' ? {min: 0, step: 1} : undefined}
        />
    );

    const fields = [
        {id: 'product_id', label: 'ID', type: 'number', autoFocus: true},
        {id: 'name', label: 'Name', type: 'text'},
        {id: 'price', label: 'Price', type: 'number'},
        {id: 'description', label: 'Description', type: 'text'},
        {id: 'category', label: 'Category', type: 'text'},
        {id: 'quantity', label: 'Quantity', type: 'number'},
        {id: 'supplier_id', label: 'Supplier ID', type: 'number'},
        {id: 'supplier_name', label: 'Supplier Name', type: 'text'},
        {id: 'supplier_email', label: 'Supplier email', type: 'text'},
        {id: 'supplier_phone', label: 'Supplier phone', type: 'text'},
    ];

    const createSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);


        data.product_id = parseInt(data.product_id, 10);
        data.price = parseInt(data.price, 10);
        data.quantity = parseInt(data.quantity, 10);
        data.supplier_id = parseInt(data.supplier_id, 10);

        // Call the API with the data
        updateProduct(data);
        console.log(data)

        handleClose();
    };


    const updateProduct = async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/products?product_id=${data.product_id}&
            name=${data.name}&price=${data.price}&description=${data.description}&category=${data.category}
            &quantity=${data.quantity}&supplier_id=${data.supplier_id}&supplier_name=${data.supplier_name}
            &supplier_email=${data.supplier_email}&supplier_phone=${data.supplier_phone}`, {
                method: 'PUT'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Data submitted successfully:', result);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <Dialog open={openUpdate} onClose={handleClose}>
            <DialogTitle>Product Form</DialogTitle>
            <form onSubmit={createSubmit}>
                <DialogContent>
                    {fields.map((field, index) => (
                        <FormTextField key={index} {...field} />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default UpdateProductForm;