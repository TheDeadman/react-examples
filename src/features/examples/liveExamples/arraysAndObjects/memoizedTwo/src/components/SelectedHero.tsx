import { useRef } from "react";

interface SelectedHeroProps {
    selectedHero: string
}

const SelectedHero = ({ selectedHero }: SelectedHeroProps) => {
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