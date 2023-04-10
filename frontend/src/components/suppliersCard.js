import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function SupplierCard({ supplier }) {
  const { name, email, phone } = supplier;

  const products = supplier.products.map((product) => ({
    product_name: product.name,
    product_quantity: product.quantity,
  }));


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
        </Typography>
        <Typography variant="body2">
          <p>Products:</p>

          {products.map((product) => (
              <div>
                <p>{product.product_name} | Quantity: {product.product_quantity}</p>
              </div>
          ))}
        </Typography>

      </CardContent>
    </Card>
  );
}