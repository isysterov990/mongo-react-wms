import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function OrderCard({ order }) {
  const { order_date } = order;

  const { name } = order.customer;

  const products = order.products.map((product) => ({
    product_name: product.name,
    product_quantity: product.quantity,
  }));


  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="div">
          {order_date}
        </Typography>
        <Typography variant="body2">
            {name}
          <br />
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