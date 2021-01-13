const path = require(`path`)
// console.log()

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `BodyPart` || node.internal.type === `General`) {
        let title = node.id.split('-');
        if (node.internal.type === `BodyPart`) {
            title.shift();
        }
        for (let i = 0; i < title.length; i++) {
            if (title[i] !== `and`) {
                title[i] = title[i].charAt(0).toUpperCase() + title[i].slice(1).toLowerCase();
            }
        }
        title = title.join(' ');

        createNodeField({
            node,
            name: `slug`,
            value: node.id,
        })
        createNodeField({
            node,
            name: `title`,
            value: title,
        })
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result1 = await graphql(`
        query {
            allBodyPart(sort: {fields: fields___slug}) {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    const result2 = await graphql(`
        query {
            allGeneral(sort: {fields: fields___slug}) {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    result1.data.allBodyPart.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/body-parts.js`),
            context: {
                slug: node.fields.slug,
            }
        })
    })

    result2.data.allGeneral.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/general-exercises.js`),
            context: {
                slug: node.fields.slug,
            }
        })
    })
}