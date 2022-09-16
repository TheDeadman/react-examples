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
                    heroes.map((hero) => (
                        <HeroImage useSimulatedSlowdown={useSimulatedSlowdown} key={hero.name} hero={hero} onClick={() => handleHeroClick(hero.localized_name)} />
                    ))}
            </div>
        </div>
    )
}

export default HeroListSection;