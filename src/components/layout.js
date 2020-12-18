import React from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useStaticQuery, Link, graphql } from "gatsby"

import styles from "./layout.module.css"

// container with header
// title
// navigation bar with dropdowns (general, upper body, lower body)

// TODO: change nav bar for responsive
// TODO: add caret, add hover (onHover display? add state?)
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

    return (
        <div id={styles.container}>
            <header id={styles.header}>
                <Link to="/" id={styles.headerLink}>
                    <h3 id={styles.headerHeading}>{data.site.siteMetadata.title}</h3>
                </Link>
                <ul style={{ listStyle: `none`, float: `right` }}>
                    <DropdownButton title="General" className={styles.dropdown}>
                        <Dropdown.Item href="/terminology">Terminology</Dropdown.Item>
                        <Dropdown.Item href="/stretching">Stretching</Dropdown.Item>
                        <Dropdown.Item href="/activation">Activation</Dropdown.Item>
                        <Dropdown.Item href="/warm-up">Warm Up</Dropdown.Item>
                        <Dropdown.Item href="/cool-down">Cool Down</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton title="Upper Body" className={styles.dropdown}>
                        {data.allBodyPart.edges.map( bp => {
                            if (bp.node.type === "upper") {
                                return <Dropdown.Item href={"/" + bp.node.id}>{bp.node.fields.title}</Dropdown.Item>
                            }
                        })}
                    </DropdownButton>
                    <DropdownButton title="Lower Body" className={styles.dropdown}>
                        {data.allBodyPart.edges.map( bp => {
                            if (bp.node.type === "lower") {
                                return <Dropdown.Item href={"/" + bp.node.id}>{bp.node.fields.title}</Dropdown.Item>
                            }
                        })}
                    </DropdownButton>
                </ul>
            </header>
            {children}
        </div>
    )
}