export default (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "Ribu";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "Juta";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "Miliar";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
    const currency = rp ? `Rp${n}` : `${n}`;
    return currency;
};