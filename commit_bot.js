const { execSync } = require('child_process'); // Used to run shell commands in Node.js
const fs = require('fs'); // File system module to edit files

// Set the number of commits (3 to 4 daily)
const numCommits = Math.floor(Math.random() * 2) + 3;

// Function to generate random JavaScript code
function generateRandomCode() {
    const codeSnippets = [
        "console.log('Hello World!');",
        "const sum = (a, b) => a + b;",
        "let randomNumber = Math.floor(Math.random() * 100);",
        "console.log('Random number:', randomNumber);",
        "let today = new Date();",
        "// This is an auto-generated comment",
    ];
    return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
}

// Function to make a commit
function makeCommit() {
    const date = new Date().toISOString(); // Get the current date and time
    const code = generateRandomCode(); // Get a random JavaScript snippet

    // Append random JavaScript code to the 'auto_commit_code.js' file
    try {
        fs.appendFileSync('auto_commit_code.js', `\n// Commit at ${date}\n${code}\n`);
        console.log(`Code appended successfully at ${date}`);
    } catch (err) {
        console.error(`Error appending code: ${err}`);
    }

    try {
        // Run git commands: add, commit, push
        execSync('git add .'); // Add all changes
        execSync(`git commit -m "Auto commit at ${date}"`); // Commit with a message containing the timestamp
        execSync('git push'); // Push the changes to the remote repository
        console.log(`Commit and push successful at ${date}`);
    } catch (err) {
        console.error(`Error during git operations: ${err}`);
    }
}

// Generate random intervals between commits (within 8 hours)
for (let i = 0; i < numCommits; i++) {
    const delay = Math.floor(Math.random() * (8 * 60 * 60 * 1000)); // Random delay between 0 and 8 hours
    setTimeout(() => {
        makeCommit();
    }, delay);
}