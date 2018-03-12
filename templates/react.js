const component = componentName =>
`import React from 'react';

const ${componentName} = (props)=>{
  return (
    <div>
    </div>
  )
} 

export default ${componentName};
`;

const container = componentName =>
`import React, { Component } from 'react';
import ${componentName} from './${componentName}.js';

class ${componentName}Container extends Component {
  constructor(props){
    super(props);
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

const index = componentName =>
`import ${componentName} from './${componentName}';
import ${componentName}Container from './${componentName}Container';
export default ${componentName}Container;
export {${componentName}, ${componentName}Container};
`;


module.exports = {
  component,
  container,
  index
};