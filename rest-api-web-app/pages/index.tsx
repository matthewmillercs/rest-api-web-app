import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import { AddProductModal } from "../components/AddProductModal";
import { ProductItem } from "../components/ProductItem";

const Dashboard: NextPage = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOnModalClose = () => {
        setModalOpen(false);
    };

    const handleProductSubmit = (productInfo: any) => {
        console.log(productInfo);
        setModalOpen(false);
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ backgroundColor: "#40b4e5" }}>
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
                            Add Product
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    position: "fixed",
                    backgroundColor: "white",
                }}
            >
                <Box sx={{ p: 2 }}>
                    <ProductItem></ProductItem>
                </Box>
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
