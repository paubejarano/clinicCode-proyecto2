import { Paciente } from "./Paciente.js";
import { validateDni, validateName, validateNumber } from "./validators.js";

let obraSocial = [
  "Ninguna",
  "Subsidio de Salud",
  "Swiss Medical",
  "Red de Seguros Médicos",
  "Prensa",
  "OSDE",
  "Otra",
];
const buttonCargar = document.getElementById("buttonCargar");

const recargarDatos = () => {
  const pacientesLS = JSON.parse(localStorage.getItem("pacientes"));
  
  document.getElementById("tbody_paciente").innerHTML = "";
  
  pacientesLS.forEach((paciente) => {
    listarPaciente(paciente);
  });
};
//listar pacientes
const listarPaciente = () => {
  document.getElementById("tbody_paciente").innerHTML = "";
  pacientes.forEach((paciente) => {
    const edad=()=>{
      let today = new Date();
        let birthDate = new Date(paciente.fechaNac);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
    }
    const tr = document.createElement("tr");
    
    const datos = `<td>${paciente.nombre}</td>
    <td>${paciente.dni}</td>
    <td>${edad()}</td>
    <td>${paciente.fechaNac}</td>
    <td>${paciente.telefono}</td>
    <td>${paciente.obraSocial}</td>`;
    
    const td = document.createElement("td");
    const buttonEditar = document.createElement("button");
    const buttonEliminar = document.createElement("button");
    buttonEditar.classList = "btn btn-warning mb-2 me-2";
    buttonEliminar.classList = "btn btn-danger mb-2";

    buttonEditar.innerText = "Editar";
    buttonEliminar.innerText = "Eliminar";

    buttonEditar.onclick = () => {
      cargarDatosFormulario(paciente.dni);
    };
    buttonEliminar.onclick = () => {
      deleteP(paciente.dni);
    };
    td.appendChild(buttonEditar);
    td.appendChild(buttonEliminar);
    tr.innerHTML = datos;
    tr.appendChild(td);
    document.getElementById("tbody_paciente").appendChild(tr);
  });
  document.getElementById("cantPac").innerText = pacientes.length;
};

const cargarDatosFormulario = (dni) => {
  const pacientes = JSON.parse(localStorage.getItem("pacientes"));
  const pacienteAEditar = pacientes.find((elemento) => {
    return elemento.dni == dni;
  });

  campoNombre.value = pacienteAEditar.nombre;
  campoDni.value = pacienteAEditar.dni;
  campoFechaNac.value = pacienteAEditar.fechaNac;
  campoTelefono.value = pacienteAEditar.telefono;
  campoObraSocial.value = pacienteAEditar.obraSocial;

  buttonCargar.innerText = "Editar";

  sessionStorage.setItem("codigo", dni);
};

function deleteP(dni) {
  const pacientes = JSON.parse(localStorage.getItem("pacientes"));
  const index = pacientes.findIndex((paciente) => {
    return paciente.dni == dni;  
  });
  
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
      pacientes.splice(index, 1);

      localStorage.setItem("pacientes", JSON.stringify(pacientes));
      
    }
    window.location.reload();
  });
}

//obtener pacientes desde LS
let pacientesLS = localStorage.getItem("pacientes");
pacientesLS = JSON.parse(pacientesLS);
//console.log(pacientesLS);


let pacientes = [];

if (pacientesLS !== null) {
  pacientes = pacientesLS;
  
  pacientes.forEach((paciente) => {
    listarPaciente(paciente);
  });
}

obraSocial.forEach((obra) => {
  let opcion = document.createElement("option");
  opcion.value = `${obra}`;
  opcion.innerText = `${obra}`;
  document.getElementById("selectObraSocial").appendChild(opcion);
});

const formularioPac = document.getElementById("formPaciente");

const campoNombre = document.getElementById("nombre");
const campoDni = document.getElementById("dni");
const campoFechaNac = document.getElementById("fechaNac");
const campoTelefono = document.getElementById("telefono");
const campoObraSocial = document.getElementById("selectObraSocial");



let nombre = "";
let dni = "";
let fechaNac = "";
let telefono = "";
let obraSocial1 = "";

campoNombre.addEventListener("blur", (e) => {
  if (validateName(e.target.value, campoNombre)) {
    nombre = e.target.value;
  }
});
campoDni.addEventListener("blur", (e) => {
  if (validateDni(e.target.value, campoDni)) {
    dni = e.target.value;
  }
});
campoFechaNac.addEventListener("blur", (e) => {
  fechaNac = e.target.value;
});
campoTelefono.addEventListener("blur", (e) => {
  if (validateNumber(e.target.value, campoTelefono)) {
    telefono = e.target.value;
  }
});
campoObraSocial.addEventListener("blur", (e) => {
  obraSocial1 = e.target.value;
});

//agregar pacientes al LS
const agregarPacienteALS = (paciente) => {
  pacientes.unshift(paciente);
  //console.log(paciente.calcularEdad());
  const pacienteJSON = JSON.stringify(pacientes);
  //console.log(pacienteJSON);
  localStorage.setItem("pacientes", pacienteJSON);
};

//agregar pacientes
formularioPac.addEventListener("submit", (e) => {
  e.preventDefault();

  let isEditando;

  if (buttonCargar.innerText === "Editar") {
    isEditando = true;
    
  } else {
    isEditando = false;
    
  }
  
  nombre = campoNombre.value;
  dni = campoDni.value; 
  fechaNac = campoFechaNac.value;
  telefono = campoTelefono.value;
  obraSocial1 = campoObraSocial.value;

  if (
    validateName(nombre, campoNombre) &&
    validateDni(dni, campoDni) &&
    validateNumber(telefono, campoTelefono)
  ){
    if (!isEditando) {
      
      let paciente = new Paciente(nombre, dni, fechaNac, telefono, obraSocial1);
    
      agregarPacienteALS(paciente);
      document.getElementById("formPaciente").reset();
      
      Swal.fire({
        title: "Exito",
        text: "El paciente se creó exitosamente",
        icon: "success",
      });
    }else {
      const codigo= Number(sessionStorage.getItem("codigo"));
      sessionStorage.removeItem("codigo");
      
      const pacienteIndex= pacientes.findIndex((paciente)=>{
        return paciente.dni==codigo;
      })

      pacientes[pacienteIndex].nombre= nombre;
      pacientes[pacienteIndex].dni= dni;
      pacientes[pacienteIndex].fechaNac= fechaNac;
      pacientes[pacienteIndex].telefono= telefono;
      pacientes[pacienteIndex].obraSocial= campoObraSocial.value;
      
      localStorage.setItem("pacientes", JSON.stringify(pacientes));
  
      Swal.fire({
        title: "Exito",
        text: "El paciente se editó correctamente",
        icon: "success",
      });
  
      buttonCargar.innerText="Cargar";
      document.getElementById("formPaciente").reset();
    }
  
    recargarDatos();
    
  }else{
    Swal.fire({
      title: "Error",
      text: "Revise los campos",
      icon: "warning",
    });
  }
    
});