
import AdvancedComponent from "./src/ReduxComponent";
import ReactComponent from './Redux.mdx'
import { ExampleMarkdownDisplay } from "features/examples/ExampleMarkdownDisplay";

const PropsVsStateCombined = () => {
  return (
    <ExampleMarkdownDisplay descriptionBlock={ReactComponent} componentBlock={<AdvancedComponent />} />
  )
}

export default PropsVsStateCombined;