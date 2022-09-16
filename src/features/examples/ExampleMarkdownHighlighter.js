import SyntaxHighlighter from 'react-syntax-highlighter'
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function code({ className, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return match
        ? <SyntaxHighlighter
            style={vscDarkPlus}
            showLineNumbers
            PreTag="div" {...props} />
        : <code className={className} {...props} />
}

const HighlightComponent = (Component) => <Component components={{ code }} />

export default HighlightComponent;