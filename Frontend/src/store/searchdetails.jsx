import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  SimpleGrid,
  Text,
  Button,
  Card,
  CardBody,
  Stack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

const SearchResultsPage = () => {
  const location = useLocation(); // To access the search query from the URL
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Extract query from the URL
  const searchQuery = new URLSearchParams(location.search).get("query");

  // Get the theme values for the colors (same as in ProductCard)
  const cardBg = useColorModeValue("custom.bgLight", "custom.bgDark");
  const textColor = useColorModeValue("custom.textLight", "custom.textDark");
  const buttonBg = useColorModeValue("custom.button", "custom.button");
  const buttonHover = useColorModeValue("custom.buttonHover", "custom.buttonHover");

  useEffect(() => {
    // Fetch products based on the search query
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/product-list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ names: [searchQuery] }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data.length > 0) {
            setProducts(data.data);
          } else {
            setError("No products found.");
          }
        } else {
          setError("Failed to fetch products.");
        }
      } catch (error) {
        setError("An error occurred while fetching the products.");
      }
    };

    if (searchQuery) {
      fetchProducts();
    } else {
      setError("Search query is missing.");
    }
  }, [searchQuery]);

  return (
    <Box p={0} m={0} minHeight="100vh" mt={50}>
      {error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
              <Card
                borderRadius="md"
                boxShadow="md"
                bg={cardBg}
                cursor="pointer"
                _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
              >
                <CardBody>
                  <Stack spacing={4}>
                    <Image
                      src={product.image || "https://via.placeholder.com/150"} // Placeholder if no image
                      alt={product.name}
                      borderRadius="md"
                    />
                    <Text fontSize="xl" fontWeight="bold" color={textColor}>
                      {product.name}
                    </Text>
                    <Button
                      bg={buttonBg}
                      color="white"
                      _hover={{ bg: buttonHover }}
                      width="100%"
                      mt={4}
                    >
                      View Details
                    </Button>
                  </Stack>
                </CardBody>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default SearchResultsPage;
