import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as R from 'ramda';
import {
    Alert,
    Container,
} from 'reactstrap';
import { map } from 'ramda';

import {
    AppAside,
    AppBreadcrumb,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultHeader from './DefaultHeader';

class DefaultLayout extends Component {
    render() {
        let alert = 0;

        return (
            <div className="app">
                <AppHeader fixed>
                    <DefaultHeader />
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display={ null/*lg*/ }>
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <AppSidebarNav navConfig={ navigation } { ...this.props } />
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb appRoutes={ routes }/>
                        { R.map((msg) => (
                            <Alert key={ alert++ } color={ msg.type } isOpen={ true } toggle={ this.props.clearNotifications }>
                                {msg.message}
                            </Alert>
                        ), this.props.appReducer.messages)}

                        <Container fluid>
                            <Switch>
                                { map((route) => {
                                    return route.component ? (<Route key={ route.name } path={ route.path } exact={ route.exact } name={ route.name } render={ (props) => (
                                        <route.component { ...props } />
                                    ) } />) : (null);
                                }, routes)}
                                <Redirect from="/" to="/mod" />
                            </Switch>
                        </Container>
                    </main>
                    <AppAside fixed hidden>
                        <DefaultAside />
                    </AppAside>
                </div>
            </div>
        );
    }
}

DefaultLayout.propTypes = {
    appReducer: PropTypes.object,
    clearNotifications: PropTypes.func,
};

export default DefaultLayout;
