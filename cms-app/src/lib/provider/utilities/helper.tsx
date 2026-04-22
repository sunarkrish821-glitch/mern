export const priceFormat = (price: string | number) => {
    return Intl.NumberFormat('np-NP', {
        style: 'currency',
        currency: 'NPR'
    }).format(Number(price));
};