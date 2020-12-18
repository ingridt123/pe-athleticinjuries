import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import BodyPartsSection from '../components/body-parts-section'

// template for body part pages
// TODO side bar to jump to headings
// description, stretching, strengthening, myofascial release
// gif with description below

export default function BodyParts({ data }) {
    const bodyPart = data.bodyPart;
    return (
        <Layout>
            <div>
                <h1>{bodyPart.fields.title}</h1>
                <p>{bodyPart.description}</p>
                <BodyPartsSection headerText="Myofascial Release" exercises={bodyPart.childrenExerciseMyofascial} />
                <BodyPartsSection headerText="Stretching" exercises={bodyPart.childrenExerciseStretching} />
                <BodyPartsSection headerText="Strengthening" exercises={bodyPart.childrenExerciseStrengthening} />
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
                gifUrl
                description
            }
            childrenExerciseStretching {
                title
                gifUrl
                description
            }
            childrenExerciseStrengthening {
                title
                gifUrl
                description
            }
        }
    }
`