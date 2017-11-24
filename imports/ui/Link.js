import React from 'react';

import LinkList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';

export default () => (
  <div>
    <PrivateHeader title="June's LinksApp" />
    <LinkList />
    <AddLink />
  </div>
);


// export default class Link extends React.Component {
//   render() {
//     return (
//       <div>
//         <PrivateHeader title="June's LinksApp" />
//         <LinkList />
//         <AddLink />
//       </div>
//     );
//   }
// }
