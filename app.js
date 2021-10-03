const inquirer = require("inquirer");

const { writeFile, copyFile } = require("./utils/generate-site.js");

const generatePage = require("./src/page-template.js");
const { LANGUAGES_LIST, TECHNOLOGY_LIST } = require("./src/constants/globalConstants")

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
		{
			type: "confirm",
			name: "confirmImage",
			message:
				'Would you like to include a Profile Image?',
			default: true,
		},
		{
			type: "input",
			name: "imgUrl",
			message: "Provide a URL of your profile image",
			when: ({ confirmImage }) => confirmImage,
			validate: (link) => {
				if (/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig.test(link) || link.length == 0) {
					return true;
				} else {
					console.log("Please enter a valid link or leave it blank");
					return false;
				}
			},
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
					"On Which Technology you have work? (Check all that apply)",
				choices: TECHNOLOGY_LIST.sort(),
			},
			{
				type: "input",
				name: "link",
				message:
					"link to certificate or recommandation letter or your work",
				validate: (link) => {
					if (/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig.test(link) || link.length == 0) {
						return true;
					} else {
						console.log("Please enter a valid link or leave it blank");
						return false;
					}
				},
			},
			{
				type: "confirm",
				name: "confirmAddExperience",
				message: "Would you like to add an experience?",
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
				message: "What is the name of your project? (Required)",
				validate: (nameInput) => {
					if (nameInput) {
						return true;
					} else {
						console.log("Please enter your Project Name!");
						return false;
					}
				},
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
					"What did you this project with? (Check all that apply)",
				choices: LANGUAGES_LIST.sort(),
			},
			{
				type: "input",
				name: "link",
				message: "Enter the GitHub link to your project. (Required)",
				validate: (nameInput) => {
					if (/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig.test(nameInput) || nameInput.length == 0) {
						return true;
					} else {
						console.log("Please enter your valid project link or leave it blank");
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

const promptContactDetails = (portfolioData) => {
	if (!portfolioData.contactDetails) {
		portfolioData.contactDetails = [];
	}
	console.log(`
  ========================
  Add your contact details
  ========================
  `);
	return inquirer
		.prompt([
			{
				type: "confirm",
				name: "confirmEmail",
				message:
					'Would you like to enter a work email for contacting you?',
				default: false,
			},
			{
				type: "input",
				name: "email",
				message: "Enter your email",
				when: ({ confirmEmail }) => confirmEmail,
				validate: (email) => {
					if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email)) {
						return true;
					} else {
						console.log("Please enter a valid email");
						return false;
					}
				},
			},
			{
				type: "confirm",
				name: "confirmNumber",
				message:
					'Would you like to enter a work phone for contacting you?',
				default: false,
			},
			{
				type: "input",
				name: "number",
				message: "Enter your number",
				when: ({ confirmNumber }) => confirmNumber,
				validate: (number) => {
					if (number) {
						return true;
					} else {
						console.log("Please enter your contact number");
						return false;
					}
				},
			},
			{
				type: "input",
				name: "githubLink",
				message: "Enter the link to your GitHub profile",
				validate: (link) => {
					if (/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig.test(link) || link.length == 0) {
						return true;
					} else {
						console.log("Please enter your valid GitHub Link or leave it blank!");
						return false;
					}
				},
			},
			{
				type: "input",
				name: "linkedinLink",
				message: "Enter the link to your LinkedIn profile",
				validate: (link) => {
					if (/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig.test(link) || link.length == 0) {
						return true;
					} else {
						console.log("Please enter your valid LinkedIn Link or leave it blank!");
						return false;
					}
				},
			},
			{
				type: "input",
				name: "twitterLink",
				message: "Enter the link to your Twitter profile",
				validate: (link) => {
					if (/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig.test(link) || link.length == 0) {
						return true;
					} else {
						console.log("Please enter your valid Twitter Link or leave it blank!");
						return false;
					}
				},
			},
			{
				type: "input",
				name: "instagramLink",
				message: "Enter the link to your Instagram profile",
				validate: (link) => {
					if (/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig.test(link) || link.length == 0) {
						return true;
					} else {
						console.log("Please enter your valid Instagram Link or leave it blank!");
						return false;
					}
				},
			},
		])
		.then((contactData) => {
			portfolioData.contactDetails.push(contactData);
			return portfolioData;
		});
};

promptUser()
	.then(promptProject)
	.then(promptExperience)
	.then(promptContactDetails)
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