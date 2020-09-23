export default (number, rp = true) => {
    const currency = rp ? `Rp ${new Intl.NumberFormat('id-ID').format(number)}` : `${new Intl.NumberFormat('id-ID').format(number)}`;
    return currency;
};