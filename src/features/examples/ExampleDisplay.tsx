import { ReactElement } from "react";

export const ExampleDisplay = ({ descriptionBlock, componentBlock }: { descriptionBlock: ReactElement, componentBlock: ReactElement }) => {
    return (
        <div className="example-container">
            <div>
                {descriptionBlock}
            </div>
            <div>
                {componentBlock}
            </div>
        </div>
    );
};
