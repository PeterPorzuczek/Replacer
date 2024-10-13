const translate = require('translate-google')

const textsSE = {
    title: "Textilåtervinning",
    subheading: "Teckna abonnemang och ge dina kläder en andra chans",
    description: `<p>Cirkulära lösningar är en del av vårt klimatlöfte för att minska klimatavtrycket för allt 
      vi levererar till våra kunder med 50% på 5 år.</p>
      <p>Vår återvinningstjänst bygger på ett samarbete med Human Bridge och Sysav där vi erbjuder ett abonnemang på vår textillåda.</p>`,
    subscriptionInfoTitle: "ABONNEMANGSPERIOD",
    subscriptionInfoText: `<p>Abonnemanget löper tillsvidare utan bindningstid. Eventuell uppsägning sker till se.ops@lyreco.com</p>
      <p>Mer information om rutin för upphämtning skickas till er efter beställning.</p>`,
    subscriptionCost: "ABONNEMANGSKOSTNAD",
    perMonth: "månad",
    termsCheckboxLabel: "Jag har läst och godkänner",
    termsLinkText: "villkoren",
    buttonText: "Beställ låda",
    emptyParcelText: "Kostnad för tömning",
    emptyParcelCost: "125,00 kr / per kolli",
    confirmationHeading: "Stort tack för ert engagemang för miljön!",
    confirmationText: `<p>Din order kommer nu behandlas.</p>
    <p>Du väntas få en orderbekräftelse på ditt abonnemang inom en vecka tillsammans med rutin för upphämtning av dina textiler.</p>`,
    confirmationButtonText: "Stäng och Fortsätt handla"
}

const textsNO = {
    title: "Tekstilgjenvinning",
    subheading: "Registrer deg abonnement og gi klærne en ny sjanse",
    description: `<p> Sirkulære løsninger er en del av vårt klimapløft om å redusere klimaavtrykket for alt
          Vi leverer til våre kunder med 50% på 5 år. </p>
          <p> Vår gjenvinningstjeneste er basert på et samarbeid med Human Bridge og SYSAV hvor vi tilbyr et abonnement på tekstilboksen vår. </p>`,
    subscriptionInfoTitle: "Abonnementsperiode",
    subscriptionInfoText: `<p> abonnementet går så langt uten bindingstid.Eventuell oppsigelse blir gjort til se.ops@lyreco.com </p>
          <p> Mer informasjon om rutine for henting vil bli sendt til deg etter bestilling. </p>`,
    subscriptionCost: "Abonnementskostnad",
    perMonth: "måned",
    termsCheckboxLabel: "Jeg har lest og er enig",
    termsLinkText: "forholdene",
    buttonText: "Bestillingsboks",
    emptyParcelText: "Kostnad for tømming",
    emptyParcelCost: "125,00 SEK / per pakke",
    confirmationHeading: "Stor takk for ditt engasjement for miljøet!",
    confirmationText: `<p> Bestillingen din vil nå bli behandlet. </p>
        <p> Det forventes at du får en ordrebekreftelse på abonnementet ditt innen en uke sammen med rutine for å hente tekstilene dine. </p>"`,
    confirmationButtonText: "Lukk og fortsett å handle",
}

const textsDA = {
    title: `Tekstilgenvinding`,
    subheading: `Tilmeld dig abonnementer, og giv dit tøj en anden chance`,
    description: `<p> Cirkulære løsninger er en del af vores klimafrise om at reducere klimafraftet for alt
          Vi leverer til vores kunder med 50% på 5 år. </p>
          <p> Vores genbrugstjeneste er baseret på et samarbejde med Human Bridge og Sysav, hvor vi tilbyder et abonnement på vores tekstilkasse. </p>`,
    subscriptionInfoTitle: `Abonnementsperiode`,
    subscriptionInfoText: `<p> Abonnementet kører indtil videre uden bindingstid.Enhver opsigelse er lavet til se.ops@lyreco.com </p>
          <p> Mere information om rutine til afhentning vil blive sendt til dig efter bestilling. </p>`,
    subscriptionCost: `Abonnementsomkostninger`,
    perMonth: `måned`,
    termsCheckboxLabel: `Jeg har læst og enig`,
    termsLinkText: `betingelserne`,
    buttonText: `Bestillingsboks`,
    emptyParcelText: `Omkostninger ved tømning`,
    emptyParcelCost: `125,00 SEK / pr. Pakke`,
    confirmationHeading: `Stor tak for dit engagement i miljøet!`,
    confirmationText: `<p> Din ordre behandles nu. </p>
        <p> Det forventes at modtage en ordrebekræftelse på dit abonnement inden for en uge sammen med rutine til at hente dine tekstiler. </p>`,
    confirmationButtonText: `Luk og fortsæt med at shoppe`,
}

