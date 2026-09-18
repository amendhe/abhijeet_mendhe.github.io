document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("name").textContent =
        portfolio.name;

    document.getElementById("title").textContent =
        portfolio.title;

    document.getElementById("summary").textContent =
        portfolio.summary;

    document.getElementById("aboutText").textContent =
        portfolio.about;

    document.getElementById("email").textContent =
        portfolio.email;

    document.getElementById("githubBtn").href =
        portfolio.github;

    document.getElementById("linkedinBtn").href =
        portfolio.linkedin;

    renderSkills();
    renderProjects();

    observeAnimation();

});

function renderSkills() {

    const container =
        document.getElementById("skillsContainer");

    portfolio.skills.forEach(skill => {

        const card =
            document.createElement("div");

        card.className =
            "card skill-card fade-in";

        card.innerHTML =
            `
            <h3>${skill.category}</h3>
            <p>${skill.items}</p>
            `;

        container.appendChild(card);

    });

}

function renderProjects() {

    const container =
        document.getElementById("projectsContainer");

    portfolio.projects.forEach(project => {

        const card =
            document.createElement("div");

        card.className =
            "card project-card fade-in";

        card.innerHTML =
            `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            `;

        container.appendChild(card);

    });

}

function observeAnimation() {

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });

        });

    document
        .querySelectorAll(".fade-in")
        .forEach(el => observer.observe(el));

}
