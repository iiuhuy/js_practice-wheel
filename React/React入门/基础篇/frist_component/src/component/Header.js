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
          </div>
        </div>
      </div>
    );
}

export default Header;
