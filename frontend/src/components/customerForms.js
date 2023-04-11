import React, {useState} from 'react';
import {Button} from '@mui/material';
import Box from '@mui/material/Box';
import AddProductForm from "./AddProduct";
import UpdateProductForm from "./UpdateProduct";
import DeleteProductForm from "./DeleteProduct";


const ProductButtons = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const handleAddOpen = () => setOpenAdd(true);
    const handleUpdateOpen = () => setOpenUpdate(true);
    const handleDeleteOpen = () => setOpenDelete(true);
    const handleClose = () => {
        setOpenAdd(false);
        setOpenUpdate(false);
        setOpenDelete(false);
    };


    return (
        <div>
            <Box display="flex" justifyContent="left" mb={2}>
                <Button
                    variant="contained"
                    sx={{backgroundColor: 'green', color: 'white', marginRight: '8px'}}
                    onClick={handleAddOpen}
                >
                    ADD PRODUCT
                </Button>
                <Button
                    variant="contained"
                    sx={{backgroundColor: 'yellow', color: 'black', marginRight: '8px'}}
                    onClick={handleUpdateOpen}
                >
                    UPDATE PRODUCT
                </Button>
                <Button
                    variant="contained"
                    sx={{backgroundColor: 'red', color: 'white', marginRight: '8px'}}
                    onClick={handleDeleteOpen}
                >
                    DELETE PRODUCT
                </Button>
            </Box>
            <AddProductForm open={openAdd} handleClose={handleClose}/>
            <UpdateProductForm open={openUpdate} handleClose={handleClose}/>
            <DeleteProductForm open={openDelete} handleClose={handleClose}/>
        </div>
    );
}
export default ProductButtons;
