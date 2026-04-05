# upn-library

A simple JS library for creating UPN QR codes using the https://www.npmjs.com/package/qrcode package
## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Example using VueJs](#example-using-vuejs)

## Installation 

Inside your project folder:

```shell
npm i upn-library-v2
```

## Usage

Import the function from the package:
```JS
import { generateUPNQR } from "upn-library-v2";
```

Call it using:
```JS
await generateUPNQR(options, size)
```

Function params:
- **options**: `Object` – contains the data of the UPN QR code. Fields:
```JS

{
  price: Number,           // *required* - amount to be paid
  title_code: String,      // *required* - default COST
  title: String,           // *required* - title of the payment "Payment for x"
  due_date: Date,          // *required* - payment due date
  reference: String,       // *required* - payment reference
  payment_date: Date,      // optional - actual payment date

  payer: {                 // *required* - payer information
    name: String,          // *required*
    surname: String,       // *required*
    address: String,       // *required*
    zip: String,           // *required*
    city: String,          // *required*
    iban: String           // optional
  },

  payee: {                 // *required* - payee information
    iban: String,          // *required*
    title: String,         // *required*
    address: String,       // *required*
    zip: String,           // *required*
    city: String           // *required*
  }
}
```


- **size**: `Number` – the size of the QR code (passed down to qrcode package), optional, default is 300


## Example using VueJs

```html
<script>
import { generateUPNQR } from "upn-library-v2";

export default {
    name: "QrCodePage",
    async mounted() {
        this.$refs.qrCodeImg.src = await generateUPNQR({
            price: 10,
            title_code: 'COST',
            title: 'Payment for x',
            due_date: new Date(),
            reference: 'SI00 xxxxx',
            
            payer: {
                name: 'x',
                surname: 'x',
                address:  'Example 14',
                zip: '1234',
                city: 'city'
            },
            
            payee: {
                title: 'X company',
                iban: 'SI100 00 00 00',
                address: 'Example 14',
                zip: '1234',
                city: 'city'
            }
        })
    }
}
</script>

<template>
<div>
    <img ref="qrCodeImg" />
</div>
</template>
```