import { Box, TMainHeaderInfoTypes, EStyleButtonTypes, Recorder, Typography, SimpleAudioPlayer, IQuestionProps, IAudioData } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { initDataType } from '@maidt-cntn/api';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
// import { currentPageSubmittedData } from '@/stores';
// import { useRecoilValue } from 'recoil';

interface Data {
  index: number;
  name: string;
  speech: string;
  audio: string;
  subKeyIs: string;
}

interface PageInfo {
  mainKey: number;
  pageNumber: number;
  headerText: string;
  questionText: string;
}

interface BtnColor {
  default: string[];
  press: string[];
}

interface EEL01C04A03P02 {
  data: Data[];
  pageData: PageInfo;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string | null;
    }[][];
  }[];
  btnColor: BtnColor;
  submitIs: any;
}

export const BlinkEffect = keyframes`
50% {
  opacity: 0;
}
`;

const EEL01C04A03P02 = ({ pageData, getDefaultData, getCorrectData, data, btnColor, submitIs }: EEL01C04A03P02) => {
  const [roleId, setRoles] = useState<number>(0);
  const characterBtn = [...new Set(data.map(item => item.name))];
  const [nonSelectedRoleRecord, setNonSelectedRoleRecord] = useState<Data[]>([]);
  const [nonSelectedRoleAudio, setNonSelectedRoleAudio] = useState<Data[]>([]);
  const [audioPlay, setAudioPlay] = useState<boolean[]>([]);

  const questionInfo: IQuestionProps = {
    text: pageData.questionText,
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: pageData.headerText,
    headerPattern: 'text',
  };

  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageData.pageNumber),
    collectDatas: getCorrectData(pageData.pageNumber),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: any) => {
    changeInputData(mainKey, subKey, value);
  };

  const onSelectedRole = (id: number) => {
    setRoles(id);
    const selectedRoleRecords = data.filter(item => item.index === id);
    setNonSelectedRoleRecord(selectedRoleRecords);
    // setIsRecorded(new Array(selectedRoleRecords.length).fill(false));

    const nonSelectedRoleAudio = data.filter(item => item.index !== id);
    setNonSelectedRoleAudio(nonSelectedRoleAudio);
    setAudioPlay(new Array(nonSelectedRoleAudio.length).fill(false));
  };

  const checkAudio = (): boolean => {
    if (roleId === 0 || submitIs) return false;
    else return nonSelectedRoleRecord.every(item => initialAudioData(item.subKeyIs));
  };

  const completeIs = (subkey: string): boolean => {
    return isSubmittedInput(pageData.mainKey, subkey);
  };

  const initialAudioData = (subkey: string): IAudioData | null => {
    return getValueInputData(pageData.mainKey, subkey);
  };

  const handleRecoderSubmit = (subkey: string, audioData: IAudioData) => {
    handleChangeInputData(pageData.mainKey, subkey, audioData);
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

  const allCompleteIs = (): boolean => {
    if (roleId === 0 || submitIs) return false;
    else return audioPlay.every(item => item === true);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={'완료하기'}
      submitBtnColor={
        checkAudio() && allCompleteIs() ? (submitIs ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={checkAudio() && allCompleteIs() ? false : true}
      onSubmit={() => {
        submitPageData();
      }}
    >
      <Box useFull>
        <SelectBtn>
          <Typography>나의 역할 :</Typography>
          {characterBtn.map((item, index) => {
            return (
              <button
                key={index}
                className={roleId === index + 1 ? 'press' : ''}
                style={{
                  animation: roleId !== 0 ? 'none' : '',
                  background: roleId === index + 1 ? btnColor.press[index] : btnColor.default[index],
                }}
                onClick={() => onSelectedRole(index + 1)}
              >
                {item}
              </button>
            );
          })}
        </SelectBtn>
        <AudioWraps>
          {data.map((item, index) => {
            const bgColorIs = index % 2 === 0 ? btnColor.default[0] : btnColor.default[1];
            const recorderIs = getValueInputData(pageData.mainKey, item.subKeyIs);
            const showBtnIs =
              roleId !== 0 ? (
                roleId === item.index ? (
                  <div style={{ display: submitIs ? (recorderIs !== '' ? 'block' : 'none') : 'block' }}>
                    <Recorder
                      recorderIndex={index}
                      onSubmit={audioData => handleRecoderSubmit(item.subKeyIs, audioData)}
                      initialData={initialAudioData(item.subKeyIs)}
                      readOnly={completeIs(item.subKeyIs)}
                    />
                  </div>
                ) : (
                  <div style={{ display: submitIs ? 'none' : 'block' }}>
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
                <p style={{ background: bgColorIs }}>{item.name}</p>
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

export default EEL01C04A03P02;

const SelectBtn = styled.div`
  width: 445px;
  display: flex;
  margin: 30px 0 40px 500px;

  button {
    width: 140px;
    height: 48px;
    color: var(--color-grey-900);
    font-size: 28px;
    border-radius: 8px;
    box-shadow: 0px 4px 4px 0px #00000040;
    // animation: ${BlinkEffect} 1s step-end infinite;

    &.press {
      color: #fff;
    }
    &:first-of-type {
      margin-right: 10px;
      &.press {
        color: #fff;
      }
    }
  }
`;

const TextWrap = styled.h5`
  width: 670px;
  font-size: 32px;
  color: var(--color-grey-900);
  font-weight: bold;
  height: 38px;
  line-height: 38px;
  margin-bottom: 20px;
`;
const AudioWraps = styled.div`
  width: 100%;
  height: auto;
  margin-top: 20px;
  & > div {
    display: flex;
    margin-bottom: 20px;
  }
  p {
    width: 160px;
    height: 38px;
    border-radius: 22px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
  }
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
