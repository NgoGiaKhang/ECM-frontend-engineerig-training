import Container from "../../components/Container/Container";
import ProductList from "../product/components/ProductList/ProductList";

export default function HomePage() {
  return (
    <Container as={"section"}>
      <ProductList />
    </Container>
  );
}
