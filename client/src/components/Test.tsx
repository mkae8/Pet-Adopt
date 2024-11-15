// "use client";

// import axios from "axios";
// import Image from "next/image";
// import React, { useState, ChangeEvent } from "react";
// import {
//   Box,
//   Button,
//   FormControlLabel,
//   Modal,
//   Switch,
//   TextField,
//   MenuItem,
//   Typography,
// } from "@mui/material";
// import { toast } from "react-toastify";
// import { useCategory } from "@/provider/CategoryProvider";

// interface UploadResponse {
//   secure_url: string;
//   public_id: string;
// }

// interface FoodItem {
//   foodName: string;
//   category: string;
//   ingredients: string;
//   price: string;
//   onSale: boolean;
// }

// export const AdminAdd: React.FC = () => {
//   const { categoryNames } = useCategory();

//   const [open, setOpen] = useState<boolean>(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const [foodName, setFoodName] = useState<string>("");
//   const [category, setCategory] = useState<string>("");
//   const [ingredients, setIngredients] = useState<string>("");
//   const [price, setPrice] = useState<string>("");
//   const [onSale, setOnSale] = useState<boolean>(false);
//   const [image, setImage] = useState<string>("");

//   const cloud_name = "djxo5odaa";
//   const preset_name = "temuujin";
//   const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "587px",
//     height: "854px",
//     bgcolor: "white",
//     boxShadow: 24,
//     p: 5,
//     borderRadius: 2,
//   };

//   const handleSubmit = async () => {
//     const newFoodItem: FoodItem = {
//       foodName,
//       category,
//       ingredients,
//       price,
//       onSale,
//     };

//     if (!foodName || !category || !ingredients || !price || !image) {
//       toast.error("All fields are required!");
//       return;
//     }

//     try {
//       await axios.post(`${process.env.BACKEND_URL}/food-create`, {
//         foodName: newFoodItem.foodName,
//         foodCategory: newFoodItem.category,
//         foodIngredients: newFoodItem.ingredients,
//         price: newFoodItem.price,
//         onSale: newFoodItem.onSale,
//         images: image,
//       });

//       toast.success("Food item created successfully!");
//       handleClear();
//     } catch (error) {
//       toast.error("Failed to create food item. Please try again.");
//       console.error(error);
//     }
//   };

//   const handleClear = () => {
//     setFoodName("");
//     setCategory("");
//     setIngredients("");
//     setPrice("");
//     setOnSale(false);
//     setImage("");
//   };

//   const handleInputChange =
//     (
//       setter: React.Dispatch<React.SetStateAction<string>>,
//       isNumber?: boolean
//     ) =>
//     (e: ChangeEvent<HTMLInputElement>) => {
//       const value = e.target.value;

//       if (isNumber) {
//         const numericValue = value.replace(/[^0-9]/g, "");
//         setter(numericValue);
//       } else {
//         setter(value);
//       }
//     };

//   const HandleImageUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];

//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", preset_name);
//       console.log(file);

//       try {
//         const response = await axios.post<UploadResponse>(url, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         console.log(response.data);
//         setImage(response.data.secure_url);
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         toast.error("Failed to upload image. Please try again.");
//       }
//     }
//   };

//   return (
//     <>
//       <div>
//         <div>
//           <Button
//             style={{
//               backgroundColor: "#18BA51",
//               color: "white",
//               fontStyle: "inherit",
//             }}
//             onClick={handleOpen}
//           >
//             Add new food
//           </Button>
//         </div>
//         <div>
//           <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="create-food-modal"
//             aria-describedby="modal-to-add-food"
//           >
//             <Box sx={style}>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <img
//                   style={{ height: "12px", width: "12px", cursor: "pointer" }}
//                   src="/image copy 10.png"
//                   alt="Close"
//                   onClick={handleClose}
//                 />
//                 <h2 id="create-food-modal" style={{ textAlign: "center" }}>
//                   Create food
//                 </h2>
//                 <div></div>
//               </div>

//               <TextField
//                 fullWidth
//                 label="Хоолны нэр"
//                 variant="outlined"
//                 margin="normal"
//                 value={foodName}
//                 onChange={handleInputChange(setFoodName)}
//                 sx={{ backgroundColor: "#F4F4F4" }}
//               />

//               <TextField
//                 fullWidth
//                 label="Хоолны ангилал"
//                 variant="outlined"
//                 margin="normal"
//                 select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 sx={{ backgroundColor: "#F4F4F4" }}
//               >
//                 {categoryNames.map((el) => {
//                   return (
//                     <MenuItem key={el._id} value={el._id}>
//                       {el.categoryName}
//                     </MenuItem>
//                   );
//                 })}
//               </TextField>

