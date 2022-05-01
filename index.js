const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const { ifAnsweredThenAddText, addTableofContents, ifAnsweredBasicsThenAddText, getLicenseText, getLicenseBadge, addReconciledBadges } = require("./helpers/helpers.js");
const chalk = require("chalk");

const questions = [


    {
        name: "title",
        message: chalk.bgGreen("What is the title of your repository?")
    },
    {
        name: "githubUsername",
        message: chalk.yellow("Your Github username if any (Will create repository link):")
    },
    {
        name: "email",
        message: chalk.yellow("Your email to be reached if any:")
    },
    {
        name: "hireLink",
        message: chalk.yellow("LinkedIn, portfolio, or hiring link if any:")
    },

    {
        name: "badges",
        message: chalk.gray("If any, enter BADGE / BADGES code (markdown or html) for stats, showcasing other works, portfolio, and funding links (shields.io for more info):")
    },
    {
        name: "description",
        message: chalk.bgGreen("Enter a description:")
    },
    {
        name: "demo",
        message: chalk.gray("If any, enter LIVE DEMO code, eg. [link](https://www...). May type a placeholder text for later:")
    },
    {
        name: "video",
        message: chalk.gray("If any, enter VIDEO code, eg. [link](https://www...). May type a placeholder text for later, such as a coming soon display:\n\tComing soon! <!--Watch [walkthrough!](https://youtu.be/watch?v=NpEaa2P7qZI)-->\n\?:")
    },
    {
        name: "screenshot",
        message: chalk.gray("If any, enter SCREENSHOT code, eg. ![screenshot](https://www...). May type a placeholder text for later:")
    },
    {
        name: "installation",
        message: chalk.green.italic("Enter installation instructions if any:")
    },
    {
        name: "usage",
        message: chalk.green.italic("Enter usage information if any:")
    },


    {
        name: "license",
        choices: [
            new inquirer.Separator(),
            "-- Skip --",
            new inquirer.Separator(),
            "apache2", "bsd2", "bsd3",
            new inquirer.Separator(),
            "cc1", "cc4-international", "cc4-sharealike",
            new inquirer.Separator(),
            "EPL1", "GNU GPLv2", "GNU GPLv3",
            new inquirer.Separator(),
            "MIT", "Unlicense"
        ],
        type: 'list'
    },
    {
        name: "contribution",
        message: chalk.green.italic("Enter contribution guidelines if any:")
    },
    {
        name: "tests",
        message: chalk.green.italic("Enter test instructions if any:")
    }
];


global.answers = {};


const generateReadMe = answers => {


    let {
        title,
        githubUsername,
        email,
        hireLink,

        badges,
        description,
        demo,
        video,
        screenshot,
        installation,
        usage,
        license,
        contribution,
        tests

    } = answers;

    if (license === "-- Skip --") {
        license = null;
        answers.license = null;
    }


    global.answers = answers;


    let text = "";
    text += ifAnsweredThenAddText(title, title + "\n====\n");
    text += addReconciledBadges(license, badges);
    text += ifAnsweredThenAddText(description, "Description\n---\n" + description + "\n\n");
    text += ifAnsweredThenAddText(demo, "Demo\n---\n" + demo + "\n\n");
    text += ifAnsweredThenAddText(video, "Video Walkthrough\n---\n" + video + "\n\n");
    text += ifAnsweredThenAddText(screenshot, "Screenshot\n---\n" + screenshot + "\n\n");
    text += addTableofContents();
    text += ifAnsweredThenAddText(installation, "Installation\n---\n" + installation + "\n\n");
    text += ifAnsweredThenAddText(usage, "Usage\n---\n" + usage + "\n\n");
    text += ifAnsweredThenAddText(license, "License\n---\n" + getLicenseText(license) + "\n\n");
    text += ifAnsweredThenAddText(contribution, "Contribution\n---\n" + contribution + "\n\n");
    text += ifAnsweredThenAddText(tests, "Tests\n---\n" + tests + "\n\n");
    text += ifAnsweredBasicsThenAddText(githubUsername, email, hireLink);


    if (text.length === 0) {
        console.error("\n\nError: You skipped all questions, so there's no readme to generate.");
        process.exit(0);
    }


    const filename = "README.md";
    fs.writeFileSync(filename, text);


    console.group("README Generator");
    console.log(`Generating:\n\n${text}\nFinished.\n\nThe above README generated and written to:\n` + path.join(__dirname, filename) + "\n\n");
    console.groupEnd();

};

const catchError = err => {
    console.log("Error: ", err);
}


inquirer
    .prompt(questions)
    .then(generateReadMe)
    .catch(catchError);