import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { selectUseSimlatedSlowdown, setUseSimulatedSlowdown } from "../optimizedSlice"

const SimulatedSlowdownControls = () => {
    const dispatch = useAppDispatch();
    const useSimulatedSlowdown = useAppSelector(selectUseSimlatedSlowdown);
    return (
        <FormControlLabel control={<Checkbox checked={useSimulatedSlowdown} onChange={(e) => dispatch(setUseSimulatedSlowdown(e.target.checked))} />} label="Use Simulated Slowdown" />
    )
}

export default SimulatedSlowdownControls;