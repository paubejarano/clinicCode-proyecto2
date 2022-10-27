export const validateName = (valor, campo) => {
    
    if (valor.trim().length < 2) {
      campo.classList = "form-control is-invalid";
      return false;
    }else{
      campo.classList = "form-control";
      return true;
    }
    
  };

export const validateDni =(valor, campo) =>{
    if (valor.trim().length < 7) {
        campo.classList = "form-control is-invalid";
        return false;
    }
    const regex= /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/;

    if (!regex.test(valor)) {
        campo.classList = "form-control is-invalid";
        return false;
    }else{
      campo.classList = "form-control";
      return true;
    }
    
};

export const validateNumber = (valor, campo) => {
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

export const validateEmail = (valor, campo) => {
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

export const validateConsulta = (valor, campo) =>{
  if(valor.trim().length< 10){
    campo.classList = "form-control is-invalid"
    return false;
  }else{
    campo.classList="form-control";
    return true;
  }
}