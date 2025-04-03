const baseUrl = 'https://api.green-api.com';

async function makeRequest(endpoint, method = 'GET', body = null) {
    const idInstance = document.getElementById('idInstance').value;
    const apiToken = document.getElementById('apiToken').value;

    if (!idInstance || !apiToken) {
        alert("Please enter both idInstance and ApiTokenInstance.");
        return;
    }

    const url = `${baseUrl}/${endpoint}`;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
    };

    const options = {
        method: method,
        headers: headers
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        document.getElementById('responseField').value = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('responseField').value = 'Error: ' + error.message;
    }
}

function getSettings() {
    makeRequest('getSettings');
}

function getStateInstance() {
    makeRequest('getStateInstance');
}

function sendMessage() {
    const messageData = {
        "chatId": "phone_number_here",  // Замените на нужный номер
        "message": "Hello from GREEN-API!"
    };
    makeRequest('sendMessage', 'POST', messageData);
}

function sendFileByUrl() {
    const fileData = {
        "chatId": "phone_number_here",  // Замените на нужный номер
        "fileUrl": "https://example.com/file.jpg"  // Замените на URL файла
    };
    makeRequest('sendFileByUrl', 'POST', fileData);
}
