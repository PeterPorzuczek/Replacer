const translate = require('translate-google')

const textsSE = {
    previewInput: "Om inget anges i fältet ovan sparas designen med dagens datum och design id. ",
    showPreviewInput: "Spara som designmall",
    title: "Spara din design",
    label: "Namn för designmall",
    info:
        "Om inget anges i fältet ovan sparas designen med dagens datum och design id. ",
    ok: "Spara",
    cancel: "Nej"
}

const textsNO = {
    previewInput: `Hvis ingenting er oppgitt i feltet over, lagres designen med dagens dato og design -ID.`,
    showPreviewInput: `Spar som designmal`,
    title: `Lagre designen din`,
    label: `Navn for designmal`,
    info: `Hvis ingenting er oppgitt i feltet over, lagres designen med dagens dato og design -ID.`,
    ok: `Lagre`,
    cancel: `Nei`,
}

const textsDA = {
    previewInput: `Hvis der ikke er angivet noget i marken ovenfor, gemmes designet med dagens dato og design -ID.`,
    showPreviewInput: `Gem som designskabelon`,
    title: `Gem dit design`,
    label: `Navn til designskabelon`,
    info: `Hvis der ikke er angivet noget i marken ovenfor, gemmes designet med dagens dato og design -ID.`,
    ok: `Gemme`,
    cancel: `Ingen`,
}

const textsEN = {
    previewInput: "Preview name input",
    showPreviewInput: "Change preview name",
    title: "Save your design",
    label: "Design template name",
    info:
        "If nothing is entered in the field above, the design is saved with today's date and design id.",
    ok: "Save",
    cancel: "No"
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateValueTo(lang, obj) {
    let result = {};

    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = obj[key];
        try {
            let res = await translate(value, { from: 'sv', to: lang });
            result[key] = res;
            console.log(`${key}: \`${res}\`,`);
        } catch (err) {
            console.error(err);
        }

        // wait for 0.xx seconds before the next translation
        await delay((i + 1) * 1050);
    }

    return result;
}
function replaceSpecialChars(format, obj, prefix = "") {
    let result = "";

    for (let key in obj) {
        let value = obj[key]
        if (typeof obj[key] === 'string') {
            // code: https://docstore.mik.ua/orelly/java-ent/servlet/appd_01.htm
            value =
                value
                    .replace(/å/g, `\\u00E5`)
                    .replace(/æ/g, `\\u00E6`)
                    .replace(/ä/g, `\\u00E4`)
                    .replace(/ø/g, `\\u00F8`)
                    .replace(/ö/g, `\\u00F6`)
                    .replace(/%/g, `\\u0025`)
                    .replace(/Å/g, `\\u00C5`)
                    .replace(/Ö/g, `\\u00D6`)
                    .replace(/-/g, `\\U2212`)
        }
        if (format == "javascript") {
            result += `  ${key}: "${value}",\n`;
        }
        if (format == "properties") {
            const kebabKey = key
                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                .toLowerCase();
            result += `${prefix}.${kebabKey}=${value}\n`;
        }
        if (format == "xslVariables") {
            const kebabKey = key
                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                .toLowerCase();
            result += `<xsl:variable name="${key}" select="//translations/translation[@attribute = '${prefix}.${kebabKey}']" />\n`;
        }
        if (format == "xslValues") {
            result += `<xsl:value-of select="\$${key}"/>\n`;
        }
        if (format == "xslJavascript") {
            result += `  ${key}: "<xsl:value-of select="\$${key}"/>",\n`;
        }
    }

    return result;
}

///*

// 
const javascriptFormat = `
    texts: {
      ${replaceSpecialChars("javascript", textsSE)}
    }
`
console.log(javascriptFormat);
console.log(`\n`);
// 


// 
console.log(`SE`);
const propertiesSEFormat = `
${replaceSpecialChars("properties", textsSE, "item.details.designNameModal")}
`
console.log(propertiesSEFormat);
console.log(`\n`);


console.log(`NO`);
const propertiesNOFormat = `
${replaceSpecialChars("properties", textsNO, "item.details.designNameModal")}
`
console.log(propertiesNOFormat);
console.log(`\n`);


console.log(`DA`);
const propertiesDAFormat = `
${replaceSpecialChars("properties", textsDA, "item.details.designNameModal")}
`
console.log(propertiesDAFormat);
console.log(`\n`);

console.log(`EN`);
const propertiesENFormat = `
${replaceSpecialChars("properties", textsEN, "item.details.designNameModal")}
`
console.log(propertiesENFormat);
console.log(`\n`);
// 


// 
const xslVariablesFormat = `
${replaceSpecialChars("xslVariables", textsSE, "item.details.designNameModal")}
`
console.log(xslVariablesFormat);
console.log(`\n`);
// 


// 
const xslJavascriptFormat = `
${replaceSpecialChars("xslJavascript", textsSE, "item.details.designNameModal")}
`
console.log(xslJavascriptFormat);
console.log(`\n`);
// 


// 
const xslValuesFormat = `
${replaceSpecialChars("xslValues", textsSE, "item.details.designNameModal")}
`
console.log(xslValuesFormat);
console.log(`\n`);
// 

//*/

function translateToLangs() {
    /*
    console.log(`SE`);
    console.log(translateValueTo("se", textsSE));
    */
    /*
    console.log(`NO`);
    console.log(translateValueTo("no", textsSE));
    */
    /*
    console.log(`DA`);
    console.log(translateValueTo("da", textsSE));
    */
    /*
    console.log(`EN`);
    console.log(translateValueTo("en", textsSE));
    */
}

translateToLangs();