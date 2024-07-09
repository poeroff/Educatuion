import audioState from "@/stores/audioStore";
import { useRecoilValue } from "recoil";

export const useAudio = (id?: string) => {
	const currentTime = useRecoilValue<number>(audioState);

	const setAudioTime = (time: number) => {
		if (id) {
			const audio = document.getElementById(id);
			if (audio) (audio as HTMLAudioElement).currentTime = time;
		}
	};
	return { currentTime, setAudioTime };
};

export default useAudio;
