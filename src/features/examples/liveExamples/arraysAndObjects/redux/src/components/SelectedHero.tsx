import { useRef } from "react";
import { useAppSelector } from "redux/hooks";
import { selectSelectedHero } from "../optimizedSlice";

const SelectedHero = () => {
    const selectedHero = useAppSelector(selectSelectedHero);
    let renderCount = useRef(0);
    renderCount.current++;

    return (
        <div className="selected-hero-container">
            <div className="selected-hero">
                Selected Hero is: {selectedHero} - has rendered {renderCount.current} times.
            </div>
        </div>
    )
};

export default SelectedHero;