import React from 'react'
import ZoomHover from 'components/ZoomHover'

interface PairProduct {
    name: string
    Icon?: React.ComponentType<any>
    color?: string
}

interface PairItem {
    slug: string
    description: string
}

interface PairsWithSlideProps {
    productName: string
    pairsWith: PairItem[]
    allProducts: any[]
}

export default function PairsWithSlide({ productName, pairsWith, allProducts }: PairsWithSlideProps) {
    return (
        <div className="h-full p-12 flex flex-col justify-center text-center bg-light dark:bg-dark">
            <h2 className="text-4xl font-bold text-primary mb-2">Pairs with...</h2>
            <p className="text-xl text-secondary max-w-4xl mx-auto mb-12">
                {productName} pairs with other products to give you a complete picture of your product.
            </p>
            <div className="grid grid-cols-3 gap-4">
                {pairsWith.map((pair: PairItem) => {
                    // Find the product details by slug
                    const productDetails = allProducts.find((product: any) => product.slug === pair.slug)
                    if (!productDetails) return null

                    return (
                        <ZoomHover key={productDetails.name}>
                            <div className="flex flex-col items-center border border-primary rounded p-4 bg-primary">
                                <span
                                    className={`inline-block size-8 my-4 ${
                                        productDetails.color
                                            ? 'text-' + productDetails.color
                                            : 'text-primary dark:text-primary-dark opacity-50'
                                    }`}
                                >
                                    {productDetails.Icon && <productDetails.Icon />}
                                </span>
                                <h3 className="text-2xl font-bold text-primary mb-2">{productDetails.name}</h3>
                                <p className="text-lg text-secondary">{pair.description}</p>
                            </div>
                        </ZoomHover>
                    )
                })}
            </div>
        </div>
    )
}
