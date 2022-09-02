const loadCatagory = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCatagory(data.data.news_category))
    .catch(error => console.log(error))
}
const displayCatagory = (catagories) =>{
    const catagoryContainer = document.getElementById('catagory-container');
    catagories.forEach(data =>{
        const catagory = document.createElement('button');
        catagory.classList.add('focus:text-indigo-600', 'focus:bg-indigo-100', 'rounded');
        catagory.innerText= `${data.category_name}`
        catagoryContainer.appendChild(catagory);
    })

}
loadCatagory();