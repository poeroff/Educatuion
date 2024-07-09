import { atom } from "recoil";

const audioState = atom<number>({
	key: "audioState",
	default: 0,
});

export default audioState;
