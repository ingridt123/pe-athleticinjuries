import React from 'react'
import Layout from '../components/layout'
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
import ImageMapper from "../components/image-mapper"
import styles from "./index.module.css"
import musculoskeletal from "../images/musculoskeletal.png"

// home page
// anatomy with highlightable links to other pages
// links to anatomical terminology, stretches, activation, warm up, cool down

// TODO: deploy to Gatsby Cloud?

const ListLink = props => (
    <li className={styles.listLink}>
      <Link to={props.to}>{props.children}</Link>
    </li>
)

export default function Home({ data }) {
    const ANATOMY_MAP = {
        name: "anatomy-map",
        areas: [
            {name: "Ankle", shape: "rect", coords: [119,628,278,677], href: "/4-ankle"},
            {name: "Knee", shape: "rect", coords: [115,469,284,560], href: "/5.1-knee"},
            {name: "Hip", shape: "rect", coords: [121,292,266,428], href: "/5.2-hip"},
            {name: "Spine", shape: "rect", coords: [209,214,172,132], href: "/6-spine"},
            {name: "Core", shape: "rect", coords: [132,217,251,290], href: "/7-core"},
            {name: "Shoulder", shape: "rect", coords: [94,132,161,202], href: "/8-shoulder"},
            {name: "Shoulder", shape: "rect", coords: [220,198,284,131], href: "/8-shoulder"},
            {name: "Elbow", shape: "rect", coords: [75,228,128,289], href: "/9-elbow"},
            {name: "Elbow", shape: "rect", coords: [255,283,300,226], href: "/9-elbow"},
            {name: "Wrist", shape: "rect", coords: [46,310,106,345], href: "/10.1-wrist"},
            {name: "Wrist", shape: "rect", coords: [279,310,339,345], href: "/10.1-wrist"},
            {name: "Hand", shape: "rect", coords: [28,355,99,412], href: "/10.2-hand"},
            {name: "Hand", shape: "rect", coords: [351,355,281,407], href: "/10.2-hand"},
            {name: "Head and Neck", shape: "rect", coords: [136,20,244,127], href: "/11-head-and-neck"},
        ],
    }

    return (
        <Layout>
            <SEO title="Home" description={data.site.siteMetadata.description} />
            <h1>Home</h1>
            <div className={styles.row}>
                <div className={styles.column}>
                    <p>Welcome to {data.site.siteMetadata.title}. Click the links below or different body parts on the anatomical diagram to learn more!</p>
                    <ul className={styles.listLinks}>
                        <ListLink to="/terminology">Terminology</ListLink>
                        <ListLink to="/stretches">Stretches</ListLink>
                        <ListLink to="/activation">Activation</ListLink>
                        <ListLink to="/warm-up">Warm Up</ListLink>
                        <ListLink to="/cool-down">Cool Down</ListLink>
                    </ul>
                    <p>Credit to CMS athletic trainers.</p>
                </div>
                <div className={styles.column}>
                    <ImageMapper src={musculoskeletal} map={ANATOMY_MAP} name="anatomy-map" orgWidth={382} orgHeight={737} height={400}/>

                    <a href="https://www.kenhub.com/en/library/anatomy/the-musculoskeletal-system"
                       className={styles.source}>Source: KenHub</a>
                </div>
            </div>
        </Layout>
    );
}

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
                description
            }
        }
    }
`