import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponents";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList"


export default function Catalog() {
    const products = useAppSelector(state => productSelectors.selectAll(state));//productSelectors.selectAll
    const {productsLoaded,status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (!productsLoaded) dispatch(fetchProductsAsync());
    },[productsLoaded,dispatch])

    if (status.includes('pending')) return <LoadingComponent message="loading products from catalog"/>

    return (
        <>
        <ProductList products={products}/>
        </>

    )
}