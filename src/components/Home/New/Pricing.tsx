import React from 'react'
import useProducts from 'hooks/useProducts'
import useProduct from 'hooks/useProduct'
import OSTable from 'components/OSTable'

const productsToShow = ['analytics', 'feature flags', 'session replay', 'data warehouse']

function numberToWords(num: number): string {
    if (num >= 1_000_000) {
        return `${num / 1_000_000} million`
    } else if (num >= 1_000) {
        return num.toLocaleString()
    }
    return num.toString()
}

export default function Pricing() {
    const { products: initialProducts } = useProducts()
    const products = initialProducts.filter((product) => productsToShow.includes(product.name.toLowerCase()))
    console.log(products)
    return (
        <div className="mt-4">
            <OSTable
                columns={[
                    { name: '', width: '50px', align: 'center' as const },
                    { name: 'product', width: 'minmax(200px,1fr)', align: 'left' as const },
                    { name: 'free tier', width: 'minmax(200px,1fr)', align: 'left' as const },
                    { name: 'pricing (decreases with volume)', width: 'minmax(200px,2fr)', align: 'left' as const },
                ]}
                rows={products.map((product, index) => ({
                    cells: [
                        { content: index + 1 },
                        {
                            content: (
                                <span className="flex items-center space-x-1">
                                    <product.Icon className={`inline-block size-4 text-${product.color}`} />
                                    <span>{product.name}</span>
                                </span>
                            ),
                        },
                        { content: `${numberToWords(product.freeLimit)} ${product.unit}s/mo` },
                        {
                            content: (
                                <span>
                                    $
                                    {product.startsAt.length <= 3
                                        ? Number(product.startsAt).toFixed(2)
                                        : product.startsAt}
                                    /{product.unit}
                                </span>
                            ),
                        },
                    ],
                }))}
            />
        </div>
    )
}
