const civicSip = require('civic-sip-api');
const express = require('express');
const app = express();
const PORT = 3000;

// Step 4: Initialize instance passing your appId and secret.
const civicClient = civicSip.newClient({
    appId: 'WHryoAjz0',
    prvKey: '97272ff7751c3cbd5822fa8c7531a2a5c3fb29ad625b6b51e4761eec7de00e73',
    appSecret: 'c0c6161ec58f701682b18add5550bb9f',
});

app.get('/submit', (req, res) => {
    var token = req.query.token;
    // Step 5: Exchange authorization code for user data.
    civicClient.exchangeCode(token)
        .then((userData) => {
            // store user data and userId as appropriate
            console.log('userData = ', JSON.stringify(userData, null, 4));
            res.send({success: true, response: userData});
        }).catch((error) => {
            console.log(error);
            res.send({success: false, response: error})
        });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))