// Show spinner
const showSpinner = () => {
    document.getElementById("spinner").style.display = "block";
  };
  
  // Hide spinner
  const hideSpinner = () => {
    document.getElementById("spinner").style.display = "none";
  };
  
  // Global variable for animals list
  let animalsList = [];
  
  // Fetch and load categories
  const loadCategories = async () => {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const data = await response.json();
    displayCategories(data.categories);
  };
  
  // Fetch and load animals
  const loadAnimals = async () => {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await response.json();
    displayAnimals(data.pets);
  };
  
  // Remove active class from category buttons
  const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for (let btn of buttons) {
      btn.classList.remove("active");
    }
  };
  
  // Show animals by selected category
  const LoadCategoriesAnimals = (id) => {
    showSpinner();
    document.getElementById("animals").style.display = "none";
  
    setTimeout(() => {
      fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
          hideSpinner();
          removeActiveClass();
          const activeBtn = document.getElementById(`btn-${id}`);
          activeBtn.classList.add("active");
          displayAnimals(data.data);
          document.getElementById("animals").style.display = "grid";
        })
        .catch((error) => {
          hideSpinner();
          console.error("Error fetching category animals:", error);
        });
    }, 2000); // 2 seconds delay
  };
  
  // Load pet details
  const loadDetails = async (petDetails) => {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${petDetails}`
    );
    const data = await response.json();
    displayDetails(data.petData);
  };
  
  // Display pet details in a modal
  const displayDetails = (details) => {
    const detailsContainer = document.getElementById("modal-content");
    const {
      petId,
      breed,
      category,
      date_of_birth,
      price,
      image,
      pet_details,
      vaccinated_status,
      pet_name,
      gender,
    } = details;
    detailsContainer.innerHTML = `
           <div class ="border rounded p-2">
               <div class="pt-2 px-2 space-y-2">
               <img 
                 src=${image}
                 alt="${pet_name}"
                 class="rounded-xl w-full object-cover" />
           <div> <h1 class ="font-bold text-2xl">${pet_name}</h1></div>
           
                 <div class ="flex space-x-2 text-gray-500 font-semibold"> 
           <i class="fas fa-paw"></i>
           <p>Breed: ${breed}</p>
           </div>
           
                 <div class ="flex space-x-2 text-gray-500 font-semibold"> 
           <i class="fas fa-birthday-cake"></i>
           <p>Birth: ${date_of_birth}</p>
           </div>
           
                 <div class ="flex space-x-2 text-gray-500 font-semibold"> 
           <i class="fas fa-venus-mars"></i>
           <p>Gender: ${gender}</p>
           </div>
                 <div class ="flex space-x-2 text-gray-500 font-semibold"> 
           <i class="fas fa-dollar-sign"></i>
           <p>Price: ${price}</p>
           </div>
           
           <hr>
           <h1 class = "font-bold">Details Information</h1>
           <h1>${pet_details}</h1>
           `;
    document.getElementById("showModalData").click();
  };
  
  // Create and display animals
  const displayAnimals = (animals) => {
    const animalsContainer = document.getElementById("animals");
    animalsContainer.innerHTML = "";
  
    if (animals.length == 0) {
      animalsContainer.classList.remove("grid");
      animalsContainer.innerHTML = `
                 <div class = "min-h-screen flex flex-col gap-4 justify-center items-center mx-auto">
                 <img class="text-center" src="error.webp" alt="No Data Available"/>
                 </div>
                 <div class = "text-center l space-y-2">
                 <h1 class="font-bold text-3xl">No Information Available</h1>
                 <p>It is a long established fact that a reader will be distracted by the <br> readable content of a page when looking at 
           its layout. The point of using Lorem Ipsum is that it has a.</p>
                 </div>
                 `;
      return;
    } else {
      animalsContainer.classList.add("grid");
    }
  
    animals.forEach((item) => {
      const {
        petId,
        breed,
        date_of_birth,
        price,
        image,
        pet_name,
        gender,
      } = item;
      const card = document.createElement("div");
      card.classList = "card card-compact";
      card.innerHTML = `
            <div class ="border rounded p-4">
               <div class="px-2 py-2 space-y-2">
               <img 
                 src=${image}
                 alt="${pet_name}"
                 class="rounded-xl w-full object-cover" />
           <div> <h1 class ="font-bold text-2xl">${pet_name}</h1></div>
           
                 <div class ="flex space-x-2 text-gray-500 font-semibold"> 
           <i class="fas fa-paw"></i>
           <p>Breed: ${breed}</p>
           </div>
           
                 <div class ="flex space-x-2 text-gray-500 font-semibold"> 
           <i class="fas fa-birthday-cake"></i>
           <p>Birth: ${date_of_birth}</p>
           </div>
           
                 <div class ="flex space-x-2 text-gray-500 font-semibold"> 
           <i class="fas fa-venus-mars"></i>
           <p>Gender: ${gender}</p>
           </div>
                 <div class ="flex space-x-2 text-gray-500 font-semibold"> 
           <i class="fas fa-dollar-sign"></i>
           <p>Price: ${price}</p>
           </div>
           
           <hr>
           <div class = "flex justify-between col-span-12">
           
           <button onclick="likeItems('${image}')" class="border text-2xl px-2 font-semibold p-y2 rounded"><i class="fa-regular fa-thumbs-up"></i></button>
           
           <button onclick="counterModal()" class="border lg:text-2xl px-2 font-semibold p-y2 text-[#0E7A81] rounded">Adopt</button>
           
           <button onclick="loadDetails('${petId}')" class="border lg:text-2xl px-2 font-semibold p-y2 text-[#0E7A81] rounded">Details</button>
           </div>
             </div>
           </div>
             `;
      animalsContainer.append(card);
    });
  };
  
  // Like items
  const likeItems = (image) => {
    const likeContainer = document
      .getElementById("likeItems")
      .querySelector(".flex");
    const div = document.createElement("div");
    div.className = "lg:w-1/2 w-full p-4";
    div.innerHTML = `
               <div class="h-auto border rounded grid grid-cols-1 auto-rows-min">
               <img 
                 src=${image}
                 alt="Liked Pet"
                 class="rounded-xl w-full object-cover" /> 
               </div>
                 `;
    likeContainer.appendChild(div);
  };
  
  // Create and display categories
  const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
    categories.forEach((item) => {
      const { id, category, category_icon } = item;
  
      const buttonContainer = document.createElement("div");
      buttonContainer.innerHTML = `
               <button id="btn-${id}" onclick="LoadCategoriesAnimals('${id}')" 
               class ="category-btn inline-flex font-semibold items-center rounded object-cover border space-x-2 px-6 py-1">
                 <img src=${category_icon} alt="${category} Icon" /> 
                 ${category} 
               </button>
               `;
      categoryContainer.append(buttonContainer);
    });
  };
  
  // Adopt counter modal
  const counterModal = () => {
    const adoptCounter = document.getElementById("count");
    const countDown = document.getElementById("countDown");
    const adoptModal = document.getElementById("adopt-modal");
  
    adoptModal.classList.remove("hidden");
    countDown.innerText = 3;
    let sum = parseInt(countDown.innerText);
    let clockId = setInterval(() => {
      if (sum > 1) {
        sum--;
        countDown.innerText = sum;
      } else if (sum === 1) {
        adoptModal.classList.add("hidden");
        clearInterval(clockId);
      }
    }, 1000);
  
    document.getElementById("showAdobt").click();
  };
  
  // Call load categories and animals
  loadAnimals();
  loadCategories();
  