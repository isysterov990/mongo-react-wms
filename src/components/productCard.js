import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ProductCard({ product }) {
  const { name, description, price } = product;

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2">
          {description}
          <br />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          ${price}
        </Typography>
      </CardContent>
    </Card>
  );
}
