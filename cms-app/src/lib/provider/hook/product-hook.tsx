import { useContext } from "react"
import ProductContext from "../../../context/ProductContext"

export const useProduct = () => {
    const productCtx = useContext(ProductContext)
    return {...productCtx}
}