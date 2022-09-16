import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ReactElement, useState } from "react";
import exampleMarkdownHighlighter from './ExampleMarkdownHighlighter';

// @ts-ignore
export const ExampleMarkdownDisplay = ({ descriptionBlock, componentBlock }: { descriptionBlock: (props: MDXProps) => JSX.Element, componentBlock: ReactElement }) => {

    const [visibleComponent, setVisibleComponent] = useState('example');
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        version: string,
    ) => {
        if (version) {
            setVisibleComponent(version);
        }
    };

    return (
        <>
            <ToggleButtonGroup
                color="primary"
                value={visibleComponent}
                exclusive
                onChange={handleChange}
                className="markdown-toggle-group"
            >
                <ToggleButton value="code">Code</ToggleButton>
                <ToggleButton value="example">Example</ToggleButton>
            </ToggleButtonGroup>
            <div className="example-container">
                {visibleComponent === 'code' && <div className="markdown-container">{exampleMarkdownHighlighter(descriptionBlock)}</div>}
                {visibleComponent === 'example' && <div>{componentBlock}</div>}
            </div>
        </>

    );
};
