import React from 'react';
import {TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';

const BASE_URL = 'https://wawmsproject-backend.azurewebsites.net'
const DeleteProductForm = ({openDelete, handleClose}) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        data.product_id = parseInt(data.product_id, 10);

        deleteProduct(data);

        handleClose();
    };

    const deleteProduct = async (data) => {
        try {
            const response = await fetch(
                `${BASE_URL}/products/${data.product_id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log("Product deleted successfully:", result);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <Dialog open={openDelete} onClose={handleClose}>
            <DialogTitle>Delete Product</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="product_id"
                        name="product_id"
                        label="Product ID"
                        type="number"
                        fullWidth
                        variant="standard"
                        inputProps={{min: 0, step: 1}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default DeleteProductForm;



