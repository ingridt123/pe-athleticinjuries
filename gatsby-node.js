const path = require(`path`)

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `BodyPart`) {
        let title = node.id.slice(node.id.indexOf('-')+1);
        title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
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
    const result = await graphql(`
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

    result.data.allBodyPart.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/body-parts.js`),
            context: {
                slug: node.fields.slug,
            }
        })
    })
}