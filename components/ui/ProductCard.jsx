import { useState } from "react"; // ✅ Import useState
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { 
  Box, Heading, HStack, Image, Text, 
  IconButton, useColorModeValue, useToast, 
  Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalCloseButton, ModalBody, ModalFooter, Button, 
  FormControl, FormLabel, Input, useDisclosure
} from "@chakra-ui/react";
import { useProductStore } from "../../store/product";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore(); 
  const toast = useToast(); 
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ✅ Add state for form inputs
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.id]: e.target.value });
  };

  // ✅ Update API call with form data
  const handleUpdateProduct = async () => {
    try {
      const { success, message } = await updateProduct(product._id, updatedProduct); 
      
      if (success) {
        toast({
          title: "Success",
          description: "Product updated successfully",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      } else {
        throw new Error(message);
      }

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <Box shadow="lg" rounded="lg" overflow="hidden" transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }} bg={bg}>
      
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
      
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>${product.price}</Text>
        
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" aria-label="Edit Product" />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" aria-label="Delete Product" />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update the Product</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input id="name" type="text" value={updatedProduct.name} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="price">Price</FormLabel>
              <Input id="price" type="number" value={updatedProduct.price} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="image">Image URL</FormLabel>
              <Input id="image" type="url" value={updatedProduct.image} onChange={handleInputChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
            <Button variant="ghost" onClick={handleUpdateProduct}>Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
    </Box>
  );
};

export default ProductCard;
