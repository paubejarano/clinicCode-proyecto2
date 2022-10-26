function obtenerTurnos() {
  //leer del local storage
  return [
    {
      fecha: "",
      hora: "",
      paciente: "pepe ruiz",
      profesional: "luis torres",
      notas: "",
    },

    {
      fecha: "",
      hora: "",
      paciente: "rubén Vizcarra",
      profesional: "carlos Pineda",
      notas: "",
    },
  ];
}

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
          <div class="card">
           
              <div class="card-body">
                  <h5 class="card-title">${turno.paciente}</h5>
                  <p class="card-text">${turno.fecha}</p>
                  <p class="card-text">${turno.hora}</p>
              </div>
          </div>
      </div>
      `;
};

const turnosObtenidos = ObtenerTurnosDelLocalStorage();
console.log("previo orden")
const turnosOrdenados = turnosObtenidos.sort((a,b)=>{

  const fechaA = Date(a.fecha);
  const fechaB = Date(b.fecha);

  return fechaA < fechaB
})
console.log("turnos", turnosOrdenados);
RenderizarCards(turnosOrdenados);

function RenderizarCards(turnos) {
  const contenedor = document.getElementById("contenedor");

  turnos.forEach((turno) => {

    cargarCardContacto(turno)
    /*const card = crearCard(turno);
    contenedor.appendChild(card);
    */
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
