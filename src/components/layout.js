import React, { useState } from 'react'
import { DropdownButton } from 'react-bootstrap'
import { useStaticQuery, Link, graphql } from "gatsby"
import { FaBars } from "@react-icons/all-files/fa/FaBars"
import { FaTimes } from "@react-icons/all-files/fa/FaTimes"
import { FaCaretDown } from "@react-icons/all-files/fa/FaCaretDown"

import styles from "./layout.module.css"
import favicon from "../images/icon.png"

// container with header
// title
// navigation bar with dropdowns (general, upper body, lower body)

// TODO: add caret?
// TODO: add authentication
// TODO: add change size
// TODO: add change language
// TODO: add top button?
export default function Layout({ children }) {
    // const [mobile, setMobile] = useState(window.innerWidth < MOBILE_WIDTH);
    // useEffect(() => {
    //     window.addEventListener('resize', () => {setMobile(window.innerWidth < MOBILE_WIDTH);});
    // }, [])

    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
                allBodyPart(sort: {fields: fields___title}) {
                    edges {
                        node {
                            id
                            type
                            fields {
                                title
                            }
                        }
                    }
                }
            }
        `
    )

    const dropdownTitles = ["general", "upper", "lower"]
    const generalPages = [
        {
            title: "Terminology",
            href: "/terminology",
        },
        {
            title: "Stretches",
            href: "/stretches",
        },
        {
            title: "Activation",
            href: "/activation",
        },
        {
            title: "Warm Up",
            href: "/warm-up",
        },
        {
            title: "Cool Down",
            href: "/cool-down",
        },
    ]

    // const [dropdown, setDropdown] = useState({
    //     "general": false, 
    //     "upper": false, 
    //     "lower": false
    // });

    // let newState = JSON.parse(JSON.stringify(dropdown));
    // newState[title] = true;
    // setDropdown(newState);

    const [dropdown, setDropdown] = useState(null);

    function hoverOn(title) {
        setDropdown(title);
    }

    function hoverOff() {
        setDropdown(null);
    }

    const [mobileMenu, setMobileMenu] = useState(false);
    const [mobileMenuDropdown, setMobileMenuDropdown] = useState(null)

    function handleMobileMenu() {
        setMobileMenuDropdown(null);
        setMobileMenu(!mobileMenu);
    }

    function closeMobileMenu() {
        setMobileMenuDropdown(null);
        setMobileMenu(false);
    }

    function handleMobileMenuDropdown(title) {
        if (mobileMenuDropdown === title) {
            setMobileMenuDropdown(null);
        } else {
            setMobileMenuDropdown(title);
        }
    }

    // function signInWithEmailPassword(email, password) {
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //         .then((user) => {
    //             // Signed in 
    //             // ...
    //         })
    //         .catch((error) => {
    //             // var errorCode = error.code;
    //             // var errorMessage = error.message;
    //         });
    // }

    return (
        <div id={styles.container}>
            <header id={styles.header}>
                <Link to="/" id={styles.headerLink}>
                    <img id={styles.headerIcon} src={favicon} alt="Header icon" />
                    <h3 id={styles.headerHeading}>{data.site.siteMetadata.title}</h3>
                </Link>
                {/* DESKTOP VERSION */}
                <ul id={styles.dropdowns}>
                    <DropdownButton title="General" className={styles.dropdown}
                                    onMouseEnter={hoverOn.bind(this, dropdownTitles[0])}
                                    onMouseLeave={hoverOff.bind(this)}
                                    show={dropdown === dropdownTitles[0]}>
                        {generalPages.map( gp => {
                            if (dropdown === dropdownTitles[0]) {
                                return <Link to={gp.href} key={gp.title}>{gp.title}</Link>
                            }
                            return <></>
                        })}
                    </DropdownButton>
                    <DropdownButton title="Upper Body" className={styles.dropdown}
                                    onMouseEnter={hoverOn.bind(this, dropdownTitles[1])}
                                    onMouseLeave={hoverOff.bind(this)}
                                    show={dropdown === dropdownTitles[1]}>
                        {data.allBodyPart.edges.map( bp => {
                            if (bp.node.type === "upper") {
                                return <Link to={"/" + bp.node.id} key={bp.node.id}>
                                            {bp.node.fields.title}
                                       </Link>
                            }
                            return <></>
                        })}
                    </DropdownButton>
                    <DropdownButton title="Lower Body" className={styles.dropdown}
                                    onMouseEnter={hoverOn.bind(this, dropdownTitles[2])}
                                    onMouseLeave={hoverOff.bind(this)}
                                    show={dropdown === dropdownTitles[2]}>
                        {data.allBodyPart.edges.map( bp => {
                            if (bp.node.type === "lower") {
                                return <Link to={"/" + bp.node.id} key={bp.node.id}>
                                            {bp.node.fields.title}
                                       </Link>
                            }
                            return <></>
                        })}
                    </DropdownButton>
                </ul>
                {/* MOBILE VERSION (Inspired by https://www.youtube.com/watch?v=T2MhVxJxsL0) */}
                <div id={styles.mobileMenu_icon} onClick={handleMobileMenu.bind(this)}>
                    {!mobileMenu ? <FaBars /> : <FaTimes />}
                </div>
            </header>
            {mobileMenu ? 
                <div id={styles.mobileMenu}>
                    <ul id={styles.dropdownsMobile}>
                        <li>
                            <h3 className={styles.dropdownMobile_header} onClick={handleMobileMenuDropdown.bind(this, dropdownTitles[0])}>
                                General <FaCaretDown />
                            </h3>
                                {generalPages.map( gp => {
                                        return <Link to={gp.href} key={gp.title} 
                                                className={mobileMenuDropdown === dropdownTitles[0] ? styles.dropdownMobile : styles.dropdownMobile_hide}
                                                onClick={closeMobileMenu.bind(this)}>
                                                    {gp.title}
                                                </Link>
                                })}
                        </li>
                        <li>
                            <h3 className={styles.dropdownMobile_header} onClick={handleMobileMenuDropdown.bind(this, dropdownTitles[1])}>
                                Upper Body <FaCaretDown />
                            </h3>
                                {data.allBodyPart.edges.map( bp => {
                                    if (bp.node.type === "upper") {
                                        return <Link to={"/" + bp.node.id} key={bp.node.id}
                                                className={mobileMenuDropdown === dropdownTitles[1] ? styles.dropdownMobile : styles.dropdownMobile_hide}>
                                                    {bp.node.fields.title}
                                                </Link>
                                    }
                                    return <></>
                                })}
                        </li>
                        <li>
                            <h3 className={styles.dropdownMobile_header} onClick={handleMobileMenuDropdown.bind(this, dropdownTitles[2])}>
                                Lower Body <FaCaretDown />
                            </h3>
                                {data.allBodyPart.edges.map( bp => {
                                    if (bp.node.type === "lower") {
                                        return <Link to={"/" + bp.node.id} key={bp.node.id}
                                                className={mobileMenuDropdown === dropdownTitles[2] ? styles.dropdownMobile : styles.dropdownMobile_hide}>
                                                    {bp.node.fields.title}
                                                </Link>
                                    }
                                    return <></>
                                })}
                        </li>
                    </ul>
                </div>
            : <></>}
            {children}
        </div>
    )
}