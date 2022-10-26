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