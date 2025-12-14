<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Resultados Florida</title>
<style>
  table {
    width: 100%;
    border-collapse: collapse;
  text-align: center; /* Centra todo el contenido por defecto */
  }

  th {
    padding: 6px;
    color: white;
    ttext-align: center; /* Centra los encabezados */
  }

  th.fecha { background-color: #ff6600; }
  th.turno { background-color: #007bff; }
  th.pick3 { background-color: #28a745; }
  th.pick4 { background-color: #6f42c1; }

  td {
    padding: 6px;
    text-align: center;
  }

  tr.destacado {
    background-color: orange;
    color: white;
  }
</style>
</head>
<body>

<div id="resultados"></div>

<script>
// URL de tu archivo JSON en GitHub
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

  // Orden descendente por fecha y DiaNoche (Noche antes que Dia)
  data.sort((a, b) => {
    const fechaA = new Date(a.Fecha);
    const fechaB = new Date(b.Fecha);
    if (fechaB - fechaA !== 0) return fechaB - fechaA;
    if (a.DiaNoche === b.DiaNoche) return 0;
    return a.DiaNoche === "Noche" ? -1 : 1;
  });

  let html = `
    <table border="1">
      <thead>
        <tr>
          <th class="fecha">Fecha</th>
          <th class="turno">Turno</th>
          <th class="pick3">Pick 3</th>
          <th class="pick4">Pick 4</th>
        </tr>
      </thead>
      <tbody>
  `;

  data.forEach((r, index) => {
    html += `
      <tr class="${index === 0 ? 'destacado' : ''}">
        <td>${new Date(r.Fecha).toLocaleDateString('es-ES')}</td>
        <td>${r.DiaNoche}</td>
        <td>${r.Pick3}</td>
        <td>${r.Pick4}</td>
      </tr>
    `;
  });

  html += "</tbody></table>";
  document.getElementById("resultados").innerHTML = html;
}
</script>

</body>
</html>







