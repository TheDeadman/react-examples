import { ReactElement } from "react";

export const ExampleDisplay = ({ descriptionBlock, componentBlock }: { descriptionBlock: ReactElement, componentBlock: ReactElement }) => {
    return (
        <div className="example-container">
            <div>
                {componentBlock}
            </div>
        </div>
    );
};
