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
                height: 300,
                width: 300,
                backgroundColor: "#B7D1DA",
            }}
        >
            <CardContent sx={{ color: "#4E5340" }}>
                <Typography sx={{ fontSize: 18 }} gutterBottom>
                    {productItem ? productItem?.product_name : null}
                </Typography>
                <Typography sx={{ fontSize: 18 }} gutterBottom>
                    Ingredients:{" "}
                </Typography>
                {productItem.product_ingredients.map((ingredient: string) => {
                    return <li>{ingredient}</li>;
                })}
            </CardContent>
        </Card>
    );
};
