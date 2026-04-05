# upn-library

A simple JS library for creating UPN QR codes using the https://www.npmjs.com/package/qrcode package

# installation: 

Inside your project folder:

```shell
npm i upn-library-v2
```

# usage

Example using VueJs

```html
<script>
import { generateUPNQR } from "upn-library-v2";

export default {
    name: "QrCodePage",
    async mounted() {
        this.$refs.qrCodeImg = await generateUPNQR({
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