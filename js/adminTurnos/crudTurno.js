class Turno {
  constructor(fecha, hora, paciente, profesional, notas) {
    this.fecha = fecha;
    this.hora = hora;
    this.paciente = paciente;
    this.profesional = profesional;
    this.notas = notas;
    this.id = Math.random();
  }
}
console.log("random", Math.random());
let turnos = [];

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("eliminar")) {
    const random = e.target.getAttribute("random");
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar paciente",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        turnos = turnos.filter((x) => x.id != random);
        actualizarTabla(turnos);
        agregarTurnoAlLocalStorage(turnos);
      }
      
    });
    
  }
});

const agregarTurnoAlLocalStorage = (turnos) => {
  const turnoLocalS = JSON.stringify(turnos);
  localStorage.setItem("turnos", turnoLocalS);
};

function ObtenerTurnosDelLocalStorage() {
  let turnosLocal = JSON.parse(localStorage.getItem("turnos"));

  if (turnosLocal != null) {
    return turnosLocal;
  } else {
    return [];
  }
}

function limpiarFormulario() {
  document.getElementById("formularioTurno").reset();
}

const turnosDelLocalStorage = ObtenerTurnosDelLocalStorage();
turnos = turnosDelLocalStorage;
actualizarTabla(turnosDelLocalStorage);
//
function guardarTurno(e) {
  e.preventDefault();

  const fecha = document.getElementById("inputCalendario").value;
  const hora = document.getElementById("selectHorario").value;
  const notas = document.getElementById("notasContacto").value;

  const paciente = document.getElementById("selectPaciente").value;
  const profesional = document.getElementById("selectProfecional").value;

  const turnoCreado = new Turno(fecha, hora, paciente, profesional, notas);

  turnos.push(turnoCreado);
  agregarTurnoAlLocalStorage(turnos);
  actualizarTabla(turnos);
  Swal.fire({
    title: "Exito",
    text: "El turno se creó exitosamente",
    icon: "success",
  });

  limpiarFormulario();
}

const profesionales = [
  { nombre: "Juan", apellido: "Flores (Médico General)", dni: "78456123" },
  { nombre: "Darío", apellido: "Pineda (Cardiología)", dni: "15456789" },
  { nombre: "Patricia", apellido: "Vera (Traumatología)", dni: "18785325" },
  { nombre: "Rosario", apellido: "Azar (Oftmalmología)", dni: "187653425" },
  { nombre: "Diego", apellido: "Silva (Pediatría)", dni: "1678532" },
];
const horarios = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11.30",
  "12:00",
  "12:30",
  "13:00",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

horarios.forEach((horaTurno)=>{
  const opcionHoraTurno=document.createElement("option");
  opcionHoraTurno.value= `${horaTurno}`;
  opcionHoraTurno.innerText= `${horaTurno}`;
  document.getElementById("selectHorario").appendChild(opcionHoraTurno);
})

const pacientes = obtenerPacientes();

pacientes.forEach((paciente) => {
  const optionPaciente = document.createElement("option");
  optionPaciente.value = paciente.nombre;
  optionPaciente.innerText = paciente.nombre;

  document.getElementById("selectPaciente").appendChild(optionPaciente);
});

profesionales.forEach((profesional) => {
  const optionProfesional = document.createElement("option");
  optionProfesional.value = profesional.nombre + " " + profesional.apellido;
  optionProfesional.innerText = profesional.nombre + " " + profesional.apellido;

  document.getElementById("selectProfecional").appendChild(optionProfesional);
});

const botonGuardar = document.getElementById("formularioTurno");
botonGuardar.addEventListener("submit", guardarTurno);

//carga los select con los nombres de los pacientes
const selectPaciente = document.getElementById("selectPaciente");

function obtenerPacientes() {
  //leer del local storage
  pacientesLocalStorage = JSON.parse(localStorage.getItem("pacientes"));

  return pacientesLocalStorage;
}

function actualizarTabla(turnos) {
  const tbodyTurnos = document.getElementById("tbody-turnos");
  tbodyTurnos.innerHTML = "";

  turnos.forEach((turno) => {
    const tr = document.createElement("tr");
    tr.classList.add(turno.id);

    const tdFecha = document.createElement("td");
    tdFecha.innerHTML = turno.fecha;

    const tdPaciente = document.createElement("td");
    tdPaciente.innerHTML = turno.paciente;

    const tdDoctor = document.createElement("td");
    tdDoctor.innerHTML = turno.profesional;

    const tdHora = document.createElement("td");
    tdHora.innerHTML = turno.hora;

    const tdNotas = document.createElement("td");
    tdNotas.innerHTML = turno.notas;

    const tdEliminar = document.createElement("td");
    const botonEliminar = document.createElement("button");
    botonEliminar.innerText = "Eliminar";
    botonEliminar.classList= "btn btn-danger me-3";
    botonEliminar.setAttribute("random", turno.id);
    tdEliminar.appendChild(botonEliminar);

    tr.appendChild(tdFecha);
    tr.appendChild(tdHora);
    tr.appendChild(tdPaciente);
    tr.appendChild(tdDoctor);
    tr.appendChild(tdNotas);

    tr.appendChild(tdEliminar);
    tbodyTurnos.appendChild(tr);
  });
}
