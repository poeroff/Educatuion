/* eslint-disable consistent-return */

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { timerAtom } from "@/stores/timer";

export const useTimer = (initialSeconds: number) => {
	const [run, setRun] = useState<boolean>(false);
	const [timer, setTimer] = useRecoilState(timerAtom);

	const setVisibility = (visible: boolean) => {
		setTimer((timer) => ({ ...timer, isVisible: visible }));
	};
	const pauseTimer = () => {
		setRun(false);
		setTimer((timer) => ({ ...timer, isRunningTimer: false }));
	};

	const startTimer = () => {
		setRun(true);
		setTimer((timer) => ({ ...timer, isRunningTimer: true, seconds: initialSeconds ?? 0 }));
	};

	useEffect(() => {
		if (timer.isRunningTimer) {
			const count = setInterval(() => {
				setTimer((prev) => {
					return { ...prev, seconds: prev.seconds > 0 ? prev.seconds - 1 : prev.seconds };
				});
			}, 1000);
			return () => clearInterval(count);
		}
	}, [run]);

	return { setVisibility, pauseTimer, startTimer };
};

export default useTimer;
