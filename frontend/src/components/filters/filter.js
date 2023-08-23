const filter = (data, options) => {
    if (options === "Price (High to Low)") {
        return data?.slice().sort((a, b) => b.price - a.price);
    } else if (options === "Price (Low to High)") {
        return data?.slice().sort((a, b) => a.price - b.price);
    } else if (options === "Product (A - Z)") {
        return data?.slice().sort((a, b) => a.name.localeCompare(b.name) - b.name.localeCompare(a.name));
    } else if (options === "Product (Z - A)") {
        return data?.slice().sort((a, b) => b.name.localeCompare(a.name) - a.name.localeCompare(b.name));
    } else {
        return data;
    }
}

export default filter;
