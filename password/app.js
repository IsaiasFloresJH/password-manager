const submitBtn = document.getElementById('submit-btn');
const credencialesTabla = document.getElementById('credenciales');

submitBtn.addEventListener('click', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    if (username && password) {
        const row = document.createElement('tr');
        const usernameCell = document.createElement('td');
        const passwordCell = document.createElement('td');
        
        usernameCell.innerText = username;
        passwordCell.innerText = password;
        
        row.appendChild(usernameCell);
        row.appendChild(passwordCell);
        
        credencialesTabla.appendChild(row);
        
        usernameInput.value = '';
        passwordInput.value = '';
    }
});

const guardarBtn = document.getElementById('guardar-btn');
guardarBtn.addEventListener('click', () => {
    const rows = credencialesTabla.querySelectorAll('tr');
    const data = [];

    rows.forEach(row => {
        const username = row.querySelector('td:first-child').innerText;
        const password = row.querySelector('td:last-child').innerText;
        data.push({ usuario: username, contraseña: password });
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Credenciales");
    XLSX.writeFile(wb, "credenciales.xlsx");
    console.log("Archivo guardado en: ", process.cwd());

});
