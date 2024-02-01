let allUser;
let userInfoDetails = JSON.parse(localStorage.getItem("user")) || [];
const tableBody = document.getElementById("tbody");
const searchInput = document.getElementById("search");
let isEditUser = false;
let editUserIndex = null;
const submitBtn  =document.getElementById("submit");
let submitBtnValue = submitBtn.value;


// getInformation user and push the array
function getData(e) {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    e.preventDefault();
    
    if (isEditUser) {
        isEditUser = false;
        userInfoDetails[editUserIndex] = {
            userName,
            password,
            email,
            uniqueID: uniqueId(),
        };
        submitBtn.value = submitBtnValue;
    } else {
        userInfoDetails.push({
            userName,
            password,
            email,
            uniqueID: uniqueId(),
        });
    }

    displayData(userInfoDetails);
}

// display data document
function displayData(userInfoDetails) {
    tableBody.innerHTML = "";
    userInfoDetails.forEach((user, i) => {
        tableBody.innerHTML += `
        <tr>
        <td>${i + 1}</td>
        <td>${user.userName}</td>
        <td>${user.password}</td>
        <td>${user.email}</td>
        <td>${user.uniqueID}</td>
        <td>
        <button onclick="edit(${i})" class = "edit">Edit</button>
        <button onclick="del(${user.uniqueID})" class = "delete">Delete</button>
        </td>
        </tr>
        `;
    });
    
    localStorageSaveData();
    allUser = tableBody.querySelectorAll("tr");
    document.getElementById("userName").value = "";
    document.getElementById("password").value = "";
    document.getElementById("email").value = "";
}

// saveData localStorage
function localStorageSaveData() {
    localStorage.setItem("user", JSON.stringify(userInfoDetails));
}

// delete the selected user
function del(index) {
    const filter = userInfoDetails.filter((elm)=> elm.uniqueID !== index);
    userInfoDetails = filter;
    displayData(userInfoDetails);
    
    // console.log(index)
}

// edit the selected user
function edit(index) {
    const editUser = userInfoDetails[index];
    isEditUser = true;
    editUserIndex = index;
    document.getElementById("userName").value = editUser.userName;
    document.getElementById("password").value = editUser.password;
    document.getElementById("email").value = editUser.email;
    submitBtn.value = "Save"
}

// generate a unique ID
function uniqueId() {
    let randomId = "";
    for (let i = 0; i < 5; i++) {
        randomId += Math.floor(Math.random() * 10);
    }
    
    // Ensure the generated ID is unique
    while (userInfoDetails.some((user) => user.uniqueID === Number(randomId))) {
        randomId = "";
        for (let i = 0; i < 5; i++) {
            randomId += Math.floor(Math.random() * 10);
        }
    }
    
    return Number(randomId);
}

displayData(userInfoDetails);

// search user available data 

searchInput.addEventListener("input", function(event){
    const text = event.target.value.trim().toLowerCase();
    allUser.forEach((elm=>{
        if(elm.textContent.toLowerCase().includes(text)){
            elm.classList.remove("opacity");
        }else{
            // elm.style.display = "none";
            elm.classList.add("opacity");
        }
    }))
   
})

