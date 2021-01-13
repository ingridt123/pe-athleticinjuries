import React from 'react'
import { graphql } from 'gatsby'

import SEO from "../components/seo"
import Layout from '../components/layout'
import ExercisesSection from '../components/exercises-section'

export default function GeneralExercises({ data }) {
    const generalExercises = data.general;

    let upperBody = [];
    let lowerBody = [];
    let fullBody = [];
    for (let i = 0; i < generalExercises.childrenExercise.length; i++) {
        if (generalExercises.childrenExercise[i].type === 'upper') {
            upperBody.push(generalExercises.childrenExercise[i]);
        } else if (generalExercises.childrenExercise[i].type === 'lower') {
            lowerBody.push(generalExercises.childrenExercise[i]);
        } else {
            fullBody.push(generalExercises.childrenExercise[i]);
        }
    }

    return (
        <Layout>
            <SEO title={generalExercises.fields.title} description={generalExercises.description} />
            <div>
                <h1>{generalExercises.fields.title}</h1>
                <p>{generalExercises.description}</p>
                <ExercisesSection headerText="Full Body" exercises={fullBody} />
                <ExercisesSection headerText="Upper Body" exercises={upperBody} />
                <ExercisesSection headerText="Lower Body" exercises={lowerBody} />
            </div>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        general(fields: { slug: { eq: $slug } }) {
            description
            fields {
                title
            }
            childrenExercise {
                title
                stillUrl
                gifUrl
                description
                type
            }
        }
    }
`