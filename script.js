const baseUrl = 'https://api.green-api.com';

async function makeRequest(method, endpoint, body = null) {
    const idInstance = document.getElementById('idInstance').value;
    const apiToken = document.getElementById('apiToken').value;

    if (!idInstance || !apiToken) {
        alert("Пожалуйста, введите idInstance и ApiTokenInstance.");
        return;
    }

    const url = `${baseUrl}/waInstance${idInstance}/${endpoint}/${apiToken}`;
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        document.getElementById('responseField').value = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('responseField').value = 'Ошибка: ' + error.message;
    }
}

function getSettings() {
    makeRequest('GET', 'getSettings');
}

function getStateInstance() {
    makeRequest('GET', 'getStateInstance');
}

function sendMessage() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const message = document.getElementById('message').value;
    
    if (!phoneNumber || !message) {
        alert("Пожалуйста, введите номер телефона и сообщение.");
        return;
    }

    const messageData = {
        chatId: `${phoneNumber}@c.us`,
        message: message
    };
    
    makeRequest('POST', 'sendMessage', messageData);
}

function sendFileByUrl() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const fileUrl = document.getElementById('fileUrl').value;
    
    if (!phoneNumber || !fileUrl) {
        alert("Пожалуйста, введите номер телефона и URL файла.");
        return;
    }

    const fileData = {
        chatId: `${phoneNumber}@c.us`,
        urlFile: fileUrl
    };
    
    makeRequest('POST', 'sendFileByUrl', fileData);
}
