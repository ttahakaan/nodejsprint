const http = require('http');
const express = require('express');
const app = express();
const path = require('path');


const printerIP = '10.10.2.73';


const textToPrint = 'Merhaba, ben bi test yazisiyim.';


const sendPrintRequest = () => {
    const options = {
        hostname: printerIP,
        type:"RAW",
        port: 9100,
        path: '/',
        method: 'POST',
        timeout: 10000, 
        headers: {
            'Content-Type': 'text/plain',
            'Content-Length': Buffer.byteLength(textToPrint)
        }
    };
    

    const req = http.request(options, (res) => {
        console.log(`Yazdırma isteği gönderildi, yanıt kodu: ${res.statusCode}`);
    });

    req.on('error', (error) => {
        console.error('Yazdırma isteği gönderilirken bir hata oluştu:', error);
    });

    req.write(textToPrint);
    
};

app.use(express.static(path.join(__dirname, 'public')));

// giriş sayfası
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//istek gönderme
app.post('/print', (req, res) => {
    sendPrintRequest();
    res.send('Yazdırma isteği gönderildi.');
});

// sunucu başlatma
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor, http://localhost:${PORT} adresinden erişebilirsiniz.`);
});
