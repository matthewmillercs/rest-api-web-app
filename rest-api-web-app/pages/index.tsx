import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { AddProductModal } from "../components/AddProductModal";
import { ProductItem } from "../components/ProductItem";
import { ProductItemType } from "../types/product-item";

const Dashboard: NextPage = () => {
    const baseUrl = "http://localhost:5000";

    const [modalOpen, setModalOpen] = useState(false);
    const [productList, setProductList] = useState<ProductItemType[]>([]);

    const handleOnModalClose = () => {
        setModalOpen(false);
    };

    const handleProductSubmit = async (productInfo: ProductItemType) => {
        try {
            await axios.post(`${baseUrl}/create-product`, productInfo);
        } catch (err) {
            console.log(err);
        }
        setModalOpen(false);
        fetchProducts();
    };

    const fetchProducts = async () => {
        const data = await axios.get(`${baseUrl}/get-products`);
        const { products } = data.data;
        setProductList(products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar
                        sx={{ backgroundColor: "#191919", color: "#white" }}
                    >
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Product Creation Dashboard
                        </Typography>
                        <Button
                            onClick={() => setModalOpen(true)}
                            color="inherit"
                        >
                            Create Product
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    position: "fixed",
                    backgroundColor: "#f0f2f5",
                }}
            >
                {productList.length ? (
                    <Box
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "12px",
                        }}
                    >
                        {productList.map((productItem, index) => {
                            return (
                                <ProductItem
                                    key={index}
                                    productItem={productItem}
                                ></ProductItem>
                            );
                        })}
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        No products created
                    </Box>
                )}
            </Box>
            <AddProductModal
                open={modalOpen}
                onClose={handleOnModalClose}
                handleOnSubmit={handleProductSubmit}
            />
        </div>
    );
};

export default Dashboard;
