
const validateField = (value, type) => {

    if (type == "string") {
        return !isNullOrEmpty(value);
    } else if (type == "number") {
        return !isNullOrEmptyOrZero(value);
    }
};

const isNullOrEmpty = (str) => {
    str = str == null ? '': str.toString();
    return !str || str.trim() === "";
};

const isNullOrEmptyOrZero = (str) => {
    str = str == null ? '' : str.toString();
    return !str || str.trim() === "" || str === "0";
};

const ifNullSetEmpty = (str) => str == null || str == undefined ? '' : str;

const ifEmptySetNull = (str) => str == '' ? null : str;

export default { validateField, isNullOrEmpty, isNullOrEmptyOrZero, ifNullSetEmpty, ifEmptySetNull };
