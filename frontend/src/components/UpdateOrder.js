import React from 'react';
import {TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';

const BASE_URL = 'https://wawmsproject-backend.azurewebsites.net'
const UpdateSupplierForm = ({openUpdate, handleClose}) => {
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
        {id: 'supplier_id', label: 'ID', type: 'number', autoFocus: true},
        {id: 'name', label: 'Name', type: 'text'},
        {id: 'email', label: 'email', type: 'text'},
        {id: 'phone', label: 'Phone Number', type: 'text'}
    ];

    const createSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);


        data.supplier_id = parseInt(data.supplier_id, 10);

        // Call the API with the data
        updateProduct(data);
        console.log(data)

        handleClose();
    };


    const updateProduct = async (data) => {
        console.log("hello")
        const url = '${BASE_URL}/suppliers/${data.supplier_id}?name=${data.name}&email=${data.email}&phone=${data.phone}';
        try {
            const response = await fetch(url, {
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
            <DialogTitle>Update Supplier</DialogTitle>
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
export default UpdateSupplierForm;