import React from 'react';


const ImportData = React.lazy(() => import('../views/Page/Project/ImportData')); 
const Labels = React.lazy(() => import('../views/Page/Project/Label')); 
const ExportData = React.lazy(()=> import('../views/Page/Project/ExportData'))
const Dataset = React.lazy(()=> import('../views/Page/Project/Dataset'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const projectRoutes = [
  { path: '/project/:id/import', name: 'ImportData', component: ImportData },
  { path: '/project/:id/export', name: 'ExportData', component: ExportData },
  { path: '/project/:id/labels',  exact: true, name: 'Labels', component: Labels},
  { path: '/project/:id/dataset',  exact: true, name: 'Dataset', component: Dataset}

];

export default projectRoutes;
