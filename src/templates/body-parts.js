import React from 'react'
import { graphql } from 'gatsby'

import SEO from "../components/seo"
import Layout from '../components/layout'
import ExercisesSection from '../components/exercises-section'

// template for body part pages
// TODO side bar to jump to headings?
// description, stretching, strengthening, myofascial release
// gif with description below

export default function BodyParts({ data }) {
    const bodyPart = data.bodyPart;
    return (
        <Layout>
            <SEO title={bodyPart.fields.title} description={bodyPart.description} />
            <div>
                <h1>{bodyPart.fields.title}</h1>
                <p>{bodyPart.description}</p>
                <ExercisesSection headerText="Myofascial Release" exercises={bodyPart.childrenExerciseMyofascial} />
                <ExercisesSection headerText="Stretching" exercises={bodyPart.childrenExerciseStretching} />
                <ExercisesSection headerText="Strengthening" exercises={bodyPart.childrenExerciseStrengthening} />
            </div>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        bodyPart(fields: { slug: { eq: $slug } }) {
            description
            fields {
                title
            }
            childrenExerciseMyofascial {
                title
                stillUrl
                gifUrl
                description
            }
            childrenExerciseStretching {
                title
                stillUrl
                gifUrl
                description
            }
            childrenExerciseStrengthening {
                title
                stillUrl
                gifUrl
                description
            }
        }
    }
`