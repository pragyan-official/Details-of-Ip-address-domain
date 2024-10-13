document.getElementById('lookupBtn').onclick = async function() {
    const ip = document.getElementById('ipInput').value;

    // Use the IP API to get general info about the IP
    const ipInfo = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await ipInfo.json();

    const resultDiv = document.getElementById('result');
    
    if (data.status === 'fail') {
        resultDiv.innerHTML = 'Invalid IP Address or Domain';
        return;
    }

    resultDiv.innerHTML = `
        <p>IP: ${data.query}</p>
        <p>City: ${data.city}</p>
        <p>Region: ${data.regionName}</p>
        <p>Country: ${data.country}</p>
        <p>ZIP: ${data.zip}</p>
        <p>ISP: ${data.isp}</p>
    `;

    // Common ports to check
    const portsToCheck = [80, 443, 25565, 19132]; // Add more ports as necessary
    let portsResult = '';

    for (const port of portsToCheck) {
        try {
            const response = await fetch(`http://${ip}:${port}`, { method: 'HEAD' });
            if (response.ok) {
                portsResult += `<p>Status: Server is online on port ${port}!</p>`;
            }
        } catch (error) {
            // Ignore errors for closed ports
        }
    }

    if (portsResult === '') {
        resultDiv.innerHTML += `<p>Status: No common ports are open.</p>`;
    } else {
        resultDiv.innerHTML += portsResult;
    }
};
