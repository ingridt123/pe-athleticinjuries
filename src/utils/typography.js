import Typography from "typography"
import grandViewTheme from "typography-theme-grand-view"
// import fairyGatesTheme from "typography-theme-fairy-gates"

const typography = new Typography(grandViewTheme)
// const typography = new Typography(fairyGatesTheme)

export const { scale, rhythm, options } = typography
export default typography