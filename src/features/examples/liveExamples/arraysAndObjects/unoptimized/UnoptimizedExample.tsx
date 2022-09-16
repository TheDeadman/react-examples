import UnoptimizedComponent from "./src/UnoptimizedComponent";
import ReactComponent from './Unoptimized.mdx'
import { ExampleMarkdownDisplay } from "features/examples/ExampleMarkdownDisplay";



const PropsVsStateCombined = () => {
  return (
    <ExampleMarkdownDisplay descriptionBlock={ReactComponent} componentBlock={<UnoptimizedComponent />} />
  )
}

export default PropsVsStateCombined;