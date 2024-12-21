// Navbar.js
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
  const handleSearch = (event) => {
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

    // Redirect to the search results page with the query
    navigate(`/search?query=${searchQuery}`);
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
