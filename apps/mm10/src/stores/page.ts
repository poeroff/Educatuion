import { atom } from "recoil";

export const pageAtom = atom({
	key: "pageStates",
	default: {
		selectedPage: 1,
		pageTotalNums: 1,
	},
});
