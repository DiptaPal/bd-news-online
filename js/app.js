const loadCatagories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCatagories(data.data.news_category))
    .catch(error => console.log(error))
}
const displayCatagories = (catagories) =>{
    const catagoryContainer = document.getElementById('catagory-container');
    catagories.forEach(data =>{
        const catagory = document.createElement('button');
        catagory.classList.add('focus:text-indigo-600', 'focus:bg-indigo-100', 'rounded');
        catagory.setAttribute('onclick',`loadCatagory(${data.category_id}, '${data.category_name}')`);
        catagory.innerText= `${data.category_name}`
        catagoryContainer.appendChild(catagory);
    })
}
const loadCatagory = (id,catagoryName) =>{
    displaySpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLoadCatagory(data.data,catagoryName))
    .catch(error => console.log(error))
}
const displayLoadCatagory = (data,catagoryName) =>{
    console.log(data);
    const catagoryNumber = document.getElementById('catagory-number');

    if(data.length > 0){
        catagoryNumber.innerText = `${data.length} items found for category ${catagoryName}`
    }
    else{
        catagoryNumber.innerText = `No data found for category ${catagoryName}`
    }
    const cardContainer =document.getElementById('card-container');
    

    displaySpinner(false);
}
const displaySpinner = (showSpinner) =>{
    const spinner = document.getElementById('spinner');
    if(showSpinner === true){
        spinner.classList.remove('hidden')
    }
    else{
        spinner.classList.add('hidden');
    }
}

loadCatagories();