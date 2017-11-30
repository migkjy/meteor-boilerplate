import React from 'react';

import LinkList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinkListFilters from './LinkListFilters';

export default () => (
  <div>
    <PrivateHeader title="June's LinksApp" />
    <LinkListFilters />
    <AddLink />
    <LinkList />
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
