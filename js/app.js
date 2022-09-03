//catagory types data fetching
const loadCatagories = async() =>{
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        displayCatagories(data.data.news_category);
    }
    catch(error){
        console.log(error);
    }
}
//display catagory
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

//data fetching after selecting catagory type
const loadCatagory = async(id,catagoryName) =>{
    //show spinner
    displaySpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayLoadCatagory(data.data,catagoryName);
    }
    catch(error){
        console.log(error);
    }
}

//display news after selecting catagory type
const displayLoadCatagory = (datas,catagoryName) =>{
    // console.log(datas);
    const catagoryNumber = document.getElementById('catagory-number');

    if(datas.length > 0){
        catagoryNumber.innerText = `${datas.length} items found for category ${catagoryName}`
    }
    else{
        catagoryNumber.innerText = `No data found for category ${catagoryName}`
    }

    const cardContainer =document.getElementById('card-container');
    datas.sort((p, q) => q.total_view - p.total_view);
    cardContainer.innerHTML = '';
    datas.forEach(data => {
        const divCard = document.createElement('div');
        divCard.classList.add('flex', 'flex-col', 'items-center', 'bg-white', 'rounded-3xl', 'border', 'shadow-md', 'lg:flex-row', 'mb-8');
        divCard.innerHTML = `
        <img class="object-cover rounded-lg w-full sm:w-auto sm:h-96 m-0 sm:m-4" src="${data.thumbnail_url}" alt="">
        <div class="flex flex-col justify-between p-16 lg:pl-4 leading-normal">
            <h1 class="mb-2 text-3xl font-bold tracking-tight text-black">${data.title}</h1>
            <p class="mb-3 text-lg font-normal text-gray-400">${data.details.length > 300 ? data.details.slice(0,300) + '...' : data.details}</p>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-between items-center">
                <div class="flex flex-wrap items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="${data.author.img}" alt="Author Image">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900">${data.author.name ? data.author.name : "No Data Found"}</p>
                        <p class="space-x-1 text-sm text-gray-500">${data.author.published_date}</p>
                    </div>
                </div>
                <div class="text-center">
                    <div class="flex items-center justify-end lg:justify-center">
                        <i class="fa-regular fa-eye"></i>
                        <p class="text-sm font-bold text-gray-600 ml-2">${data.total_view ? data.total_view : "No Data Found"}</p>
                    </div>
                </div>
                <div class="text-center">
                    <div class="text-base">
                        <i class="fa-regular fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                </div>
                <div class="text-right">
                    <label onclick="loadModal('${data._id}')" for="my-modal-3" class="btn bg-indigo-700 modal-button">
                        <i class="fa-solid fa-arrow-right-long text-white cursor-pointer"></i>
                    </label>
                </div>
            </div>
        </div>
        `
        cardContainer.appendChild(divCard);
    });
    //remove spinner
    displaySpinner(false);
}
// Spinner add function
const displaySpinner = (showSpinner) =>{
    const spinner = document.getElementById('spinner');
    if(showSpinner === true){
        spinner.classList.remove('hidden')
    }
    else{
        spinner.classList.add('hidden');
    }
}

// modal data load
const loadModal = async(newsId) =>{
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayModalData(data);
    }
    catch(error){
        console.log(error);
    }
}

//dislplay modal data
const displayModalData = (data) =>{
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = ' ';
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal-box', 'relative', 'bg-white');
    modalDiv.innerHTML = `
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <img src="${data.data[0].image_url}" class="rounded-lg" alt="">
        <h1 class="py-4 text-3xl font-bold text-black">${data.data[0].title}</h1>
        <p class="py-4 text-black">${data.data[0].details}</p>
        <div class="flex items-center justify-between">
            <div class="flex-shrink-0">
                <img class="w-8 h-8 rounded-full" src="${data.data[0].author.img}" alt="">
            </div>
            <div class="flex-1 min-w-0 pl-4">
                <p class="text-sm font-medium text-gray-900">${data.data[0].author.name ? data.data[0].author.name : "No Data Found"}</p>
                <p class="space-x-1 text-sm text-gray-500">${data.data[0].author.published_date}</p>
            </div>
            <div class="text-center">
                <div class="flex items-center justify-end lg:justify-center">
                    <i class="fa-regular fa-eye"></i>
                    <p class="text-sm font-bold text-gray-600 ml-2">${data.data[0].total_view ? data.data[0].total_view : "No Data Found"}</p>
                </div>
            </div>
        </div>
    `
    modalContainer.appendChild(modalDiv);
}

// default data load
loadCatagory(1,'Breaking News');
loadCatagories();