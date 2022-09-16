
import AdvancedComponent from "./src/MemoizedComponent";
import ReactComponent from './Memoized.mdx'
import { ExampleMarkdownDisplay } from "features/examples/ExampleMarkdownDisplay";

const PropsVsStateCombined = () => {
  return (
    <ExampleMarkdownDisplay descriptionBlock={ReactComponent} componentBlock={<AdvancedComponent />} />
  )
}

export default PropsVsStateCombined;