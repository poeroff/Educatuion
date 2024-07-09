import headphoneSVG from '@maidt-cntn/assets/icons/recorder/headphone.svg';
import microphoneSVG from '@maidt-cntn/assets/icons/recorder/microphone.svg';
import simpleMicrophoneSVG from '@maidt-cntn/assets/icons/recorder/simpleMicrophone.svg';
import stopSVG from '@maidt-cntn/assets/icons/recorder/stop.svg';
import microphoneWhiteSVG from '@maidt-cntn/assets/icons/recorder/microphone_white.svg';
import resetSVG from '@maidt-cntn/assets/icons/recorder/reset.svg';
import waitSVG from '@maidt-cntn/assets/icons/recorder/wait.svg';
import simpleWaitSVG from '@maidt-cntn/assets/icons/recorder/simpleWait.svg';

export type TRecordButton = 'start' | 'listen' | 'simpleListen' | 'speak' | 'stop' | 'wait' | 'simpleWait' | 'myAnswer' | 'reset';

export const RecordButtonIconMap = {
  start: microphoneWhiteSVG,
  listen: headphoneSVG,
  simpleListen: simpleMicrophoneSVG,
  speak: microphoneSVG,
  stop: stopSVG,
  wait: waitSVG,
  simpleWait: simpleWaitSVG,
  myAnswer: '',
  reset: resetSVG,
};

export const RecordButtonLabelMap = {
  start: '시작하기',
  listen: '듣기',
  simpleListen: '',
  speak: '말하기',
  stop: '그만하기',
  wait: '잠시 멈춤',
  simpleWait: '',
  myAnswer: '내 대답 보기',
  reset: '초기화',
};
