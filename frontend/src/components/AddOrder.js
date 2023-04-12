import React from 'react';
import {TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';

const BASE_URL = 'https://wawmsproject-backend.azurewebsites.net'
const AddOrderForm = ({openAdd, handleClose}) => {
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
        />
    );

    const fields = [
        {id: 'order_id', label: 'Order ID', type: 'number', autoFocus: true},
        {id: 'order_date', label: 'Date', type: 'text'},
        {id: 'customer_id', label: 'Customer ID', type: 'number'},
        {id: 'customer_name', label: 'Customer Name', type: 'text'},
        {id: 'customer_email', label: 'Customer Email', type: 'text'},
        {id: 'customer_phone', label: 'Customer Phone', type: 'text'},
        {id: 'product_id', label: 'Product ID', type: 'number'}
    ];

    const createSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        data.order_id = parseInt(data.order_id, 10);
        data.customer_id = parseInt(data.customer_id, 10);

        // Call the API with the data
        createProduct(data);

        handleClose();
    };

    const createProduct = async (data) => {
        const url1 = `${BASE_URL}/products/${data.product_id}`;
        let result;
        const response = await fetch(url1, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        result = await response.json();


        const url = `${BASE_URL}/orders?order_id=${data.order_id}&order_date=${data.order_date}&customer_id=${data.customer_id}&customer_name=${data.customer_name}&customer_email=${data.customer_email}&customer_phone=${data.customer_phone}`;

        console.log(url)
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(result),
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
        <Dialog open={openAdd} onClose={handleClose}>
            <DialogTitle>Add Order</DialogTitle>
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

}

export default AddOrderForm;