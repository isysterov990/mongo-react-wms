import React from 'react';
import {TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';

const BASE_URL = 'https://wawmsproject-backend.azurewebsites.net'
const AddCustomerForm = ({openAdd, handleClose}) => {
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
        {id: 'customer_id', label: 'ID', type: 'number', autoFocus: true},
        {id: 'name', label: 'Name', type: 'text'},
        {id: 'email', label: 'email', type: 'text'},
        {id: 'phone', label: 'Phone Number', type: 'text'},
        {id: 'address', label: 'Address', type: 'text'},
        {id: 'city', label: 'city', type: 'text'},
        {id: 'province', label: 'Province', type: 'text'},
        {id: 'postal_code', label: 'Postal Code', type: 'text'},
        {id: 'country', label: 'Country', type: 'text'},
    ];

    const createSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);


        data.customer_id = parseInt(data.customer_id, 10);

        // Call the API with the data
        createProduct(data);

        handleClose();
    };

    const createProduct = async (data) => {
        const url = `${BASE_URL}/customers?customer_id=${data.customer_id}&name=${data.name}&email=${data.email}&phone=${data.phone}&address=${data.address}&city=${data.city}&province=${data.province}&postal_code=${data.postal_code}&country=${data.country}`;

        console.log(url)
        try {
            const response = await fetch(url, {
                method: 'POST'
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
            <DialogTitle>Add Customer</DialogTitle>
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

export default AddCustomerForm;