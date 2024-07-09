import { atom } from "recoil";

export const timerAtom = atom({
	key: "timerStates",
	default: {
		seconds: 600,
		isVisible: false,
		isRunningTimer: false,
	},
});
