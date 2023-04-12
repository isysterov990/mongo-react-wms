import React, {useState} from 'react';
import {Button} from '@mui/material';
import Box from '@mui/material/Box';
import AddCustomerForm from "./AddCustomer";
import UpdateCustomerForm from "./UpdateCustomer";
import DeleteCustomerForm from "./DeleteCustomer";


const ProductButtons = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const handleAddOpen = () => {
        setOpenAdd(true);
        console.log(openAdd);
    }
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
                    ADD CUSTOMER
                </Button>
                <Button
                    variant="contained"
                    sx={{backgroundColor: 'yellow', color: 'black', marginRight: '8px'}}
                    onClick={handleUpdateOpen}
                >
                    UPDATE CUSTOMER
                </Button>
                <Button
                    variant="contained"
                    sx={{backgroundColor: 'red', color: 'white', marginRight: '8px'}}
                    onClick={handleDeleteOpen}
                >
                    DELETE CUSTOMER
                </Button>
            </Box>
            <AddCustomerForm openAdd={openAdd} handleClose={handleClose}/>
            <UpdateCustomerForm openUpdate={openUpdate} handleClose={handleClose}/>
            <DeleteCustomerForm openDelete={openDelete} handleClose={handleClose}/>
        </div>
    );
}
export default ProductButtons;
