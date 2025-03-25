document.getElementById('updateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const htmlData = document.getElementById('htmlData').value;
    const cssData = document.getElementById('cssData').value;
    const jsData = document.getElementById('jsData').value;
    
    const requestBody = {
        html: htmlData,
        css: cssData,
        js: jsData
    };
    
    fetch('/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('message');
        if (data.success) {
            messageDiv.style.backgroundColor = '#dff0d8';
            messageDiv.style.color = '#3c763d';
            messageDiv.innerHTML = 'Update successful!';
        } else {
            messageDiv.style.backgroundColor = '#f2dede';
            messageDiv.style.color = '#a94442';
            messageDiv.innerHTML = 'Update failed: ' + data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const messageDiv = document.getElementById('message');
        messageDiv.style.backgroundColor = '#f2dede';
        messageDiv.style.color = '#a94442';
        messageDiv.innerHTML = 'Update failed: Network error';
    });
});