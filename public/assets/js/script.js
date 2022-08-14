const getData = () => {
    fetch(`/api/` + $(`#city`).val(), {
        method: `GET`,
        headers: { 'Content-Type': 'application/json'}
    })
}
    
const searchCity = () => {
    data = getData();
    console.log(data);
}

$("#search").on("click", searchCity);