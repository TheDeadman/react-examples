import axios, { AxiosResponse } from 'axios';
import { HeroData } from '../optimizedSlice';

// function to wait for x ms without blocking the thread execution.
const wait = (ms: number | undefined) => new Promise(r => setTimeout(r, ms));

export const getHeroes = async (retryCount: number = 1): Promise<AxiosResponse<HeroData[], any>> => {
    try {
        return await axios.get(
            "https://api.opendota.com/api/heroes"
        ) as AxiosResponse<HeroData[]>;
    } catch (ex) {
        if (retryCount < 6) {
            await wait(300 * retryCount)
            return await getHeroes(retryCount + 1);
        } else {
            throw ex
        }
    }
}