import RotateRightIcon from "@mui/icons-material/RotateRight";
import { useEffect, useMemo, useRef } from "react";
import { HeroData } from "../MemoizedComponent";
import HeroImage from "./Hero";

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
    loadingState: string;
    heroes: HeroData[];
    handleHeroClick: (str: string) => void;
    useSimulatedSlowdown: boolean;
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

const HeroListSection = ({ attr, loadingState, heroes, handleHeroClick, useSimulatedSlowdown }: HeroListSectionProps) => {
    const hadToRunEffect = useRef(false);
    let renderCount = useRef(0);
    renderCount.current++;

    useEffect(() => {
        hadToRunEffect.current = false;
    })

    // This is a hack. Don't use useMemo like this... it is for calculating and returning a value.
    useMemo(function () {
        if (useSimulatedSlowdown) {
            wait(150);
        }
        hadToRunEffect.current = true;
    }, [heroes, useSimulatedSlowdown]);

    return (
        <div className={`hero-list-section ${attr}`}>
            <h3>{getListSectionName(attr)} - Has rendered {renderCount.current} times. </h3>
            <div>Ran useEffect on last render: {`${hadToRunEffect.current}`} - {heroes.length}</div>
            <div className="hero-list">
                {loadingState === "loading" && (
                    <div className="loading-icon">
                        <RotateRightIcon />
                    </div>
                )}
                {loadingState !== "loading" &&
                    heroes.map((hero) => {
                        // Create a styles object that sets display: none if the hero should be hidden
                        let styles = {};

                        if (hero.hidden) {
                            styles = {
                                display: "none"
                            }
                        }
                        return (
                            // Wrap the HeroImage in a div that we apply the styles to
                            <div style={styles} key={hero.name}>
                                {/* Passed the handleHeroClick reference down because we were creating a new object each time we created an inline function that broke memoization. */}
                                <HeroImage useSimulatedSlowdown={useSimulatedSlowdown} hero={hero} onClick={handleHeroClick} />
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default HeroListSection;