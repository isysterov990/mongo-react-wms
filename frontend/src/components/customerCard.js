import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CustomerCard({ customer }) {
    const { name, email, phone, postal_code } = customer;

    return (
        <Card variant="outlined" sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2">
                    {email}
                    <br />
                    {phone}
                    <br />
                    {postal_code}
                </Typography>
            </CardContent>
        </Card>
    );
}
