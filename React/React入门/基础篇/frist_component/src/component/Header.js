<<<<<<< HEAD
// import React, { Component } from 'react';
import React from 'react';

// export default class Header extends Component {
//   render() {
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-xs-1 col-xs-offset-11">
//             <h1>Header</h1>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

const Header = (props) => {
  console.log(props);

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">            
            <h1>{props.homeLink}</h1>
=======
import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <h1>Header</h1>
>>>>>>> 1802f81121e20beea3a6936690dfdb8ac6b7948f
          </div>
        </div>
      </div>
    );
<<<<<<< HEAD
}

export default Header;
=======
  }
}

// export default App;
>>>>>>> 1802f81121e20beea3a6936690dfdb8ac6b7948f
