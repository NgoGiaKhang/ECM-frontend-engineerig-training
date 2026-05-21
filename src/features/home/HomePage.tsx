import React from 'react'
import ProductList from '../product/components/ProductList/ProductList'
import Container from '../../components/Container/Container'

type Props = {
}

export default function HomePage({ }: Props) {
  return (
    <Container as={'section'}>
      <ProductList />
    </Container>
  )
}
