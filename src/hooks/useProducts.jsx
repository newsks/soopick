import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts as fetchProducts ,addNewProduct } from '../api/firebase';

export default function useProducts(){
    const queryClient = useQueryClient();

    const productsQuery = useQuery(['products'], fetchProducts, {
        staleTime: 1000 * 60,
    })  //어떤 캐시를 사용하는지

    const addProduct = useMutation(
        ({product, url})=> addNewProduct(product, url),
        {
           onSuccess:()=> queryClient.invalidateQueries(['products']),
        }
    );  // 어떤걸 업데이트하는지
    return { productsQuery, addProduct };
}