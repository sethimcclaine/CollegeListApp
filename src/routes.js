import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Add = Loadable({
  loader: () => import('./views/Add'),
  loading: Loading,
});

const Edit = Loadable({
  loader: () => import('./views/Edit'),
  loading: Loading,
});

const View = Loadable({
  loader: () => import('./views/View'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },

  { path: '/mod', exact: true, name: 'View', component: View },
  { path: '/mod/add', exact: true, name: 'Add', component: Add},
  { path: '/mod/edit/:id', exact: true, name: 'Edit', component: Edit},
];

export default routes;
