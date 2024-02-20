const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});

// Tạo biến hằng số
const inputForm = document.querySelector("#input-form");
const addButton = document.querySelector("#add-button");
const projectName = document.querySelector("#project_name");
const projectUrl = document.querySelector("#image_url");
const projectLink = document.querySelector("#project_link");
const projectTag = document.querySelector("#project_tag");
const tableBody = document.querySelector("#table-body");

let existingIndex = -1;
let existing = false;

//Function gender project
let renderProject = () => {
    const projectList = JSON.parse(localStorage.getItem("project-list")) || [];
    tableBody.innerHTML = ``;

    for (let i =0; i < projectList.length; i++) {
        const tr = document.createElement("tr");
        const project = projectList[i];
        tr.innerHTML += 
        `
        <td> <b>${i + 1}</b></td>
        <td> ${project.name}</td>
        <td> ${project.url}</td>
        <td> ${project.link}</td>
        <td> ${project.tag}</td>
        <td>
		<button onclick="deleteProject(${i})" id="delete-btn">Delete</button> 
        <button onclick="updateProject(${i})" id="update-btn">Update</button> 
        </td>
        `;
        tableBody.appendChild(tr);
    }
}

renderProject();

//Chặn event load lại của form
inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //Tạo đối tượng để lưu các giá trị đã lấy được ở ô input 
    const project = {
        name : projectName.value,
        url : projectUrl.value,
        link : projectLink.value,
        tag : projectTag.value,
    };
    
    // Lấy dữ liệu từ local, nếu local chưa có thì trả về []
    const getProjectLocal = JSON.parse(localStorage.getItem("project-list")) || [];
    

    if (existing) {
        // Code update
        getProjectLocal[existingIndex] = project;
        existingIndex = -1;
        existing = false;
        addButton.textContent = "+ New Project";
      } else {
        getProjectLocal.push(project);
      }

    //Gửi dữ liệu get được tù ô input lên local storage
    localStorage.setItem("project-list", JSON.stringify(getProjectLocal));

    //Thực hiện reset form sau khi click button add
    resetForm();
    renderProject();
})

//function reset form 
resetForm = () => {
    projectName.value = "";
    projectLink.value = "";
    projectUrl.value = "";
    projectTag.value = "";
}

//delete project functiom
let  deleteProject = (index) => {
    //Lấy dữ liệu từ Local
    const getProjectLocal = JSON.parse(localStorage.getItem("project-list"));

    //B2: Xóa dữ liệu 
    getProjectLocal.splice(index,1);

    //B3: Set lại giá trị lên local
    localStorage.setItem("project-list", JSON.stringify(getProjectLocal));

    renderProject();
}

//Function update
let updateProject = (index) => {
    const getDataLocal = JSON.parse(localStorage.getItem("project-list"));
    projectName.value = getDataLocal[index].name;
    projectLink.value = getDataLocal[index].link;
    projectUrl.value = getDataLocal[index].url;
    projectTag.value = getDataLocal[index].tag;
    existingIndex = index;
    existing = true;
    addButton.textContent = "Update Now";
}