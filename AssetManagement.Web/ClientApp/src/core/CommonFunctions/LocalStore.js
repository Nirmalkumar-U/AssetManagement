
const setItem = (key, value) => {
    localStorage.setItem(key, value);
};

const getItem = (key) => {
    return localStorage.getItem(key);
};

const removeItems = (key) => {
    localStorage.removeItem(key);
};

const setAllItems = (values) => {
    values.forEach(x => {
        localStorage.setItem(x.key, x.value);
    });
};

const clearAll = () => {
    localStorage.clear();
};

export default { setItem, getItem, removeItems, setAllItems, clearAll };