//               <TextField
//                 fullWidth
//                 label="Хоолны орц"
//                 variant="outlined"
//                 margin="normal"
//                 value={ingredients}
//                 onChange={handleInputChange(setIngredients)}
//                 sx={{ backgroundColor: "#F4F4F4" }}
//               />

//               <TextField
//                 fullWidth
//                 label="Хоолны үнэ ₮"
//                 variant="outlined"
//                 margin="normal"
//                 value={price ? `${price}` : "₮"}
//                 onChange={handleInputChange(setPrice, true)}
//                 sx={{ backgroundColor: "#F4F4F4" }}
//               />

//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={onSale}
//                     onChange={(e) => setOnSale(e.target.checked)}
//                   />
//                 }
//                 label="Хямдралтай эсэх"
//                 style={{ marginTop: "15px" }}
//               />

//               <Typography variant="body1" style={{ marginTop: "15px" }}>
//                 Хоолны зураг
//               </Typography>

//               <Box
//                 sx={{
//                   border: "1px dashed grey",
//                   padding: "20px",
//                   marginTop: "10px",
//                   borderRadius: "10px",
//                   textAlign: "center",
//                   backgroundColor: "#f9f9f9",
//                   width: "284px",
//                   height: "122px",
//                   position: "relative",
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   style={{
//                     marginBottom: "10px",
//                     color: "#525252",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Хоолны зургийг нэмнэ үү
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   component="label"
//                   sx={{
//                     backgroundColor: "#333",
//                     color: "white",
//                     marginBottom: "10px",
//                   }}
//                 >
//                   Зураг нэмэх
//                   <input
//                     type="file"
//                     hidden
//                     onChange={HandleImageUpload}
//                     id="picture"
//                   />
//                 </Button>
//                 {image && (
//                   <Image
//                     width={284}
//                     height={122}
//                     alt="Uploaded image"
//                     src={image}
//                     style={{
//                       position: "absolute",
//                       top: "0",
//                       left: "0",
//                       borderRadius: "10px",
//                       objectFit: "cover",
//                     }}
//                   />
//                 )}
//               </Box>

//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   marginTop: "15px",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "15px",
//                   }}
//                 >
//                   <Button
//                     variant="text"
//                     color="secondary"
//                     onClick={handleClear}
//                   >
//                     Clear
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleSubmit}
//                   >
//                     Continue
//                   </Button>
//                 </div>
//               </div>
//             </Box>
//           </Modal>
//         </div>
//       </div>
//     </>
//   );
// };
type Pet = {
  id: number;
  name: string;
  breed: string;
  age: string;
  description: string;
  imageUrl: string;
};

const pets: Pet[] = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    age: "3 years",
    description: "Friendly and energetic, loves to play fetch!",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s",
  },
  {
    id: 2,
    name: "Whiskers",
    breed: "Siamese Cat",
    age: "2 years",
    description: "Calm and affectionate, enjoys lounging in the sun.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
  },
  {
    id: 3,
    name: "Rex",
    breed: "German Shepherd",
    age: "4 years",
    description: "Loyal and protective, great with families.",
    imageUrl:
      "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg",
  },
  {
    id: 4,
    name: "Fluffy",
    breed: "Persian Cat",
    age: "5 years",
    description: "Gentle and quiet, loves to be groomed.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s",
  },
  {
    id: 5,
    name: "Rex",
    breed: "German Shepherd",
    age: "4 years",
    description: "Loyal and protective, great with families.",
    imageUrl:
      "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg",
  },
  {
    id: 6,
    name: "Rex",
    breed: "German Shepherd",
    age: "4 years",
    description: "Loyal and protective, great with families.",
    imageUrl:
      "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg",
  },
  {
    id: 7,
    name: "Rex",
    breed: "German Shepherd",
    age: "4 years",
    description: "Loyal and protective, great with families.",
    imageUrl:
      "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg",
  },
  {
    id: 8,
    name: "Rex",
    breed: "German Shepherd",
    age: "4 years",
    description: "Loyal and protective, great with families.",
    imageUrl:
      "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg",
  },
  {
    id: 9,
    name: "Rex",
    breed: "German Shepherd",
    age: "4 years",
    description: "Loyal and protective, great with families.",
    imageUrl:
      "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg",
  },
];

type PetCategory = {
  names: string;
  imageUrl: string;
};

const types: PetCategory[] = [
  {
    names: "бүгд",
    imageUrl: "tomjerry.png",
  },
  {
    names: "нохой",
    imageUrl: "dog.jpeg",
  },
  {
    names: "муур",
    imageUrl: "cat.jpeg",
  },
  {
    names: "шувуу",
    imageUrl: "bird.png",
  },
  {
    names: "туулай",
    imageUrl: "rabbit.jpeg",
  },
  {
    names: "мэрэгч",
    imageUrl: "chipmunks.jpeg",
  },
  {
    names: "загас",
    imageUrl: "fish.jpeg",
  },
];
