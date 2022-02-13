import {
    Button,
    List,
    ListItem,
    ListItemText,
    Modal,
    TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useState } from "react";

interface AddProductModalProps {
    open: boolean;
    onClose: any;
    handleOnSubmit: (productInfo: any) => void;
}

export const AddProductModal: FC<AddProductModalProps> = (props) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        backgroundColor: "lightgrey",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
    };

    const flexContainer = {
        display: "flex",
        flexDirection: "row",
        padding: 0,
        gap: "10px",
        flexWrap: "wrap",
    };

    const { open, onClose, handleOnSubmit } = props;
    const [currentIngredient, setCurrentIngredient] = useState("");
    const [currentProductName, setCurrentProductName] = useState("");
    const [ingredientList, setIngredientList] = useState<string[]>([]);
    const addIngredient = () => {
        if (currentIngredient) {
            setIngredientList([...ingredientList, currentIngredient]);
            setCurrentIngredient("");
        }
    };
    const onIngredientInputChange = (event: any) => {
        const eventTarget = event.target as HTMLInputElement;
        setCurrentIngredient(eventTarget.value);
    };
    const onProductNameInputChange = (event: any) => {
        const eventTarget = event.target as HTMLInputElement;
        setCurrentProductName(eventTarget.value);
    };
    const clearFields = () => {
        setIngredientList([]);
        setCurrentProductName("");
        setCurrentIngredient("");
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <TextField
                    label="Enter Product Name"
                    onChange={onProductNameInputChange}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        justifyContent: "space-between",
                    }}
                >
                    <TextField
                        label="Enter Ingredient"
                        value={currentIngredient}
                        onChange={onIngredientInputChange}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                addIngredient();
                            }
                        }}
                    />
                    <Button onClick={addIngredient}>Add Ingredient</Button>
                </Box>
                <List sx={flexContainer}>
                    {ingredientList.map((ingredient, index) => {
                        return (
                            <ListItem
                                sx={{
                                    width: "fit-content",
                                    border: "1px solid grey",
                                    height: "40px",
                                }}
                            >
                                <ListItemText
                                    key={index}
                                    primary={ingredient}
                                />
                            </ListItem>
                        );
                    })}
                </List>
                <Button
                    onClick={() => {
                        if (ingredientList.length && currentProductName) {
                            handleOnSubmit({
                                productName: currentProductName,
                                ingredients: ingredientList,
                            });
                            clearFields();
                        }
                    }}
                >
                    Add Product
                </Button>
            </Box>
        </Modal>
    );
};
