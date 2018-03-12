#!/usr/bin/env node

const fs = require('fs');
const components = process.argv.slice(2);

const componentDefaultContent = componentName =>
`import React, { Component } from 'react';
import {View} from 'react-native';
import styles from './styles.js';
const ${componentName} = (props)=>{
  return (
    <View>
    </View>
  )
} 
export default ${componentName};
`;

const componentContainerDefaultContent = componentName =>
`import React, { Component } from 'react';
import ${componentName} from './${componentName}.js';
class ${componentName}Container extends Component {
  constructor(props){
    this.state = {

    }
  }
  render() {
    return (
      <${componentName} {...this.props}/>
    );
  }
}
export default ${componentName};
`;

const indexDefaultContent = componentName =>
`import ${componentName} from './${componentName}';
import ${componentName}Container from './${componentName}Container';
export default ${componentName}Container;
export {${componentName}, ${componentName}Container};
`;

const stylesDefaultContent = componentName => 
`import { StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default styles;
`

const createFile = (fileName, contents) => fs.writeFile(fileName, contents, err => {
  if (err) {
    return console.log(err);
  }
});

components.forEach(component => {
  const componentName = component.charAt(0).toUpperCase() + component.slice(1);
  const folderPrefix = `${component}/`;

  fs.existsSync(componentName) || fs.mkdirSync(componentName);

  createFile(`${folderPrefix + componentName}.js`, componentDefaultContent(componentName));
  createFile(`${folderPrefix + componentName}Container.js`, componentContainerDefaultContent(componentName));
  createFile(`${folderPrefix}styles.js`, stylesDefaultContent(componentName));
  createFile(`${folderPrefix}index.js`, indexDefaultContent(componentName));

  console.log(`Created ${componentName}`);
});