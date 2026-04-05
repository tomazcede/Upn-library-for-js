import QRCode from "qrcode";

function formatDate(date) {
    if(!date || typeof date !== Date)
        return ""

    return  String(date.getDate()).padStart(2, '0') + '.' +
            String(date.getMonth() + 1).padStart(2, '0') + '.' +
            date.getFullYear();
}

function formatPrice(price) {
    return ((price * 100) + "").padStart(11, "0")
}

function formatIban(iban) {
    return iban.replace(/\s/g, '')
}

function calculateControlSum(fields) {
    return 19 + fields.reduce((total, str) => {
        return total + str.length
    }, 0);
}

function generateText(fields) {
    return fields.reduce((final, str) => {
        return final + str + "\n"
    }, "") + calculateControlSum(fields) + "";
}

function validateOption(object, option, level = '') {
    if (object[option] === undefined || object[option] === null) {
        throw new Error(`${level} ${option} is not defined, define it using options.${level ? level + "." : ''}${option}`)
    }
}

function validateOptions(options) {
    if (!options) throw new Error('Options are not defined');

    const requiredTopLevel = ['payer', 'payee', 'price', 'payment_date', 'title_code', 'title', 'due_date', 'reference'];
    for (const field of requiredTopLevel) {
        validateOption(options, field)
    }

    const payerFields = ['name', 'surname', 'address', 'zip', 'city'];
    for (const field of payerFields) {
        validateOption(options.payer, field, 'Payer')
    }

    const receiverFields = ['iban', 'title', 'address', 'zip', 'city'];
    for (const field of receiverFields) {
        validateOption(options.payee, field, 'Payee')
    }
}

export async function generateUPNQR(options, size = 300) {
    validateOptions(options)

    let fields = [
        "UPNQR",
        formatIban(options.payer.iban ?? ""),
        "",
        "",
        "",
        options.payer.name + " " + options.payer.surname + "",
        options.payer.address + "",
        options.payer.zip + " " + options.payer.city + "",
        formatPrice(options.price) + "",
        formatDate(options.payment_date),
        "",
        options.title_code ?? 'COST',
        options.title  + "",
        formatDate(options.due_date) + "",
        formatIban(options.payee.iban) + "",
        options.reference + "",
        options.payee.title + "",
        options.payee.address + "",
        options.payee.zip + " " + options.payee.city +  "",
    ]

    let text = generateText(fields)

    return QRCode.toDataURL(text, {
        width: size,
    });
}