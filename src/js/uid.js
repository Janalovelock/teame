export const guid = () => {
    let randy = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
    randy = randy.toString(18).slice(0, 5).padStart(5, "0").toLocaleUpperCase();
    return randy;
}