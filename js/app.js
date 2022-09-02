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
    console.log(datas);
    const catagoryNumber = document.getElementById('catagory-number');

    if(datas.length > 0){
        catagoryNumber.innerText = `${datas.length} items found for category ${catagoryName}`
    }
    else{
        catagoryNumber.innerText = `No data found for category ${catagoryName}`
    }
    const cardContainer =document.getElementById('card-container');
    cardContainer.innerHTML = '';
    datas.forEach(data => {
        console.log(data);
        const divCard = document.createElement('div');
        divCard.classList.add('flex', 'flex-col', 'items-center', 'bg-white', 'rounded-lg', 'border','shadow-md', 'md:flex-row','mb-8');
        divCard.innerHTML = `
        <img class="object-cover w-full rounded-lg md:h-auto md:w-2/6 m-8" src="./images/man-rock-mountain-37694612.jpg" alt="">
        <div class="flex flex-col justify-between p-16 pl-4 leading-normal">
            <h1 class="mb-2 text-3xl font-bold tracking-tight text-black">The best fashion influencers to follow for sartorial inspiration</h1>
            <p class="mb-3 text-lg font-normal text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui repellat quod reprehenderit totam nostrum velit harum facere perspiciatis expedita quas sunt corporis esse, magnam animi, aliquam beatae adipisci,wrt</p>
            <div class="flex flex-row justify-between items-center">
                <div class="flex items-center">
                    <img src="./images/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png" class="w-10 h-10 rounded-lg" alt="">
                    <div>
                        <p class="text-black text-lg font-semibold">Jane Cooper</p>
                        <p class="text-lg">Jan 10, 2022 </p>
                    </div>
                </div>
                <div class="flex text-2xl font-bold items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p class="pl-4 text-black">1.5M</p>
                </div>
                <div class="text-2xl">
                    <i class="fa-regular fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <div>
                    <i class="fa-solid fa-arrow-right text-indigo-700 text-2xl"></i>
                </div>
            </div>
        </div>
        `
        cardContainer.appendChild(divCard);
    })
    

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