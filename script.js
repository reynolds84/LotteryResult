// URL de tu archivo JSON en GitHub (reemplaza TU_USUARIO y TU_REPOSITORIO)
const jsonUrl = "https://raw.githubusercontent.com/reynolds84/LotteryResult/main/resultados_fl.json";

// Cargar el archivo JSON desde GitHub
fetch(jsonUrl)
  .then(res => res.json())
  .then(data => {
    mostrarResultados(data);
  })
  .catch(err => {
    console.error("Error al cargar el JSON", err);
    document.getElementById("resultados").innerHTML = "<p>Error al cargar los resultados</p>";
  });

function mostrarResultados(data) {
  if (!data || data.length === 0) {
    document.getElementById("resultados").innerHTML = "<p>No hay resultados disponibles</p>";
    return;
  }

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
        <td>${r.Fecha}</td>
        <td>${r.DiaNoche}</td>
        <td>${r.Pick3}</td>
        <td>${r.Pick4}</td>
      </tr>
    `;
  });

  html += "</tbody></table>";
  document.getElementById("resultados").innerHTML = html;
}




