
var listValues = JSON.parse(localStorage.getItem("listValuesLocal")) ? JSON.parse(localStorage.getItem("listValuesLocal")) : []



window.onload = initializeApp;


function initializeApp(){
//INCREASE INPUT WIDTH TO ADAPT TO TEXT
    var names = document.querySelector("#nameExpense");
    names.setAttribute('size', names.getAttribute('placeholder').length);

    //check if there is data to show
    if(listValues.length > 0){
        listUpdated()
    }

}

function saveData(event){
    event.preventDefault();

    let formulario = document.getElementById("formulario");
   
let name= document.getElementById("nameExpense");
let amount = document.getElementById("amountExpense");
let date = document.getElementById("dateExpense");


listValues.push({task: name.value, amount: amount.value, date: date.value})
console.log("list values: ", listValues)

formulario.reset();

listUpdated();
}


function listUpdated(tasks = listValues) {
    localStorage.setItem("listValuesLocal", JSON.stringify(tasks));
    const tasksContainer = document.getElementById("listado");

    // cleaning everytime it enters to avoid duplicates buaa
    tasksContainer.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        console.log("listValues i", tasks[i]);
        const taskCont = document.createElement("div");
        taskCont.classList.add('whiteCont');

        // I create the elements i need to show with the info i have
        const nameTask = document.createElement("p");
        nameTask.innerHTML += `<span class="listInfo" >Gasto en: </span>${tasks[i].task}`;

        const amountTask = document.createElement("p");
        amountTask.innerHTML += `<span class="listInfo">Monto del gasto: </span>${tasks[i].amount}`;

        const dateTask = document.createElement("p");
        dateTask.innerHTML += `<span class="listInfo" >Gasto realizado en: </span>${tasks[i].date}`;

        const deleteTask = document.createElement("button");
        deleteTask.textContent = `X`;
        deleteTask.setAttribute("class", "buttonDelete");
        deleteTask.onclick = function () {
            deleteTaskfun(tasks[i].id);
        };

        // Every thing I made with innerHTML now inside my parent container
        taskCont.appendChild(nameTask);
        taskCont.appendChild(amountTask);
        taskCont.appendChild(dateTask);
        taskCont.appendChild(deleteTask);

        // adding everything to my most parent container (?)
        tasksContainer.appendChild(taskCont);
    }
}




//delete task based on id
function deleteTaskfun(id){
    // filter to find the task with the id i got
    const index = listValues.findIndex(item => item.id === id);

    // if i find a task with that id i'll eliminate it with splice
    if (index !== -1) {
        if (confirm('Estás apunto de eliminar este registro y no será posible recuperarlo \n ¿Deseas continuar?')) {
            listValues.splice(index, 1);
           
            listUpdated();
          } else {
            
            console.log('no deleted');
          }
      
}
}

//cleaning all yeee
function cleanAll(){
    if (confirm('Estás apunto de eliminar todos los registros y no será posible recuperarlo \n ¿Deseas continuar?')) {
        listValues= []
        localStorage.clear();
        // reload to start again
        location.reload();
      } else {
        
        console.log('no deleted');
      }
}

// filterin by dates
function filterDates() {
    let initialDate = document.getElementById("initialDate").value;
    let finalDate = document.getElementById("finalDate").value;

    if (initialDate && finalDate) {
        // i convert the date values (because they were string when i got them) to date type
        let fromDate = new Date(initialDate);
        let toDate = new Date(finalDate);

        // filter the array to show only my registers between the dates
        listValuesFiltered = listValues.filter(item => {
            let date = new Date(item.date);
            return date >= fromDate && date <= toDate;
        });

        // update the list
        listUpdated(listValuesFiltered);
    }
}

//the date inputs weren't updating well info so i reset the list
function resetFilter() {
    // reseting the values
    listValuesFiltered = listValues;

    // i update the showed list
    listUpdated(listValuesFiltered);
}


/*NOTES
//TO DO:
-Validate that every field is filled to access to the button and add register
-If I clean the date inputs then show everything
-Probably add a button to tigger the filter function
-Probably add a button to clean the filters

-improve the style of the filters

//FUTURE
-Add budget feature where you add an initial budget
-subtract the total expenses from the budget
-maybe add a total of expenses
*/
