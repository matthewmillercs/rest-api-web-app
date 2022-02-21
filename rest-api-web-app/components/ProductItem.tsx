import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { ProductItemType } from "../types/product-item";

interface ProductItemProps {
    productItem: ProductItemType;
}

export const ProductItem = (props: ProductItemProps) => {
    const { productItem } = props;
    return (
        <Card
            sx={{
                height: 175,
                width: 300,
                backgroundColor: "#white",
                overflow: "auto",
                boxShadow: 4,
            }}
        >
            <CardContent sx={{ color: "black" }}>
                <Typography variant="h5" gutterBottom>
                    {productItem ? productItem?.product_name : null}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Ingredients:
                    {" " + productItem.product_ingredients.join(", ")}
                </Typography>
            </CardContent>
        </Card>
    );
};
