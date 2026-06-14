const converterType =
document.getElementById("converterType");

const from =
document.getElementById("from");

const to =
document.getElementById("to");

const units = {

    length:[
        "Meter",
        "Kilometer",
        "Centimeter"
    ],

    weight:[
        "Gram",
        "Kilogram",
        "Pound"
    ],

    temperature:[
        "Celsius",
        "Fahrenheit"
    ],

    currency:[
        "USD",
        "INR",
        "EUR",
        "GBP",
        "JPY"
    ]
};

function loadOptions(){

    const type =
    converterType.value;

    from.innerHTML = "";
    to.innerHTML = "";

    units[type].forEach(unit=>{

        from.innerHTML +=
        `<option>${unit}</option>`;

        to.innerHTML +=
        `<option>${unit}</option>`;
    });
}

converterType.addEventListener(
    "change",
    loadOptions
);

loadOptions();

async function convert(){

    const value =
    parseFloat(
        document.getElementById(
            "amount"
        ).value
    );

    const type =
    converterType.value;

    let result;

    if(type === "length"){

        result =
        convertLength(
            value,
            from.value,
            to.value
        );
    }

    else if(type === "weight"){

        result =
        convertWeight(
            value,
            from.value,
            to.value
        );
    }

    else if(type === "temperature"){

        result =
        convertTemperature(
            value,
            from.value,
            to.value
        );
    }

    else{

        result =
        await convertCurrency(
            value,
            from.value,
            to.value
        );
    }

    document.getElementById(
        "result"
    ).innerHTML =
    `Result: ${result}`;
}

function convertLength(
    value,
    fromUnit,
    toUnit
){

    const meterMap = {

        Meter:1,
        Kilometer:1000,
        Centimeter:0.01
    };

    return (
        value *
        meterMap[fromUnit]
    ) /
    meterMap[toUnit];
}

function convertWeight(
    value,
    fromUnit,
    toUnit
){

    const weightMap = {

        Gram:1,
        Kilogram:1000,
        Pound:453.592
    };

    return (
        value *
        weightMap[fromUnit]
    ) /
    weightMap[toUnit];
}

function convertTemperature(
    value,
    fromUnit,
    toUnit
){

    if(fromUnit === toUnit)
        return value;

    if(
        fromUnit === "Celsius" &&
        toUnit === "Fahrenheit"
    ){
        return (
            value * 9/5
        ) + 32;
    }

    return (
        value - 32
    ) * 5/9;
}

async function convertCurrency(
    amount,
    fromCurrency,
    toCurrency
){

    const response =
    await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );

    const data =
    await response.json();

    const rate =
    data.rates[toCurrency];

    return (
        amount * rate
    ).toFixed(2);
}