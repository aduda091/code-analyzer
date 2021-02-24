# Project tech analyzer

This simple node script analyzes the package.json files inside project folders you specify in `constants/projects.js`.

It then creates an alfabetically sorted list of dependencies (duplicates included) and writes it to a file.

The goal is to create a word/tag cloud so you can see which technologies are most used inside your projects.

## Installation

To work properly, this project should be in the same folder as other project folders you intend to analyze.

```bash
npm i
```

## Start

Modify the `constants/projects.js` file with the names of project folders you intend to analyze.

Then run `npm start` in the console. This will generate a wordlist.txt file if everything went well :)
