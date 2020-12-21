import React, { useState } from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useStaticQuery, Link, graphql } from "gatsby"

import styles from "./layout.module.css"

// container with header
// title
// navigation bar with dropdowns (general, upper body, lower body)

// TODO: change nav bar for responsive
// TODO: add caret?
// TODO: add authentication
// TODO: add change size
// TODO: add change language
export default function Layout({ children }) {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
                allBodyPart(sort: {fields: id}) {
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

    // const [dropdown, setDropdown] = useState({
    //     "general": false, 
    //     "upper": false, 
    //     "lower": false
    // });

    // let newState = JSON.parse(JSON.stringify(dropdown));
    // newState[title] = true;
    // setDropdown(newState);

    const [dropdown, setDropdown] = useState(null);
    const dropdownTitles = ["general", "upper", "lower"]

    function hoverOn(title) {
        setDropdown(title);
    }

    function hoverOff() {
        setDropdown(null);
    }

    return (
        <div id={styles.container}>
            <header id={styles.header}>
                <Link to="/" id={styles.headerLink}>
                    <h3 id={styles.headerHeading}>{data.site.siteMetadata.title}</h3>
                </Link>
                <ul id={styles.dropdowns}>
                    <DropdownButton title="General" className={styles.dropdown}
                                    onMouseEnter={hoverOn.bind(this, dropdownTitles[0])}
                                    onMouseLeave={hoverOff.bind(this)}
                                    show={dropdown === dropdownTitles[0]}>
                        <Dropdown.Item href="/terminology" className={styles.dropdownItem}>Terminology</Dropdown.Item>
                        <Dropdown.Item href="/stretches">Stretches</Dropdown.Item>
                        <Dropdown.Item href="/activation">Activation</Dropdown.Item>
                        <Dropdown.Item href="/warm-up">Warm Up</Dropdown.Item>
                        <Dropdown.Item href="/cool-down">Cool Down</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton title="Upper Body" className={styles.dropdown}
                                    onMouseEnter={hoverOn.bind(this, dropdownTitles[1])}
                                    onMouseLeave={hoverOff.bind(this)}
                                    show={dropdown === dropdownTitles[1]}>
                        {data.allBodyPart.edges.map( bp => {
                            if (bp.node.type === "upper") {
                                return <Dropdown.Item href={"/" + bp.node.id} key={bp.node.id}>{bp.node.fields.title}</Dropdown.Item>
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
                                return <Dropdown.Item href={"/" + bp.node.id} key={bp.node.id}>{bp.node.fields.title}</Dropdown.Item>
                            }
                            return <></>
                        })}
                    </DropdownButton>
                </ul>
            </header>
            {children}
        </div>
    )
}