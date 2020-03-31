import React, {useState} from   "react";
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
} from "mdbreact";
import "./AppPage.css";
import ItemPage from "./ItemPage";


const AppPage = () =>
{
    const [collapsed, setCollapsed] = useState(true);

    function handleTogglerClick()
    {
        setCollapsed(!collapsed);
    };

    const overlay = (
        <div
            id="sidenav-overlay"
            style={{backgroundColor: "transparent"}}
            onClick={handleTogglerClick}
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
                            <MDBNavbarToggler onClick={handleTogglerClick}/>
                            <MDBCollapse isOpen={collapsed} navbar>
                                <MDBNavbarNav left>
                                    <MDBNavItem active>

                                        <MDBFormInline waves>
                                        </MDBFormInline>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBContainer>
                    </MDBNavbar>
                    {collapsed && overlay}
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