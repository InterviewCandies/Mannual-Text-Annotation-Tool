import React from 'react';

const UserDocument = React.lazy(() => import('../views/Document/UserDocument')); 



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/document/:id',  name: 'document',component: UserDocument},  
];

export default routes;
