import { useRef, memo } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { HeroData, selectUseSimlatedSlowdown, setSelectedHero } from "../optimizedSlice"

interface HeroProps {
    localizedName: string;
    name: string;
}

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
    return now;
}

const HeroImage = memo(({ localizedName, name }: HeroProps) => {
    const dispatch = useAppDispatch();
    const useSimulatedSlowdown = useAppSelector(selectUseSimlatedSlowdown)
    let renderCount = useRef(0);
    renderCount.current++;

    if (useSimulatedSlowdown) {
        wait(15);
    }

    return (
        <div onClick={() => dispatch(setSelectedHero(localizedName))} className={`hero-link`}>
            <div className="render-count">Render Count: {renderCount.current}</div>
            <div className="hero-link-name">
                <div>
                    {localizedName}
                </div>
            </div>
            <img alt={localizedName} src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${name.replace("npc_dota_hero_", "")}.png`} />
        </div>
    )
});

export default memo(HeroImage);