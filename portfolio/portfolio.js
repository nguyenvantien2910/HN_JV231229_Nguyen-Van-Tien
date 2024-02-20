const listProject = document.querySelector("#listProject");

let renderProject = () => {
    const getProjectLocal = JSON.parse(localStorage.getItem("project-list")) || [];
    listProject.innerHTML = ``;

    for (let i =0; i < getProjectLocal.length; i++) {
        const figure = document.createElement("figure");
        const project = getProjectLocal[i];
        figure.innerHTML += 
        `
        <img src="${project.url}"
            alt="">
        <figcaption>
            <h3>${project.name}</h3>
            <div class="project_des">
                <p>This is sample project description random things are here in description This is sample
                    project
                    lorem
                    ipsum generator for dummy content</p>

                <p><span>Tech stack :</span>${project.tag}</p>
            </div>

            <button class="project-button">Show more</button>
        </figcaption>

        <div class="projectFooter">
            <div>
                <i class="fa-solid fa-link project-icon"></i>
                <a href="">Live Preview</a>
            </div>

            <div>
                <i class="fa-brands fa-github project-icon"></i>
                <a href="">View Code</a>
            </div>
        </div>
        `;
        listProject.appendChild(figure);
        figure.classList.add("project");
    }
}

renderProject();
  