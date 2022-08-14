const getData = () => 
    fetch(`/api/` + $(`#city`).val(), {
        method: `GET`,
        headers: { 'Content-Type': 'application/json'}
    })
    
const renderData = async (data) => {
    let dataRetrieved = await data.json();
    console.log(dataRetrieved);
}

const getAndRenderData = () => getData().then(renderData)

$("#search").on("click", getAndRenderData);