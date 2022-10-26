function ObtenerTurnosDelLocalStorage() {
  let turnosLocal = JSON.parse(localStorage.getItem("turnos"));

  if (turnosLocal != null) {
    return turnosLocal;
  } else {
    return [];
  }
}

const contenedor = document.getElementById("contenedor");

const cargarCardContacto = (turno) => {
  contenedor.innerHTML += `
      <div class="col-sm-12 col-md-4 col-lg-3 p-2">
          <div class="card me-2" style="height: 16rem">
           
              <div class="card-body">
                  <h5 class="card-title">Paciente:</h5>
                  <h3 class="card-title">${turno.paciente}</h3>
                  <p class="card-text"></p>
                  <p class="card-title"">Profesional: ${turno.profesional}</p>
                  <p class="card-text">Fecha: ${turno.fecha}</p>
                  <p class="card-text">Hora: ${turno.hora}</p>
              </div>
          </div>
      </div>
      `;
};
const turnosObtenidos = ObtenerTurnosDelLocalStorage();
console.log("previo orden");
const turnosOrdenados = turnosObtenidos.sort((a, b) => {
  if(a.Date > b.Date ){
    return 1;
  }
  if(a.Date < b.Date){
    return -1;
  }
  return 0
});

RenderizarCards(turnosOrdenados);

function RenderizarCards(turnos) {
  const contenedor = document.getElementById("contenedor");

  turnos.forEach((turno) => {
    cargarCardContacto(turno);
    
  });
}

function crearCard(turno) {
  const labelPaciente = document.createElement("label");
  labelPaciente.innerText = turno.paciente;

  const labelProfesional = document.createElement("label");
  labelProfesional.innerText = turno.profesional;

  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.appendChild(labelPaciente);
  card.appendChild(labelProfesional);

  return card;
}
