import { useParams } from "react-router-dom"
import Billboard from "./bilboard"
import { useProducts, useProductsFilter } from "@/hooks/useProducts"
import ProductSection from "@/components/product/product-section"
import { LoadingSpinner } from "@/components/ui/spinner"
import { useEffect, useState } from "react"
import { IProduct } from "@/types"
import { getProducts } from "@/services/e-com-services"
import Product from "./product"

const Category = () =>
{
    const { category, product, pid, cid } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [productData, setProductData] = useState<IProduct[]>()


    useEffect(() =>
    {
        setIsLoading(true)
        const getProductFromAPI = async () =>
        {
            const data = await getProducts({ categoryId: cid })
            setProductData(data)
        }
        getProductFromAPI()
        setIsLoading(false)
    }, [cid])

    if (category && cid && !product && !pid)
        return (
            <>
                <Billboard categoryId={cid} />
                {isLoading ? <LoadingSpinner /> : <ProductSection productsData={productData} />}
            </>
        )
    if (category && cid && product && pid)
        return (
            <>
              <Product productId={pid} />
            </>
        )


}

export default Category
