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
  
      turnos = turnos.filter((x) => x.id != random);
      actualizarTabla(turnos);
      agregarTurnoAlLocalStorage(turnos)
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
    const hora = document.getElementById("inputHora").value;
    const notas = document.getElementById("notasContacto").value;
  
    const paciente = document.getElementById("selectPaciente").value;
    const profesional = document.getElementById("selectProfecional").value;
  
    const turnoCreado = new Turno(fecha, hora, paciente, profesional, notas);
  
    turnos.push(turnoCreado);
    agregarTurnoAlLocalStorage(turnos);
    actualizarTabla(turnos);
    alert("se guardo turno");
  
    limpiarFormulario();
  }
  
  const pacientesLocalStorage = [
    { nombre: "Rubén", apellido: "Vizcarra", dni: "12456785" },
    { nombre: "Pepe", apellido: "Ruiz", dni: "45789423" },
    { nombre: "Carlos", apellido: "Torres", dni: "48963258" },
  ];
  
  const profesionales = [
    { nombre: "Juan", apellido: "Flores", dni: "78456123" },
    { nombre: "Darío", apellido: "Pineda", dni: "15456789" },
    { nombre: "Patricia", apellido: "Vera", dni: "18785325" },
    { nombre: "Rosario", apellido: "Azar", dni: "187653425" },
    { nombre: "Diego", apellido: "Silva", dni: "1678532" },
  ];
  
  const pacientes = obtenerPacientes();
  
  pacientes.forEach((paciente) => {
    const optionPaciente = document.createElement("option");
    optionPaciente.value = paciente.nombre + " " + paciente.apellido;
    optionPaciente.innerText = paciente.nombre + " " + paciente.apellido;
  
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
      botonEliminar.classList.add("eliminar");
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
  

