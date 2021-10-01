const inquirer = require("inquirer");

const { writeFile, copyFile } = require("./utils/generate-site.js");

const generatePage = require("./src/page-template.js");

// const profileDataArgs = process.argv.slice(2);

// const [name, github] = profileDataArgs;

// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
//   });

const promptUser = () => {
	return inquirer.prompt([
		{
			type: "input",
			name: "name",
			message: "What is your name? (Required)",
			validate: (nameInput) => {
				if (nameInput) {
					return true;
				} else {
					console.log("Please enter your name!");
					return false;
				}
			},
		},
		{
			type: "input",
			name: "github",
			message: "Enter your GitHub Username (Required)",
			validate: (nameInput) => {
				if (nameInput) {
					return true;
				} else {
					console.log("Please enter your GitHub Username!");
					return false;
				}
			},
		},
		{
			type: "confirm",
			name: "confirmAbout",
			message:
				'Would you like to enter some information about yourself for an "About" section?',
			default: true,
		},
		{
			type: "input",
			name: "about",
			message: "Provide some information about yourself:",
			when: ({ confirmAbout }) => confirmAbout,
		},
	]);
};

const promptExperience = (portfolioData) => {
	// if there's no 'experience' array property, create one
	if (!portfolioData.experiences) {
		portfolioData.experiences = [];
	}
	console.log(`
    ===============
    Add Experience
    ===============
    `);
	return inquirer
		.prompt([
			{
				type: "input",
				name: "title",
				message: "What is the title (role) of your experience?",
			},
			{
				type: "input",
				name: "description",
				message: "Provide a description of your experience (Required)",
				validate: (descriptionInput) => {
					if (descriptionInput) {
						return true;
					} else {
						console.log(
							"Please enter your Experience Description!",
						);
						return false;
					}
				},
			},
			{
				type: "checkbox",
				name: "technology",
				message:
					"In which fields do you work? (Check all that apply)",
				choices: [
					"MERN",
					"PERN",
					"LAMP",
					"Backend",
					"FrontEnd",
					"DevOps",
					"Tester",
					"UI/UX",
					"Android",
					"IOS",
				],
			},
			{
				type: "input",
				name: "link",
				message:
					"Link to certificate or recommendation letter of your work",
			},
			{
				type: "confirm",
				name: "confirmAddExperience",
				message: "Would you like to add another experience?",
				default: false,
			},
		])
		.then((projectData) => {
			portfolioData.experiences.push(projectData);
			if (projectData.confirmAddExperience) {
				return promptExperience(portfolioData);
			} else {
				return portfolioData;
			}
		});
};

const promptProject = (portfolioData) => {
	// If there's no 'projects' array property, create one
	if (!portfolioData.projects) {
		portfolioData.projects = [];
	}
	console.log(`
  =================
  Add a New Project
  =================
  `);
	return inquirer
		.prompt([
			{
				type: "input",
				name: "name",
				message: "What is the name of your project?",
			},
			{
				type: "input",
				name: "description",
				message: "Provide a description of the project (Required)",
				validate: (nameInput) => {
					if (nameInput) {
						return true;
					} else {
						console.log("Please enter your Project Description!");
						return false;
					}
				},
			},
			{
				type: "checkbox",
				name: "languages",
				message:
					"What languages did you use in this project? (Check all that apply)",
				choices: [
					"JavaScript",
					"HTML",
					"CSS",
					"ES6",
					"jQuery",
					"Bootstrap",
					"Node",
					"Flutter",
					"Dart",
					"PHP",
					"MySQL",
					"MongoDB",
					"PostgreSQL",
					"Firebase",
					"Flask",
					"Next.JS",
					"Python",
					"Java",
				],
			},
			{
				type: "input",
				name: "link",
				message: "Enter the GitHub link to your project. (Required)",
				validate: (nameInput) => {
					if (nameInput) {
						return true;
					} else {
						console.log("Please enter your GitHub Link!");
						return false;
					}
				},
			},
			{
				type: "confirm",
				name: "feature",
				message: "Would you like to feature this project?",
				default: false,
			},
			{
				type: "confirm",
				name: "confirmAddProject",
				message: "Would you like to enter another project?",
				default: false,
			},
		])
		.then((projectData) => {
			portfolioData.projects.push(projectData);
			if (projectData.confirmAddProject) {
				return promptProject(portfolioData);
			} else {
				return portfolioData;
			}
		});
};

promptUser()
	.then(promptProject)
	.then(promptExperience)
	.then((portfolioData) => {
		return generatePage(portfolioData);
	})
	.then((pageHTML) => {
		return writeFile(pageHTML);
	})
	.then((writeFileResponse) => {
		console.log(writeFileResponse);
		return copyFile();
	})
	.then((copyFileResponse) => {
		console.log(copyFileResponse);
	})
	.catch((err) => {
		console.log(err);
	});
