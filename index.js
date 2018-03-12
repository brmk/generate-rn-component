#!/usr/bin/env node

const fs = require('fs');
const minimist = require('minimist');
const reactTemplates = require('./templates/react.js');
const reactNativeTemplates = require('./templates/react-native.js');

const argv = minimist(process.argv.slice(2));

const components = argv._; 
const {react} = argv;

const createFile = (fileName, contents) => fs.writeFile(fileName, contents, err => {
  if (err) {
    return console.log(err);
  }
});

components.forEach(component => {
  const componentName = component.charAt(0).toUpperCase() + component.slice(1);
  const folderPrefix = `${component}/`;

  fs.existsSync(componentName) || fs.mkdirSync(componentName);

  let templates = react ? reactTemplates : reactNativeTemplates;
  

  createFile(`${folderPrefix + componentName}.js`, templates.component(componentName));
  createFile(`${folderPrefix + componentName}Container.js`, templates.container(componentName));
  !react && createFile(`${folderPrefix}styles.js`, templates.styles(componentName));
  createFile(`${folderPrefix}index.js`, templates.index(componentName));

  console.log(`Created ${componentName}`);
});