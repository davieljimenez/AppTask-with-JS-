document.getElementById("formularioDeTareas").addEventListener("submit", guardarTarea);

function guardarTarea(e){
    
    /*Guardar los datos que ingresa el usuario:*/
    let titulo = document.getElementById("titulo").value;
    let descripcion = document.getElementById("descripcion").value;
    
    /* Objeto para almacenar*/
    const tarea = {
        titulo,
        descripcion 
    };
    
    if (localStorage.getItem("tareas") === null){
       let tareas = [];
       tareas.push(tarea);
       localStorage.setItem("tareas", JSON.stringify(tareas)); 
    } else{
        let tareas = JSON.parse(localStorage.getItem("tareas"));
        tareas.push(tarea);
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }
    
    obtenerTareas()
    document.getElementById("formularioDeTareas").reset();
    e.preventDefault();
}

function obtenerTareas(){
  let tareas = JSON.parse(localStorage.getItem("tareas"));
  let vistasDeLasTareas = document.getElementById("tarea");

  vistasDeLasTareas.innerHTML = "";

  for(let i = 0; i < tareas.length; i++){
     let titulo = tareas[i].titulo;
     let descripcion = tareas[i].descripcion;

     vistasDeLasTareas.innerHTML += `<div class="card mb-3">
      <div class = "card-body">
          <p>${titulo} - ${descripcion}</p>
          <a class="btn btn-danger" onclick="eliminarTareas('${titulo}')"> 
          Eliminar
          </a>
      </div>
     </div>`
  }
}

function eliminarTareas(titulo){
 let tareas = JSON.parse(localStorage.getItem("tareas"));
 for (let i = 0; i < tareas.length; i++) {
     if (tareas[i].titulo == titulo){
         tareas.splice(i,1)
     }

 }
 localStorage.setItem("tareas", JSON.stringify(tareas));
 obtenerTareas();   
}

obtenerTareas();