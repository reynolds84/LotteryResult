// URL de tu archivo JSON en GitHub (reemplaza TU_USUARIO y TU_REPOSITORIO)
const jsonUrl = "https://raw.githubusercontent.com/reynolds84/LotteryResult/main/resultados_fl.json";

// Cargar el archivo JSON desde GitHub
fetch(jsonUrl)
  .then(res => res.json())  // Convierte la respuesta en JSON
  .then(data => {
    mostrarResultados(data);  // Llama a la función para mostrar los resultados
  })
  .catch(err => {
    console.error("Error al cargar el JSON", err);
    document.getElementById("resultados").innerHTML = "<p>Error al cargar los resultados</p>";
  });

// Función para mostrar los resultados en una tabla
function mostrarResultados(data) {
  // Verificar que los datos son válidos
  if (!data || !data.resultados || data.resultados.length === 0) {
    document.getElementById("resultados").innerHTML = "<p>No hay resultados disponibles</p>";
    return;
  }

  // Crear la tabla de resultados
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

  // Recorrer los resultados y agregar filas a la tabla
  data.resultados.forEach(r => {
    html += `
      <tr>
        <td>${r.fecha}</td>
        <td>${r.dia_noche}</td>
        <td>${r.pick3}</td>
        <td>${r.pick4}</td>
      </tr>
    `;
  });

  html += "</tbody></table>";

  // Insertar la tabla en la página
  document.getElementById("resultados").innerHTML = html;
}





