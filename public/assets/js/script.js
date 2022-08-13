const getData = () =>
    fetch(`/api/` + $(`#search`).val(), {
        method: `GET`,
        headers: { 'Content-Type': 'application/json'}
    })

$("#search").on("click", searchCity);