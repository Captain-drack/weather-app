import React from 'react';
import { Card, CardContent } from '@mui/material';

interface CustomCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties; // Optional prop for custom styling
}

const CustomCard: React.FC<CustomCardProps> = ({ children, style }) => {
  return (
    <Card variant="outlined" style={{ marginTop: "10px", marginBottom: "10px", ...style }}>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default CustomCard;