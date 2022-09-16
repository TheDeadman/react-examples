import { useEffect, useRef } from "react";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { useAppSelector } from "redux/hooks";
import HeroImage from "./Hero";
import { selectHeroesByAttribute, selectLoadingState, selectUseSimlatedSlowdown } from "../optimizedSlice";

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
    return now;
}

interface HeroListSectionProps {
    attr: string;
}

function getListSectionName(attr: string) {
    if (attr === 'str') {
        return "Strength"
    } else if (attr === 'agi') {
        return "Agility"
    } else if (attr === 'int') {
        return "Intellect"
    }
};

const HeroListSection = ({ attr }: HeroListSectionProps) => {
    const useSimulatedSlowdown = useAppSelector(selectUseSimlatedSlowdown);
    // calling our selector hook that takes an argument. 
    const heroes = useAppSelector(selectHeroesByAttribute(attr));
    const loadingState = useAppSelector(selectLoadingState);
    const hadToRunEffect = useRef(false);
    let renderCount = useRef(0);
    renderCount.current++;

    useEffect(() => {
        hadToRunEffect.current = false;
    })
    useEffect(function () {
        if (useSimulatedSlowdown) {
            wait(150);
        }
        hadToRunEffect.current = true;
    }, [heroes]);

    return (
        <div className={`hero-list-section ${attr}`}>
            <h3>{getListSectionName(attr)} - Has rendered {renderCount.current} times. </h3>
            <div>Ran useEffect on last render: {`${hadToRunEffect.current}`} - {heroes.length} items</div>
            <div className="hero-list">
                {loadingState === "loading" && (
                    <div className="loading-icon">
                        <RotateRightIcon />
                    </div>
                )}
                {loadingState !== "loading" &&
                    heroes.map((hero) => {
                        let styles = {};

                        if (hero.hidden) {
                            styles = {
                                display: 'none'
                            };
                        }

                        return (
                            <div style={styles} key={hero.name}>
                                <HeroImage localizedName={hero.localized_name} name={hero.name} />
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default HeroListSection;