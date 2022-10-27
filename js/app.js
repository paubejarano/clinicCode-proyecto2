

 const validateAdmin = ()=>{
    let campoAdmin= document.getElementById("usuario").value.toLowerCase();
    let campoContra= document.getElementById("contraseña").value;

    
    if(campoAdmin === "admin" && campoContra === "1234"){
        location.href="principalTurnos.html";
    }else{
        Swal.fire({
            title: "Error",
            text: "Revise los campos",
            icon: "warning",
          });
    }
 }

const validateName = (valor, campo) => {
    
    if (valor.trim().length < 2) {
      campo.classList = "form-control is-invalid";
      return false;
    }else{
      campo.classList = "form-control";
      return true;
    }
    
  };

  const validateNumber = (valor, campo) => {
    if (valor.trim().length < 8) {
      campo.classList = "form-control is-invalid";
      return false;
    }
  
    const regex = /^\d+$/;
  
    if (!regex.test(valor)) {
      campo.classList = "form-control is-invalid";
      return false;
    }else{
      campo.classList = "form-control";
      return true;
    }
    
};

const validateEmail = (valor, campo) => {
  if (valor.trim().length < 4) {
    campo.classList = "form-control is-invalid";
    return false;
  }

  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!regex.test(valor)) {
    campo.classList = "form-control is-invalid";
    return false;
  }

  campo.classList = "form-control";
  return true;
};

const validateConsulta = (valor, campo) =>{
  if(valor.trim().length< 10){
    campo.classList = "form-control is-invalid"
    return false;
  }else{
    campo.classList="form-control";
    return true;
  }
}
const validateForm = ()=>{
    const campoNombreForm = document.getElementById("nombreForm");
    const campoEmailForm = document.getElementById("emailForm");
    const campoTelefonoForm = document.getElementById("telefonoForm");
    const campoConsultaForm = document.getElementById("consultaForm");

    campoNombreForm.addEventListener("blur", (e) => {
        if (validateName(e.target.value, campoNombreForm)) {
          nombreForm = e.target.value;
        }
      });

    campoEmailForm.addEventListener("blur", (e)=>{
        if(validateEmail(e.target.value, campoEmailForm)){
            emailForm= e.target.value;
        }
    })

    campoTelefonoForm.addEventListener("blur", (e)=>{
        if(validateNumber(e.target.value, campoTelefonoForm)){
            telefonoForm= e.target.value;
        }
    })

    campoConsultaForm.addEventListener("blur", (e)=>{
        if(validateConsulta(e.target.value, campoConsultaForm)){
            consultaForm= e.target.value;
        }
    })

    nombreForm= campoNombreForm.value;
    emailForm= campoEmailForm.value;
    telefonoForm= campoTelefonoForm.value;
    consultaForm= campoConsultaForm.value;

    if(validateName(nombreForm, campoNombreForm)&& validateEmail(emailForm, campoEmailForm)&& validateNumber(telefonoForm, campoTelefonoForm)&& validateConsulta(consultaForm, campoConsultaForm)){
        Swal.fire({
            title: "Su consulta fue enviada",
            text: "Se le responderá a la brevedad",
            icon: "success",
          });
        
          document.getElementById("formConsulta").reset();
    }
}  