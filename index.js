const fs = require('fs');
const path = require('path');
const projects = require('./constants/projects');

const basePath = path.resolve(__dirname, '..');
const packageFileName = 'package.json';

const dependencyAggregate = [];

projects.forEach(projectName => {
    const projectDirPath = path.join(basePath, projectName);
    const targetPackageFileName = path.join(projectDirPath, packageFileName);

    if (!fs.existsSync(targetPackageFileName)) {
        // package.json not found in target folder
        return;
    } else {
        // parse package.json file and extract dependencies
        const package = fs.readFileSync(targetPackageFileName, 'utf-8');
        const parsedPackage = JSON.parse(package);

        const dependencies = Object.keys(parsedPackage.dependencies);
        dependencyAggregate.push(...dependencies);

        // not all projects must have devDependencies (sure)
        if (parsedPackage.devDependencies) {
            const devDependencies = Object.keys(parsedPackage.devDependencies);
            dependencyAggregate.push(...devDependencies);
        }
    }
});

dependencyAggregate.sort((a, b) => {
    if (a > b) return 1;
    else return -1;
});

// write wordlist to file
const data = dependencyAggregate.join('\n');
fs.writeFileSync('wordlist.txt', data, 'utf-8');
