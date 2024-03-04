function convertBackFromCamelCase(text){
    const result = text.replace(/([A-Z]|\d+)/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult.trim();
}

export default convertBackFromCamelCase;