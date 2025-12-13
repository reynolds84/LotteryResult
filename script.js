const SUPABASE_URL = "https://cjwkmtqpzvkpxjlfcyzg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqd2ttdHFwenZrcHhqbGZjeXpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNDEwMDMsImV4cCI6MjA3NTYxNzAwM30.vFwABypAsnw15vMpo3_A--ayRwUkq6iQJYUXBbbQxs8";

// --- OBTENER DATOS DE SUPABASE ---
fetch(`${SUPABASE_URL}/rest/v1/resultados?select=fecha,dia_noche,pick3,pick4,lottery&order=fecha.desc`, {
    headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
    }
})
.then(res => res.json())
.then(data => {
    if (data.length === 0) {
        document.getElementById("resultados").innerHTML = "<p>No hay resultados todavía</p>";
        return;
    }

    // Crear tabla HTML
    let html = `
        <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px; margin: auto;">
            <tr style="background-color: #007bff; color: white;">
                <th>Fecha</th>
                <th>Turno</th>
                <th>Pick 3</th>
                <th>Pick 4</th>
                <th>Lottery</th>
            </tr>
    `;

    data.forEach(r => {
        html += `
            <tr>
                <td>${r.fecha}</td>
                <td>${r.dia_noche}</td>
                <td>${r.pick3}</td>
                <td>${r.pick4}</td>
                 <td>${r.lottery}</td>
            </tr>
        `;
    });

    html += "</table>";

    document.getElementById("resultados").innerHTML = html;
})
.catch(err => {
    console.error(err);
    document.getElementById("resultados").innerHTML = "<p>Error cargando resultados</p>";
});



