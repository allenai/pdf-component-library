/**
 * This is the top-level component that defines your UI application.
 *
 * This is an appropriate spot for application wide components and configuration,
 * stuff like application chrome (headers, footers, navigation, etc), routing
 * (what urls go where), etc.
 *
 * @see https://github.com/reactjs/react-router-tutorial/tree/master/lessons
 */

import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { Header, Content, Footer, Layout } from '@allenai/varnish/components';
import Menu from 'antd/es/menu';
import { Link } from '@allenai/varnish-react-router';

import { About, Home } from './pages';
import { AppRoute } from './AppRoute';

/**
 * An array capturing the available routes in your application. You can
 * add or remove routes here.
 */
const ROUTES: AppRoute[] = [
    {
        path: '/',
        label: 'Home',
        component: Home,
    },
    {
        path: '/about',
        label: 'About',
        component: About,
    },
];

export const App = (props: RouteComponentProps) => {
    return (
        <BrowserRouter>
            <Route path="/">
                <Layout bgcolor="white">
                    <Header>
                        <Header.Columns columns="auto 1fr auto">
                            <Header.Logo label={<Header.AppName>Skiff</Header.AppName>}>
                                <SimpleLogo>
                                    <span role="img" aria-label="Skiff Logo">
                                        {
                                            ['⛵️', '⚓️', '🐠', '🛶', '🐟', '🐙', '🐡'][
                                                Math.floor(Math.random() * 7)
                                            ]
                                        }
                                    </span>
                                </SimpleLogo>
                            </Header.Logo>
                            <span />
                            <Header.MenuColumn>
                                <Menu
                                    defaultSelectedKeys={[props.location.pathname]}
                                    mode="horizontal">
                                    {ROUTES.map(({ path, label }) => (
                                        <Menu.Item key={path}>
                                            <Link to={path}>{label}</Link>
                                        </Menu.Item>
                                    ))}
                                </Menu>
                            </Header.MenuColumn>
                        </Header.Columns>
                    </Header>
                    <Content main>
                        {ROUTES.map(({ path, component }) => (
                            <Route key={path} path={path} exact component={component} />
                        ))}
                    </Content>
                    <Footer />
                </Layout>
            </Route>
        </BrowserRouter>
    );
};

const SimpleLogo = styled.div`
    border-radius: 25px;
    width: 50px;
    height: 50px;
    line-height: 1;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: ${({ theme }) => theme.color.B2};
`;
