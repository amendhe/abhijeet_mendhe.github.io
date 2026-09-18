document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);
  const byId = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);
  const tags = (items) => items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("");

  byId("summary").textContent = portfolio.summary;
  byId("aboutText").textContent = portfolio.about;
  byId("githubBtn").href = portfolio.github;
  byId("linkedinBtn").href = portfolio.linkedin;
  byId("emailBtn").href = `mailto:${portfolio.email}`;
  byId("currentYear").textContent = new Date().getFullYear();

  byId("principlesContainer").innerHTML = portfolio.principles.map((item, index) => `
    <article class="principle reveal"><span class="card-number">0${index + 1}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join("");

  byId("skillsContainer").innerHTML = portfolio.skills.map((skill) => `
    <article class="expertise-card reveal"><span class="expertise-icon">${escapeHtml(skill.code)}</span><h3>${escapeHtml(skill.title)}</h3><p>${escapeHtml(skill.description)}</p><div class="tags">${tags(skill.items)}</div></article>`).join("");

  byId("experienceContainer").innerHTML = portfolio.experience.map((item) => `
    <article class="experience-item reveal"><p class="label">${escapeHtml(item.label)}</p><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></div></article>`).join("");

  byId("projectsContainer").innerHTML = portfolio.projects.map((project, index) => `
    <article class="project-card reveal"><div class="project-top"><span class="project-index">0${index + 1}</span><span class="project-arrow" aria-hidden="true">↗</span></div><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.description)}</p><div class="tags">${tags(project.items)}</div></article>`).join("");

  const menuButton = $(".menu-button");
  const navLinks = byId("navLinks");
  menuButton.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));

  byId("copyEmail").addEventListener("click", async (event) => {
    try {
      await navigator.clipboard.writeText(portfolio.email);
      event.currentTarget.textContent = "Email copied";
      setTimeout(() => event.currentTarget.textContent = "Copy email", 1600);
    } catch {
      window.location.href = `mailto:${portfolio.email}`;
    }
  });

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".nav-links a[href^='#']")];
  const updateActiveLink = () => {
    const current = sections.slice().reverse().find((section) => window.scrollY >= section.offsetTop - 150);
    links.forEach((link) => link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`));
  };
  updateActiveLink();
  window.addEventListener("scroll", updateActiveLink, { passive: true });
});
