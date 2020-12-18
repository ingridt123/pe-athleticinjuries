import React from 'react'
import Layout from '../components/layout';
import { Link } from "gatsby"

import styles from "./index.module.css"
import musculoskeletal from "../img/musculoskeletal.png"

// home page
// anatomy with highlightable links to other pages
// links to anatomical terminology, stretches, activation, warm up, cool down

// TODO: option to make other languages
// TODO: add authentication

// TODO: scale image map

const ListLink = props => (
    <li className={styles.listLink}>
      <Link to={props.to}>{props.children}</Link>
    </li>
)

export default function Home({ data }) {
    return (
        <Layout>
            <h1>Home</h1>
            <div className={styles.row}>
                <div className={styles.column}>
                    <p>Welcome to {data.site.siteMetadata.title}. Click the links below or the anatomical diagram to learn more!</p>
                    <ul style={{ listStyle: `none` }}>
                        <ListLink to="/terminology">Terminology</ListLink>
                        <ListLink to="/stretching">Stretching</ListLink>
                        <ListLink to="/activation">Activation</ListLink>
                        <ListLink to="/warm-up">Warm Up</ListLink>
                        <ListLink to="/cool-down">Cool Down</ListLink>
                    </ul>
                    <p>Credit to CMS athletic trainers.</p>
                </div>
                <div className={styles.column}>
                    <img className={styles.anatomy} src={musculoskeletal} usemap="#anatomy-map"/>
                    <map name="anatomy-map">
                        <area target="" alt="Knee" title="Knee" href="/5.1-knee" coords="115,469,284,560" shape="rect" />
                        <area target="" alt="Hip" title="Hip" href="/5.2-hip" coords="121,292,266,428" shape="rect" />
                        <area target="" alt="Ankle" title="Ankle" href="/4-ankle" coords="119,628,278,677" shape="rect" />
                        <area target="" alt="Spine" title="Spine" href="/6-spine" coords="209,214,172,132" shape="rect" />
                        <area target="" alt="Core" title="Core" href="/7-core" coords="132,217,251,290" shape="rect" />
                        <area target="" alt="Shoulder" title="Shoulder" href="/8-shoulder" coords="94,132,161,202" shape="rect" />
                        <area target="" alt="Shoulder" title="Shoulder" href="/8-shoulder" coords="220,198,284,131" shape="rect" />
                        <area target="" alt="Elbow" title="Elbow" href="/9-elbow" coords="75,228,128,289" shape="rect" />
                        <area target="" alt="Elbow" title="Elbow" href="/9-elbow" coords="255,283,300,226" shape="rect" />
                        <area target="" alt="Wrist" title="Wrist" href="/10.1-wrist" coords="46,311,106,353" shape="rect" />
                        <area target="" alt="Wrist" title="Wrist" href="/10.1-wrist" coords="279,347,339,309" shape="rect" />
                        <area target="" alt="Hand" title="Hand" href="/10.2-hand" coords="28,355,99,412" shape="rect" />
                        <area target="" alt="Hand" title="Hand" href="/10.2-hand" coords="351,350,281,407" shape="rect" />
                        <area target="" alt="Head and Neck" title="Head and Neck" href="/11-headneck" coords="136,20,244,127" shape="rect" />
                    </map>

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
            }
        }
    }
`