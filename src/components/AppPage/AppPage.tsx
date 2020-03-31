import React, {useState} from "react";
import {BrowserRouter as Router} from "react-router-dom";
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
import ItemPage from "../Items/ItemPage";

enum ActivePage
{
    Items,
    Suggestions
}

const AppPage = () =>
{
    const [isNavigationBarIsCollapsed, setIsNavigationBarIsCollapsed] = useState(false);

    function onClickOnNavigationButton()
    {
        setIsNavigationBarIsCollapsed(!isNavigationBarIsCollapsed);
    };

    function onClickOnNavigationBar()
    {

    }

    const overlay = (
        <div
            id="sidenav-overlay"
            style={{backgroundColor: "transparent"}}
            onClick={onClickOnNavigationButton}
        />);

    return (
        <div id="apppage">
            <Router>
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
                            <MDBNavbarToggler onClick={onClickOnNavigationButton}/>
                            <MDBCollapse isOpen={isNavigationBarIsCollapsed} navbar>
                                <MDBNavbarNav right>
                                    <MDBNavItem active>
                                        <MDBNavLink to="#!">Items</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="#!">Suggestions</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBFormInline waves>
                                    </MDBFormInline>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBContainer>
                    </MDBNavbar>

                    {isNavigationBarIsCollapsed && overlay}
                </div>
            </Router>
            <MDBView>
                <MDBMask className="d-flex justify-content-center align-items-center gradient">
                    <MDBContainer>
                        <ItemPage/>
                    </MDBContainer>
                </MDBMask>
            </MDBView>

        </div>
    );
}

export default AppPage;