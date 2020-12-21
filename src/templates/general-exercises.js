import React from 'react'
import { graphql } from 'gatsby'

import SEO from "../components/seo"
import Layout from '../components/layout'
import ExercisesSection from '../components/exercises-section'

export default function GeneralExercises({ data }) {
    const generalExercises = data.general;
    return (
        <Layout>
            <SEO title={generalExercises.fields.title} description={generalExercises.description} />
            <div>
                <h1>{generalExercises.fields.title}</h1>
                <p>{generalExercises.description}</p>
                <ExercisesSection headerText="Upper Body" exercises={generalExercises.childrenExerciseUpper} />
                <ExercisesSection headerText="Lower Body" exercises={generalExercises.childrenExerciseLower} />
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
            childrenExerciseUpper {
                title
                gifUrl
                description
            }
            childrenExerciseLower {
                title
                gifUrl
                description
            }
        }
    }
`