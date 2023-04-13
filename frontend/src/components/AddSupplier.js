import React from 'react';
import {TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';

const BASE_URL = 'https://wawmsproject-backend.azurewebsites.net'
const AddSupplierForm = ({openAdd, handleClose}) => {
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
        createProduct(data);

        handleClose();
    };
    async function createSupplier() {
        const url = `${BASE_URL}/suppliers?supplier_id=12&name=12&email=12&phone=12`; // Replace with your API base URL if different
        const data = {
            products: [
                {
                    product_id: 101,
                    name: "Product A",
                    quantity: 10,
                    price: 25.99,
                    description: "A sample product A.",
                    category: "Electronics"
                },
                {
                    product_id: 102,
                    name: "Product B",
                    quantity: 5,
                    price: 39.99,
                    description: "A sample product B.",
                    category: "Home & Garden"
                }
            ]
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Supplier created successfully:', result);
        } catch (error) {
            console.error('Error creating supplier:', error);
        }
    }



    const createProduct = async (data) => {
        await createSupplier();
        // const url = `${BASE_URL}/suppliers?supplier_id=${data.supplier_id}&name=${data.name}&email=${data.email}&phone=${data.phone}`;
        // const products = {products : [
        //     {
        //         "product_id": 78901,
        //         "name": "New Product",
        //         "quantity": 2,
        //         "price": 10.99
        //     }
        // ]}
        // console.log(products)
        // try {
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(products),
        //     });
        //
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //
        //     const result = await response.json();
        //     console.log('Data submitted successfully:', result);
        // } catch (error) {
        //     console.error('Error submitting data:', error);
        // }
    };

    return (
        <Dialog open={openAdd} onClose={handleClose}>
            <DialogTitle>Add Supplier</DialogTitle>
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

export default AddSupplierForm;