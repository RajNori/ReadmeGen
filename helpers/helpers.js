function ifAnsweredBasicsThenAddText(githubUsername, email, hireLink) {

    let hasGithubUsername = githubUsername && githubUsername.length;
    let hasEmail = email && email.length;
    let hasHireLink = hireLink && hireLink.length;

    if (hasGithubUsername || hasEmail || hasHireLink) {
        let concatenate = "";
        concatenate += "Questions\n---\n";

        if (hasGithubUsername)
            concatenate += "- Where can I see more of your repositories?\n\t- Visit [" + githubUsername + "'s Repositories](https://github.com/" + githubUsername + ")\n\n";

        if (hasEmail || hasHireLink) {
            concatenate += "- Where can I reach you?";
        }

        if (hasEmail) {
            concatenate += "\n\t- You can reach me with additional questions at <a href='mailto:" + email + "'>" + email + "</a>.";
        }

        if (hasHireLink) {
            concatenate += "\n\t- Want to [hire me](" + hireLink + ")?"
        }

        return concatenate;
    } else {
        return "";
    }
} // ifAnsweredBasicsThenAddText

// Concatenate section text to ReadMe text
function ifAnsweredThenAddText(answer, alternateConcatenation) {
    let concatenate = "";
    if (answer && answer.length) {
        if (alternateConcatenation)
            concatenate = alternateConcatenation;
        else
            concatenate = answer;
    }
    return concatenate;
}

// Add table of contents if at least one question answered
function addTableofContents() {
    let toc = "";

    let { description, demo, screenshot, installation, usage, license, contribution, tests } = global.answers;

    let { githubUsername, email, hireLink } = global.answers;
    let hasGithubUsername = githubUsername && githubUsername.length;
    let hasEmail = email && email.length;
    let hasHireLink = hireLink && hireLink.length;
    let hasQuestionDetails = hasGithubUsername || hasEmail || hasHireLink;

    if (description && description.length)
        toc += "- [Description](#description)\n";
    if (demo && demo.length)
        toc += "- [Demo](#demo)\n";
    if (screenshot && screenshot.length)
        toc += "- [Screenshot](#screenshot)\n";
    if (installation && installation.length)
        toc += "- [Installation](#installation)\n";
    if (usage && usage.length)
        toc += "- [Usage](#usage)\n";
    if (license && license.length)
        toc += "- [License](#license)\n";
    if (contribution && contribution.length)
        toc += "- [Contribution](#contribution)\n";
    if (tests && tests.length)
        toc += "- [Tests](#tests)\n";
    if (hasQuestionDetails)
        toc += "- [Questions](#questions)\n";


    let userAnsweredAtLeastOneQuestion = Boolean(toc.length);
    if (userAnsweredAtLeastOneQuestion) {
        return "Table of Contents\n---\n" + toc + "\n";
    } else {
        return "";
    }
}

function addReconciledBadges(license, badges) {
    let concatenate = "";
    if (license && license.length && badges && badges.length) {
        concatenate = getLicenseBadge(license) + " " + badges + "\n\n";
    } else if (license && license.length) {
        concatenate = getLicenseBadge(license) + "\n\n";
    } else if (badges && badges.length) {
        concatenate = badges + "\n\n";
    }
    return concatenate;
}


function getLicenseText(license) {
    switch (license) {
        case "apache2":
            return "[Apache 2.0](https://opensource.org/licenses/Apache-2.0)";
            break;
        case "bsd2":
            return "[BSD2](https://opensource.org/licenses/BSD-2-Clause)";
            break;
        case "bsd3":
            return "[BSD3](https://opensource.org/licenses/BSD-3-Clause)";
            break;

            // --

        case "cc1":
            return "[CC 1.0 License](http://creativecommons.org/publicdomain/zero/1.0/)";
            break;
        case "cc4-international":
            return "[CC 4.0 International](https://creativecommons.org/licenses/by/4.0/)";
            break;
        case "cc4-sharealike":
            return "[CC 4.0 Share Alike](https://creativecommons.org/licenses/by-sa/4.0/)";
            break;

            // --

        case "EPL1":
            return "[ELP 1.0](https://opensource.org/licenses/EPL-1.0)";
            break;
        case "GNU GPLv2":
            return "[GNU General Public License v2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
            break;
        case "GNU GPLv3":
            return "[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0)";
            break;

            // --

        case "MIT":
            return "[MIT License](https://opensource.org/licenses/MIT)";
            break;
        case "Unlicense":
            return "[Unlicense](http://unlicense.org/)";
            break;

        default:
            return "";
    }
}


function getLicenseBadge(license) {
    switch (license) {
        case "apache2":
            return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            break;
        case "bsd2":
            return "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
            break;
        case "bsd3":
            return "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
            break;

            // --

        case "cc1":
            return "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)";
            break;
        case "cc4-international":
            return "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)";
            break;
        case "cc4-sharealike":
            return "[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)";
            break;

            // --

        case "EPL1":
            return "[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)";
            break;
        case "GNU GPLv2":
            return "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
            break;
        case "GNU GPLv3":
            return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
            break;

            // --

        case "MIT":
            return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            break;
        case "Unlicense":
            return "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
            break;

        default:
            return "";
    }
}

module.exports = { ifAnsweredThenAddText, addTableofContents, ifAnsweredBasicsThenAddText, getLicenseText, getLicenseBadge, addReconciledBadges }