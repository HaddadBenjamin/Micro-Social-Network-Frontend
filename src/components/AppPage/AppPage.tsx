import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavbarToggler,
    MDBCollapse,
    MDBMask,
    MDBView,
    MDBContainer,
    MDBFormInline,
    MDBNavLink
} from "mdbreact";
import "./AppPage.css";
import ItemFirstPage from "../Items/ItemFirstPage";
import ItemSecondPage from "../Items/ItemSecondPage";
import SuggestionFirstPage from "../Suggestions/SuggestionFirstPage";
import SuggestionSecondPage from "../Suggestions/SuggestionSecondPage";
import {useDispatch} from "react-redux";
import {getIp} from "../../actions/user.action";

enum ApplicationPage
{
    Items,
    Suggestions
}

const AppPage = () =>
{
    const [isNavigationBarIsCollapsed, setIsNavigationBarIsCollapsed] = useState(false);
    const [activePage, setActivePage] = useState(ApplicationPage.Suggestions);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIp())
    });

    function onClickOnNavigationBar(): void
    {
        setIsNavigationBarIsCollapsed(!isNavigationBarIsCollapsed);
    };

    function onClickOnNavigationLink(applicationPage: ApplicationPage): void
    {
        setActivePage(applicationPage);
    }

    function isActivePageEqualsTo(applicationPage: ApplicationPage): boolean
    {
        return applicationPage === activePage;
    }

    const overlay = (
        <div
            id="sidenav-overlay"
            style={{backgroundColor: "transparent"}}
        />);

    return (
        <Router>
            <div id="apppage">
                <div>
                    <MDBNavbar
                        color="primary-color"
                        dark
                        expand="md"
                        fixed="top"
                        scrolling
                        transparent
                    >
                        <MDBContainer>
                            <MDBNavbarBrand>
                                <strong className="white-text">Diablo II - Documentation</strong>
                            </MDBNavbarBrand>
                            <MDBNavbarToggler onClick={onClickOnNavigationBar}/>
                            <MDBCollapse isOpen={isNavigationBarIsCollapsed} navbar>
                                <MDBNavbarNav right>
                                    <MDBNavItem active={isActivePageEqualsTo(ApplicationPage.Items)}>
                                        <MDBNavLink to="items"
                                                    onClick={() => onClickOnNavigationLink(ApplicationPage.Items)}>Items</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem active={isActivePageEqualsTo(ApplicationPage.Items)}>
                                        <MDBNavLink to="suggestions"
                                                    onClick={() => onClickOnNavigationLink(ApplicationPage.Suggestions)}>Suggestions</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBFormInline waves>
                                    </MDBFormInline>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBContainer>
                    </MDBNavbar>

                    {isNavigationBarIsCollapsed && overlay}
                </div>
                <MDBView>
                    <MDBMask className="d-flex justify-content-center align-items-center gradient">
                        <MDBContainer>
                            <Switch>
                                <Route path="/items">
                                    <ItemFirstPage/>
                                </Route>
                                <Route path="/suggestions">
                                    <SuggestionFirstPage/>
                                </Route>
                                <Route path="/">
                                    <ItemFirstPage/>
                                </Route>
                            </Switch>
                        </MDBContainer>
                    </MDBMask>
                </MDBView>
            </div>
            <Switch>
                <Route path="/items">
                    <ItemSecondPage/>
                </Route>
                <Route path="/suggestions">
                    <SuggestionSecondPage/>
                </Route>
                <Route path="/">
                    <ItemSecondPage/>
                </Route>
            </Switch>
        </Router>
    );
}

export default AppPage;