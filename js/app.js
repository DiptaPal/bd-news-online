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
        // console.log(data);
        
        const divCard = document.createElement('div');
        divCard.classList.add('flex', 'flex-col', 'items-center', 'bg-white', 'rounded-3xl', 'border', 'shadow-md', 'lg:flex-row', 'mb-8');
        divCard.innerHTML = `
        <img class="object-cover rounded-lg w-full md:w-auto md:h-96 m-0 md:m-4" src="${data.thumbnail_url}" alt="">
        <div class="flex flex-col justify-between p-16 lg:pl-4 leading-normal">
            <h1 class="mb-2 text-3xl font-bold tracking-tight text-black">${data.title}</h1>
            <p class="mb-3 text-lg font-normal text-gray-400">${data.details.length > 300 ? data.details.slice(0,300) + '...' : data.details}</p>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-between items-center">
                <div class="flex flex-wrap items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="${data.author.img}" alt="Author Image">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900">${data.author.name}</p>
                        <p class="space-x-1 text-sm text-gray-500">${data.author.published_date}</p>
                    </div>
                </div>
                <div class="text-center">
                    <div class="flex items-center justify-end lg:justify-center">
                        <i class="fa-regular fa-eye"></i>
                        <p class="text-sm font-bold text-gray-600 ml-2">300</p>
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
                    <label for="my-modal-3">
                        <i class="fa-solid fa-arrow-right-long text-blue-600 cursor-pointer"></i>
                    </label>
                </div>
            </div>
        </div>
        `
        cardContainer.appendChild(divCard);
    });

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
loadCatagory(1,'Breaking News');
loadCatagories();