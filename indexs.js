let editing = false;
let editingId = 0;
async function getAlltodos(){
    const response = await axios.get("https://app-servers.io/api/todos");
    console.log(response.data);
    return response.data

}
async  function sendtodoserver(taskname){
    const response = await axios.post("https://app-servers.io/api/todos/add", {
        complete:0,
        task:taskname
    })
}
async function main() {
    let todos = await getAlltodos();
    renderhtml(todos);
}

async function renderhtml(todos){
    let html = ""
    for(let i = 0 ;i <todos.length; i++){
        html+=`
        <div class="todoitem">
                        <div class="todocheckbox">
                        <input  type="checkbox">
                        </div>
                        <div class="todoname">${todos[i].task}</div>
                        <div class="action">
                            <span class="btnedit" onclick ='clickedittodos("${todos[i].task}" ,${todos[i].id})'>Edit</span>
                            <span class="btndelete" onclick="deletetodos(${todos[i].id})" >delete</span>

                        </div>
                    </div>`

    }
document.querySelector(".listtodos").innerHTML = html


}
main()
document.querySelector(".sumbitbtn").addEventListener("click" , submitclick);
async function submitclick(){
    if(editing){
        editTodo();

    }else{
        createTodo();

    }
}
async function editTodo(){
    let taskname = document.querySelector(".textinput").value;
    const response = await axios.post(`https://app-servers.io/api/todos/edit/${editingId}`, {
        task:taskname
    })
    let todos = await getAlltodos();
    renderhtml(todos);
    editing = false;

}
 async function createTodo(){
    let todoname = document.querySelector(".textinput").value
    if(todoname == ""){
        alert("please enter you text input is empty")
        return;
    }
    await sendtodoserver(todoname)
    let todos = await getAlltodos();
    renderhtml(todos);

}
async function deletetodos(todoId){
    //axios do not work on the api when use delete method
    await fetch(`https://app-servers.io/api/todos/delete/${todoId}`, 
        {
          method: 'POST',
        }
  )
     let todos = await getAlltodos();
     renderhtml(todos);
}
async function clickedittodos(taskname ,todoid){
    editingId = todoid;
    document.querySelector(".textinput").value = taskname;
    editing = true;
}