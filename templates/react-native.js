const component = componentName =>
`import React from 'react';
import { View } from 'react-native';
import styles from './styles';
const ${componentName} = (props)=>{
  return (
    <View {...props} />
  )
} 
export default ${componentName};
`;

const container = componentName =>
`import React, { Component } from 'react';
import ${componentName} from './${componentName}';
class ${componentName}Container extends Component {
  state = {}
  render() {
    return (
      <${componentName} {...this.props}/>
    );
  }
}
export default ${componentName}Container;
`;

const index = componentName =>
`import ${componentName} from './${componentName}';
import ${componentName}Container from './${componentName}Container';
export default ${componentName}Container;
export {${componentName}, ${componentName}Container};
`;

const styles = componentName => 
`import { StyleSheet/*, Dimensions*/ } from 'react-native';

// const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default styles;
`

module.exports={
  component,
  container,
  index,
  styles
};