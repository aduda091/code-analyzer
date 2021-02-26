const fs = require('fs');
const path = require('path');
const projects = require('./constants/projects');

const basePath = path.resolve(__dirname, '..');
const packageFileName = 'package.json';
const composerFileName = 'composer.json';

const dependencyAggregate = [];

const parsePackage = (targetPackageFileName) => {
    if (!fs.existsSync(targetPackageFileName)) {
        // package.json not found in target folder
        return;
    } else {
        // parse package.json file and extract dependencies
        const package = fs.readFileSync(targetPackageFileName, 'utf-8');
        const parsedPackage = JSON.parse(package);
        
        if (parsedPackage.dependencies) {
            const dependencies = Object.keys(parsedPackage.dependencies);
            dependencyAggregate.push(...dependencies);
        }

        if (parsedPackage.devDependencies) {
            const devDependencies = Object.keys(parsedPackage.devDependencies);
            dependencyAggregate.push(...devDependencies);
        }
    }
}

const parseComposer = (targetComposerFileName) => {
    if (!fs.existsSync(targetComposerFileName)) {
        // composer.json not found in target folder
        return;
    } else {
        // parse composer.json file and extract dependencies
        const package = fs.readFileSync(targetComposerFileName, 'utf-8');
        const parsedPackage = JSON.parse(package);

        const dependencies = Object.keys(parsedPackage.require);
        dependencyAggregate.push(...dependencies);

        if (parsedPackage["require-dev"]) {
            const devDependencies = Object.keys(parsedPackage["require-dev"]);
            dependencyAggregate.push(...devDependencies);
        }
    }
}

projects.forEach(projectName => {
    const projectDirPath = path.join(basePath, projectName);
    const targetPackageFileName = path.join(projectDirPath, packageFileName);
    const targetComposerFileName = path.join(projectDirPath, composerFileName);

    parsePackage(targetPackageFileName);
    parseComposer(targetComposerFileName);
    
});

dependencyAggregate.sort((a, b) => {
    if (a > b) return 1;
    else return -1;
});

// write wordlist to file
const data = dependencyAggregate.join('\n');
fs.writeFileSync('wordlist.txt', data, 'utf-8');

// write wordlist to csv
const dataCsv = dependencyAggregate.join(',');
fs.writeFileSync('wordlist.csv', dataCsv, 'utf-8');