const textsEN = {
    title: `Textile recycling`,
    subheading: `Sign up subscriptions and give your clothes a second chance`,
    description: `<p> Circular solutions are part of our climate promise to reduce the climate imprint for everything
          We deliver to our customers by 50% in 5 years. </p>
          <p> Our recycling service is based on a collaboration with Human Bridge and Sysav where we offer a subscription to our textile box. </p>`,
    subscriptionInfoTitle: `Subscription period`,
    subscriptionInfoText: `<p> The subscription runs so far without binding time.Any termination is made to se.ops@lyreco.com </p>
          <p> More information about routine for pickup will be sent to you after ordering. </p>`,
    subscriptionCost: `Subscription cost`,
    perMonth: `month`,
    termsCheckboxLabel: `I have read and agree`,
    termsLinkText: `the conditions`,
    buttonText: `Order box`,
    emptyParcelText: `Cost of emptying`,
    emptyParcelCost: `125.00 SEK / per package`,
    confirmationHeading: `Big thanks for your commitment to the environment!`,
    confirmationText: `<p> Your order will now be processed. </p>
        <p> You are expected to receive an order confirmation on your subscription within a week along with routine for picking up your textiles. </p>`,
    confirmationButtonText: `Close and continue shopping`,
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateValueTo(lang, obj) {
    let result = {};

    for (let key in obj) {
        let value = obj[key];
        try {
            let res = await translate(value, {from: 'sv', to: lang});
            result[key] = res;
            console.log(`${key}: \`${res}\`,`);
        } catch(err) {
            console.error(err);
        }

        // wait for 0.25 seconds before the next translation
        await delay(450);
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
        }
        if (format == "javascript") {
            result += `  ${key}: "${value}",\n`;
        }
        if(format == "properties") {
            const kebabKey = key
                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                .toLowerCase();
            result += `${prefix}.${kebabKey}=${value}\n`;
        }
        if(format == "xslVariables") {
            const kebabKey = key
                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                .toLowerCase();
            result += `<xsl:variable name="${key}" select="//translations/translation[@attribute = '${prefix}.${kebabKey}']" />\n`;
        }
        if(format == "xslValues") {
            result += `<xsl:value-of select="\$${key}"/>\n`;
        }
        if (format == "xslJavascript") {
            result += `  ${key}: "<xsl:value-of select="\$${key}"/>",\n`;
        }
    }

    return result;
}







/*
const javascriptFormat = `
    texts: {
      ${replaceSpecialChars("javascript", textsSE)}
    }
`
console.log(javascriptFormat);
console.log(`\n`);
*/


///*
const propertiesFormat = `
${replaceSpecialChars("properties", textsNO, "recycling")}
`
console.log(propertiesFormat);
console.log(`\n`);
//*/


/*
const xslVariablesFormat = `
${replaceSpecialChars("xslVariables", textsSE, "recycling")}
`
console.log(xslVariablesFormat);
console.log(`\n`);
*/


/*

const xslJavascriptFormat = `
${replaceSpecialChars("xslJavascript", textsSE, "recycling")}
`
console.log(xslJavascriptFormat);
console.log(`\n`);
*/


/*
const xslValuesFormat = `
${replaceSpecialChars("xslValues", textsSE, "recycling")}
`
console.log(xslValuesFormat);
console.log(`\n`);
*/


function translateToLangs() {
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