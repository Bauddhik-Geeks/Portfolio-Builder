// create the about section
const generateAbout = (aboutText) => {
	if (!aboutText) {
		return "";
	}

	return `
      <section class="my-3" id="about">
        <h2 class="text-dark p-2 display-inline-block boldtext">About Me</h2>
        <p>${aboutText}</p>
      </section>
    `;
};

const generateProjects = (projectsArr) => {
	return `
      <section class="my-3" id="portfolio">
        <h2 class="text-dark  p-2 display-inline-block boldtext">Projects</h2>
        <div class="flex-row justify-space-between">
        ${projectsArr
			.filter(({ feature }) => feature)
			.map(({ name, description, languages, link }) => {
				return `
            <div class="col-12 mb-2 bg-dark text-light p-3" style="border-radius:15px;">
              <h3 class="portfolio-item-title text-light">${name}</h3>
              <h5 class="portfolio-languages">
                Built With:
                ${languages.join(", ")}
              </h5>
              <p>${description}</p>
              <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project</a>
            </div>
          `;
			})
			.join("")}

        ${projectsArr
			.filter(({ feature }) => !feature)
			.map(({ name, description, languages, link }) => {
				return `
            <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
              <h3 class="portfolio-item-title text-light">${name}</h3>
              <h5 class="portfolio-languages">
                Built With:
                ${languages.join(", ")}
              </h5>
              <p>${description}</p>
              <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project</a>
            </div>
          `;
			})
			.join("")}
        </div>
      </section>
    `;
};

const generateExperiences = (experiences) => {
	return `
      <section class="my-4" id="portfolio">
        <h2 class="text-dark p-2 display-inline-block boldtext">Experience</h2>
        <div class="flex-row justify-space-between">
        ${experiences.map(({ title, description, technology, link }) => {
			return `
            <div class="col-12 mb-2 bg-dark text-light p-3" style="border-radius:15px;">
              <h3 class="portfolio-item-title text-light">${title}</h3>
              <h5 class="portfolio-languages">
                Technology:
                ${technology.join(", ")}
              </h5>
              <p>${description}</p>
              <a href="${link}" class="btn">
                <i class="fab fa-github mr-2"></i>
                View Work
              </a>
            </div>
          `;
		})}
        </div>
      </section>
    `;
};

module.exports = (templateData) => {
	// destructure page data by section
	const { projects, experiences, about, ...header } = templateData;

	return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Portfolio Demo</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
      <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>
      <header>
        <div class="container flex-row justify-space-between align-center py-3">
          <div class="flex-row justify-space-between align-center">
            <img id="profileImg" class="mr-4" src="${header.imgUrl}" alt="${header.name}'s profile image" />
            <h1 class="page-title text-secondary bg-dark py-2 px-3">${
    header.name
            }</h1>
          </div>
          <nav class="flex-row">
            <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${
				header.github
			}">GitHub</a>
          </nav>
        </div>
      </header>
      <main class="container my-5">
      ${generateAbout(about)}
      ${generateProjects(projects)}
      ${generateExperiences(experiences)}
      </main>
      <footer class="container text-center py-3">
        <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${
		header.name
	}</h3>
      </footer>
    </body>
    </html>
    `;
};
