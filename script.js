<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Resultados Florida</title>

<style>
  body {
    font-family: Arial, sans-serif;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 6px;
    text-align: center;
    border: 1px solid #ccc;
  }

  th.fecha  { background-color: #ff6600; color: white; }
  th.turno  { background-color: #007bff; color: white; }
  th.pick3  { background-color: #28a745; color: white; }
  th.pick4  { background-color: #6f42c1; color: white; }

  tr.destacado {
    background-color: orange;
    color: white;
    font-weight: bold;
  }
</style>
</head>

<body>

<h2>Resultados Florida</h2>

<div id="resultados">Cargando resultados...</div>

<script>
document.addEventListener("DOMContentLoaded", () => {

  fetch("resultados_fl.json?v=" + Date.now())
    .then(res => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(text => {
      const data = JSON.parse(text);
      mostrarResultados(data);
    })
    .catch(err => {
      console.error(err);
      document.getElementById("resultados").innerHTML =
        "<p>Error al cargar los resultados</p>";
    });

  function mostrarResultados(data) {

    if (!Array.isArray(data) || data.length === 0) {
      document.getElementById("resultados").innerHTML =
        "<p>No hay resultados disponibles</p>";
      return;
    }

    data.sort((a, b) => {
      const fa = new Date(a.Fecha);
      const fb = new Date(b.Fecha);
      if (fb - fa !== 0) return fb - fa;
      return a.DiaNoche === "Noche" ? -1 : 1;
    });

    let html = `
      <table>
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

    data.forEach((r, i) => {
      html += `
        <tr class="${i === 0 ? "destacado" : ""}">
          <td>${new Date(r.Fecha).toLocaleDateString("es-ES")}</td>
          <td>${r.DiaNoche}</td>
          <td>${r.Pick3}</td>
          <td>${r.Pick4}</td>
        </tr>
      `;
    });

    html += "</tbody></table>";
    document.getElementById("resultados").innerHTML = html;
  }

});
</script>

</body>
</html>
