// mortcalc.js
console.log("js loaded \nwir bist bing chilling");
var isPloc = false;
var isPenalty = false;
var info = false;
const inputs = 
    ["ini_amt",
    "mort_term",
    "down_pay",
    "mort_interest",
    "credit_limit",
    "credit_rate",
    "savings",
    "penal_amt",
    "penal_type",
    ];

updatecredit();

function updatecredit() {
    isPloc = !isPloc;
    if(isPloc) {
        document.getElementById("credit_limit_label").innerHTML = "PLOC Credit Limit";
        document.getElementById("credit_rate_label").innerHTML = "PLOC Simple Interest Rate";
    } else {
        document.getElementById("credit_limit_label").innerHTML = "Credit Card Limit";
        document.getElementById("credit_rate_label").innerHTML = "Credit Card APR";
    }
    updateoutputs();
}

function togglepenalty() {
    isPenalty = !isPenalty;
    //console.log(isPenalty);
    if(isPenalty) {
        document.getElementById("penalty_config").removeAttribute("hidden");
    } else {
        document.getElementById("penalty_config").setAttribute("hidden", "");
    }
    updateoutputs();
}

function updateoutputs() {
    //get values from inputs
    var inputValues = [];
    for (var i = 0; i < inputs.length; i++) {
        var val = document.getElementById(inputs[i]).value;
        if (val == "") {
            val = document.getElementById(inputs[i]).getAttribute("placeholder");
        }
        inputValues[i] = parseFloat(val);
    }
    //process inputs
    //start with normal strategy
    var downPay = inputValues[0] * (inputValues[2] / 100);
    var principle = (inputValues[0] - downPay);
    var months = inputValues[1] * 12;
    var monthInterest = inputValues[3]/(100 * 12);
    var normMonth = principle * ((monthInterest * ((1 + monthInterest) ** months)) / (((1 + monthInterest) ** months) - 1));
    normMonth = parseInt(Math.round(normMonth));
    var normTotal = parseInt(Math.round(normMonth * months + downPay));
    var normInt = parseInt(normTotal - principle);

    //now for credit stuff
    var creditLimit = inputValues[4];
    var creditRate = inputValues[5] / (100 * 12);
    var savings = inputValues[6];
    var penalType = inputValues[8];
    var penalAmt = inputValues[7];
    var mortLeft = principle;
    var creditLeft = 0;
    var creditMonths = 0;
    var creditTotal = 0;
    var credMonthly = 0;
    var credInt = 0;
    var credYears = 0;
    var timeSaved = 0;
    var penalTotal = 0;
    var infLoop = false;
    if (isPloc) {
        var creditInterest = 0;
        for (; !((mortLeft <= creditLimit && creditLeft <= 0) || mortLeft <= savings);) {
            //console.log("creditLeft: " + creditLeft + " mortLeft: " + mortLeft);
            if (creditLeft <= 0) {
                mortLeft = mortLeft - (creditLimit - creditLeft);
                creditLeft = creditLimit;
            }
            creditInterest = Math.max(0, creditInterest - savings);
            creditLeft = creditLeft + Math.min(0, creditInterest - savings);
            creditInterest = creditInterest + creditLeft * creditRate;
            mortLeft = mortLeft + mortLeft * monthInterest;
            //console.log("months: " + creditMonths);
            if ((creditLeft >= creditLimit) || (creditTotal >= normTotal*10)) {
                var infLoop = true;
                console.log("infinite loop happening");
                document.getElementById("inf_loop_warning").removeAttribute("hidden");
                break;
            }
            creditMonths++;
            creditTotal = creditTotal + savings;
        }
        creditLeft = creditLeft + mortLeft;
        //console.log("penalty: " + isPenalty + " penaltype: " + penalType);
        if (isPenalty && penalType == 0) {
            penalTotal = creditLeft * (1 + creditRate) ** penalAmt - creditLeft;
            //console.log("credit left before penalty: " + creditLeft);
            creditInterest = creditInterest + creditLeft * (1 + creditRate) ** penalAmt - creditLeft;
            //console.log("credit interest after penalty: " + creditInterest);
        } else if (isPenalty && penalType == 1) {
            penalTotal = creditLeft * (penalAmt / 100);
            creditInterest = creditInterest + creditLeft * (penalAmt / 100);
        }
        for(; (creditLeft >= savings) && !infLoop; ) {
            creditLeft = creditLeft + (Math.min(0, creditInterest - savings));
            creditInterest = Math.max(0, creditInterest - savings);
            creditInterest = creditInterest + creditLeft * creditRate;
            creditMonths++;
            creditTotal = creditTotal + savings;
        }
    } else {
        for (; !((mortLeft <= creditLimit && creditLeft <= 0) || mortLeft <= savings);) {
            //console.log("creditLeft: " + creditLeft + " mortLeft: " + mortLeft);
            if (creditLeft <= 0) {
                mortLeft = mortLeft - (creditLimit - creditLeft);
                creditLeft = creditLimit;
            }
            creditLeft = creditLeft - savings;
            creditLeft = creditLeft * (1 + creditRate);
            mortLeft = mortLeft + mortLeft * monthInterest;
            //console.log("months: " + creditMonths);
            if ((creditLeft >= creditLimit) || (creditTotal >= normTotal*10)) {
                var infLoop = true;
                console.log("infinite loop happening");
                document.getElementById("inf_loop_warning").removeAttribute("hidden");
                break;
            }
            creditMonths++;
            creditTotal = creditTotal + savings;
        }
        creditLeft = creditLeft + mortLeft;
        if (isPenalty && penalType == 0) {
            penalTotal = creditLeft * (1 + creditRate) ** penalAmt - creditLeft;
            creditLeft = creditLeft * (1 + creditRate) ** penalAmt;
        } else if (isPenalty && penalType == 1) {
            penalTotal = creditLeft * (penalAmt / 100) - creditLeft;
            creditLeft = creditLeft + creditLeft * (penalAmt / 100);
        }
        for(; (creditLeft >= savings) && !infLoop; ) {
            creditLeft = creditLeft - savings;
            creditLeft = creditLeft + creditLeft * creditRate;
            creditMonths++;
            creditTotal = creditTotal + savings;
        }
    }
    creditMonths++;
    creditTotal = parseInt(creditTotal + (savings - creditLeft));
    credMonthly = parseInt(creditTotal / creditMonths);
    credYears = parseInt((creditMonths / 12) * 10) / 10;
    credInt = parseInt(creditTotal - principle);
    timeSaved = parseInt((inputValues[1] - credYears) * 10) / 10;
    penalTotal = parseInt(penalTotal);


    
    //debugging
    /*
    console.log("normal total cost: " + normTotal);
    console.log("normal montly payment: " + normMonth);
    console.log("monthly interest: " + monthInterest);
    console.log("months: " + months);
    console.log("principle: " + principle);
    console.log("normal extra interest cost: " + normInt);
    */

    //actually update the outputs
if(!infLoop) {
    document.getElementById("inf_loop_warning").setAttribute("hidden", "");
}
    document.getElementById("norm_month").innerHTML = "Normal monthly payment: $" + normMonth;
    document.getElementById("norm_total").innerHTML = "Total money spent without credit: $" + normTotal;
    document.getElementById("norm_int").innerHTML = "Extra cost due to interest without credit: $" + normInt;
    document.getElementById("cred_month").innerHTML = "Monthly payment with credit: $" + credMonthly;
    document.getElementById("cred_total").innerHTML = "Total money spent with credit: $" + creditTotal;
    document.getElementById("cred_int").innerHTML = "Extra cost due to interest with credit: $" + credInt;
    document.getElementById("time").innerHTML = "Time to pay off with credit: " + credYears + " years";
    document.getElementById("time_saved").innerHTML = "Time saved: " + timeSaved + " years";
    document.getElementById("save_rate").innerHTML = "Savings rate: " + parseInt(((normTotal - creditTotal) / normTotal) * 100) + "% of normal total";
    document.getElementById("extra_penalty").innerHTML = "Cost of Penalty: $" + penalTotal;
}

function openinfo() {
    info = !info;
    if (info) {
        document.getElementById("info_overlay").removeAttribute("hidden");
        document.getElementById("info_overlay").setAttribute("opacity", "1");
    } else {
        document.getElementById("info_overlay").setAttribute("hidden", "");
        document.getElementById("info_overlay").setAttribute("opacity", "0");
    }
    
}