

// import { Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { PlusSquareIcon } from "@chakra-ui/icons";
// import { IoMoon } from "react-icons/io5";
// import { LuSun } from "react-icons/lu";

// const Navbar = () => {
//   const { colorMode, toggleColorMode } = useColorMode();

//   // Use custom theme colors
//   const textColor = useColorModeValue("custom.textLight", "custom.textDark");
//   const headingColor = useColorModeValue("custom.bgLight", "custom.bgDark");
//   const buttonBg = useColorModeValue("custom.button", "custom.button");
//   const buttonHover = useColorModeValue("custom.buttonHover", "custom.buttonHover");

//   return (
//     <Container maxW={"1140px"} px={4}>
//       <Flex
//         h={16}
//         alignItems={"center"}
//         justifyContent={"space-between"}
//         flexDir={{
//           base: "column",
//           sm: "row",
//         }}
//       >
//         <Text
//           fontSize={{ base: "22", sm: "28" }}
//           fontWeight={"bold"}
//           textTransform={"uppercase"}
//           textAlign={"left"}
//           color={buttonBg} // Apply custom color
//         >
//           <Link to={"/"}>SpareParts Store</Link>
//         </Text>

//         <HStack spacing={2} alignItems={"center"}>
//           {/* <Link to={"/create"}>
//             <Button>
//               <PlusSquareIcon fontSize={20} />
//             </Button>
//           </Link> */}
//           <Button onClick={toggleColorMode}>
//             {colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
//           </Button>
//         </HStack>
//       </Flex>
//     </Container>
//   );
// };

// export default Navbar;


import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const toast = useToast(); // Chakra UI toast for notifications
  const navigate = useNavigate(); // React Router navigation
  const buttonBg = useColorModeValue("custom.button", "custom.button");

  // Handle Search
  const handleSearch = async (event) => {
    event.preventDefault();

    // Check if the search query is empty
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid product name.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Send the search request to the server
      const response = await fetch("http://localhost:5000/api/product-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ names: [searchQuery] }), // Send the search query as an array
      });

      if (response.ok) {
        const productData = await response.json();
        console.log("Product Response:", productData); // Debugging the response structure

        // Ensure that we received the correct data
        if (productData.success && productData.data.length > 0) {
          const product = productData.data[0]; // Get the first product
          navigate(`/product/${product.id}`); // Redirect to the product details page
        } else {
          toast({
            title: "Product Not Found",
            description: "No product found with the given name.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        // Handle failed response
        toast({
          title: "Product Search Failed",
          description: "There was an issue searching for the product.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Show error toast if API request fails
      toast({
        title: "Error",
        description: "Something went wrong while searching for the product.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        {/* Store Name */}
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"left"}
          color={buttonBg}
        >
          <Link to={"/"}>SpareParts Store</Link>
        </Text>

        {/* Navigation and Actions */}
        <HStack spacing={4} alignItems={"center"}>
          {/* Search Bar */}
          <form onSubmit={handleSearch}>
            <InputGroup size="md">
              <Input
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputRightElement>
                <Button
                  h="1.75rem"
                  size="sm"
                  type="submit"
                >
                  <SearchIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>

          {/* Toggle Color Mode */}
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
