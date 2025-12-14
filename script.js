// URL de tu archivo JSON en GitHub (reemplaza TU_USUARIO y TU_REPOSITORIO)
const jsonUrl = "https://raw.githubusercontent.com/reynolds84/LotteryResult/main/resultados_fl.json";

// Cargar el archivo JSON desde GitHub
fetch(jsonUrl)
  .then(res => {
    console.log("Status:", res.status);
    return res.json();
  })
  .then(data => {
    console.log("Data:", data);
    mostrarResultados(data);
  })
  .catch(err => {
    console.error("Error al cargar el JSON", err);
  });

function mostrarResultados(data) {
  if (!data || data.length === 0) {
    document.getElementById("resultados").innerHTML = "<p>No hay resultados disponibles</p>";
    return;
  }

  // Orden descendente por fecha y DiaNoche
  data.sort((a, b) => {
    const fechaA = new Date(a.Fecha);
    const fechaB = new Date(b.Fecha);
    if (fechaB - fechaA !== 0) return fechaB - fechaA;
    if (a.DiaNoche === b.DiaNoche) return 0;
    if (a.DiaNoche === "Noche") return -1;
    return 1;
  });

  let html = `
    <table border="1" cellpadding="6" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #007bff; color: white;">
          <th>Fecha</th>
          <th>Turno</th>
          <th>Pick 3</th>
          <th>Pick 4</th>
        </tr>
      </thead>
      <tbody>
  `;

  data.forEach(r => {
    html += `
      <tr>
        <td>${new Date(r.Fecha).toLocaleDateString()}</td>
        <td>${r.DiaNoche}</td>
        <td>${r.Pick3}</td>
        <td>${r.Pick4}</td>
      </tr>
    `;
  });

  html += "</tbody></table>";
  document.getElementById("resultados").innerHTML = html;
}



