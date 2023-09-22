export const saveListToLocalStorage = (tasks) =>{
    localStorage.setItem('Quest',JSON.stringify(tasks))
}