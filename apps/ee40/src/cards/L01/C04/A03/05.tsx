import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, SimpleAudioPlayer, IQuestionProps, EStyleButtonTypes, Typography, Recorder, IAudioData } from '@maidt-cntn/ui';
import styled from 'styled-components';
import { useState } from 'react';
import { currentPageSubmittedData } from '@/stores';
import { useRecoilValue } from 'recoil';
import { getDefaultData, getCorrectData } from './pageData';
import useCurrentPageData from '@/hooks/useCurrentPageData';

interface Data {
  index: number;
  name: string;
  speech: string;
  audio: string;
  subKeyIs: string;
}

const ButtonColorIs = { default: ['#E2F2FF', '#FFF0CC', '#FFECF1', '#E5F4EA'], press: ['#275CE7 ', '#996500', '#E71C2C', '#007637'] };

const EE40L01C04A03P05 = () => {
  const [roleId, setRoles] = useState<number>(0);
  const isSubmit = useRecoilValue(currentPageSubmittedData);
  const [nonSelectedRoleRecord, setNonSelectedRoleRecord] = useState<Data[]>([]);
  const [nonSelectedRoleAudio, setNonSelectedRoleAudio] = useState<Data[]>([]);
  const [audioPlay, setAudioPlay] = useState<boolean[]>([]);

  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(5),
    collectDatas: getCorrectData(5),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: any) => {
    changeInputData(mainKey, subKey, value);
  };

  const speechList = [
    {
      index: 1,
      name: '도로시',
      speech: 'Ouch! Help me, please.',
      audio: '/L01/C04/A03/EE4-L01-C04-A03-P05-01.mp3',
      subKeyIs: 'RECORDER-0',
    },
    { index: 2, name: '허수아비', speech: 'Okay.', audio: '/L01/C04/A03/EE4-L01-C04-A03-P05-02.mp3', subKeyIs: 'RECORDER-1' },
    { index: 3, name: '사자', speech: 'I can help you.', audio: '/L01/C04/A03/EE4-L01-C04-A03-P05-03.mp3', subKeyIs: 'RECORDER-2' },
    { index: 1, name: '도로시', speech: 'Thank you, everyone!', audio: '/L01/C04/A03/EE4-L01-C04-A03-P05-04.mp3', subKeyIs: 'RECORDER-3' },
    { index: 4, name: '양철나무꾼', speech: 'I’m so happy.', audio: '/L01/C04/A03/EE4-L01-C04-A03-P05-05.mp3', subKeyIs: 'RECORDER-4' },
  ];

  /* Container Info */
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Act Out',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '첫 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  };

  const handleRecoderSubmit = (subkey: string, audioData: IAudioData) => {
    handleChangeInputData(5, subkey, audioData);
  };

  const checkAudioEnded = (idx: number) => {
    setAudioPlay(prevState => {
      const newState = [...prevState];
      if (idx >= 0 && idx < newState.length) {
        newState[idx] = true;
      }
      return newState;
    });
  };

  const checkAudioDataNotNull = (): boolean => {
    if (roleId === 0 || isSubmit) return false;
    else {
      return nonSelectedRoleRecord.every(item => initialAudioData(item.subKeyIs));
    }
  };

  const initialAudioData = (subkey: string): IAudioData | null => {
    return getValueInputData(5, subkey);
  };

  const onSelectedRole = (id: number) => {
    setRoles(id);
    const selectedRoleRecords = speechList.filter(item => item.index === id);
    setNonSelectedRoleRecord(selectedRoleRecords);

    const nonSelectedRoleAudio = speechList.filter(item => item.index !== id);
    setNonSelectedRoleAudio(nonSelectedRoleAudio);
    setAudioPlay(new Array(nonSelectedRoleAudio.length).fill(false));
  };

  const allCompleteIs = (): boolean => {
    if (roleId === 0 || isSubmit) return false;
    else {
      return audioPlay.every(item => item === true);
    }
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={'완료하기'}
      submitBtnColor={
        checkAudioDataNotNull() && allCompleteIs() ? (isSubmit ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={checkAudioDataNotNull() && allCompleteIs() ? false : true}
      onSubmit={() => submitPageData()}
    >
      <Box useFull>
        <SelectBtn>
          <Typography>나의 역할 :</Typography>
          <button className={roleId === 1 ? 'press' : ''} onClick={() => onSelectedRole(1)}>
            도로시
          </button>
          <button className={roleId === 2 ? 'press' : ''} onClick={() => onSelectedRole(2)}>
            허수아비
          </button>
          <button className={roleId === 3 ? 'press' : ''} onClick={() => onSelectedRole(3)}>
            사자
          </button>
          <button className={roleId === 4 ? 'press' : ''} onClick={() => onSelectedRole(4)}>
            양철 나무꾼
          </button>
        </SelectBtn>
        <AudioWraps>
          {speechList.map((item, index) => {
            const recorderIs = getValueInputData(5, item.subKeyIs); // bolb잇는거
            const showBtnIs =
              roleId !== 0 ? (
                roleId === item.index ? (
                  <div style={{ display: isSubmit ? (recorderIs !== '' ? 'block' : 'none') : 'block' }}>
                    <Recorder
                      recorderIndex={index}
                      onSubmit={audioData => handleRecoderSubmit(item.subKeyIs, audioData)}
                      initialData={initialAudioData(item.subKeyIs)}
                      readOnly={isSubmittedInput(5, item.subKeyIs)}
                    />
                  </div>
                ) : (
                  <div style={{ display: isSubmit ? 'none' : 'block' }}>
                    <SimpleAudioPlayer
                      audioSrc={item.audio}
                      onEnded={() => {
                        const nonSelectedIdx = nonSelectedRoleAudio.findIndex(audio => audio.audio === item.audio);
                        checkAudioEnded(nonSelectedIdx);
                      }}
                    />
                  </div>
                )
              ) : (
                ''
              );
            return (
              <div key={index}>
                <p>{item.name}</p>
                <TextWrap>{item.speech}</TextWrap>
                <BtnWraps>{showBtnIs}</BtnWraps>
              </div>
            );
          })}
        </AudioWraps>
      </Box>
    </Container>
  );
};

export default EE40L01C04A03P05;

const SelectBtn = styled.div`
  width: 100%;
  display: flex;

  button {
    width: 174px;
    height: 48px;
    color: var(--color-grey-900);
    font-size: 28px;
    border-radius: 8px;
    box-shadow: 0px 4px 4px 0px #00000040;
    margin-right: 10px;

    &.press {
      background: ${ButtonColorIs.press[1]} !important;
      color: #fff;
    }
    &:nth-of-type(1) {
      background: ${ButtonColorIs.default[0]};
      &.press {
        background: ${ButtonColorIs.press[0]} !important;
        color: #fff;
      }
    }
    &:nth-of-type(2) {
      background: ${ButtonColorIs.default[1]};
      &.press {
        background: ${ButtonColorIs.press[1]} !important;
        color: #fff;
      }
    }
    &:nth-of-type(3) {
      background: ${ButtonColorIs.default[2]};
      &.press {
        background: ${ButtonColorIs.press[2]} !important;
        color: #fff;
      }
    }
    &:nth-of-type(4) {
      background: ${ButtonColorIs.default[3]};
      &.press {
        background: ${ButtonColorIs.press[3]} !important;
        color: #fff;
      }
    }
    background: ${ButtonColorIs.default[1]};
  }
`;

export const AudioWraps = styled.div`
  width: 100%;
  height: auto;
  margin-top: 20px;
  & > div {
    display: flex;
    margin-bottom: 15px;
    &:nth-of-type(1),
    &:nth-of-type(4) {
      p {
        background: ${ButtonColorIs.default[0]} !important;
      }
    }
    &:nth-of-type(5) {
      p {
        background: ${ButtonColorIs.default[3]} !important;
      }
    }
    &:nth-of-type(3) {
      p {
        background: ${ButtonColorIs.default[2]} !important;
      }
    }
  }
  p {
    width: 150px;
    height: 38px;
    border-radius: 22px;
    margin-right: 10px;
    background: ${ButtonColorIs.default[1]};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
  }
`;

const TextWrap = styled.h5`
  width: 670px;
  font-size: 32px;
  color: var(--color-grey-900);
  font-weight: bold;
  height: 38px;
  line-height: 38px;
  margin-bottom: 15px;
`;
const BtnWraps = styled.div`
  width: 120px;
  display: flex;
  justify-content: end;
  button {
    div {
      margin: 0;
    }
  }
`;
