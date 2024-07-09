// Page: EE4-L01-C02-A04-P04

import { ChangeEvent, useEffect, useState } from 'react';

import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import {
  Box,
  BoxWrap,
  Dialog,
  EStyleButtonTypes,
  EStyleFontSizes,
  IAudioData,
  IQuestionProps,
  List,
  ListHeader,
  NameTag,
  Recorder,
  SimpleAudioPlayer,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { initDataType } from '@maidt-cntn/api';
import styled from 'styled-components';

interface RadioGroupProps {
  name: string;
  width?: string;
  direction?: 'row' | 'column';
  data: { text: string; value: number | string; color: string }[];
  selectValue: string | null | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export type IAudioState = IAudioData & {
  currntType: string | null;
  isListen: boolean;
  audioData: IAudioData | null;
};

export type IListenAndAnswer = {
  question: string;
  mainKey: number;
  currntType?: string | null;
  subKey: string;
  type: string;
  character: string;
  color: string;
  audio: string;
  isListen: boolean;
  audioData: IAudioData | null;
};

export type PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  pageNumber: number;
  mainKey: number[];
  subKey: string[];
  getCorrectData: (index: number) => any;
  getDefaultData: (index: number) => initDataType;
  data: IListenAndAnswer[];
  groupData: {
    text: string;
    value: string;
    color: string;
  }[];
};

const Component = (pageInfo: PageProps) => {
  const { headerInfo, questionInfo, pageNumber, mainKey, subKey, getCorrectData, getDefaultData, data, groupData } = pageInfo;
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [listData, setListData] = useState<IListenAndAnswer[]>(data);
  const [isShow, setShow] = useState(false);

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageNumber),
    collectDatas: getCorrectData(pageNumber),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: IAudioState) => {
    changeInputData(mainKey, subKey, value);
  };

  const recorderData = listData.map((item, index) => {
    const _data = getValueInputData(mainKey[index], subKey[index]);
    return { ...item, ..._data };
  });

  const isSubmitted = isSubmittedInput(0, 'RECORDER-01');

  const currntType = isSubmitted ? recorderData[0].currntType : null;
  const recorderFilter = recorderData.filter(item => selectValue === item?.type);
  const listenFilter = recorderData.filter(item => selectValue !== item?.type);

  const allRecordersSubmitted =
    recorderFilter.length > 0 &&
    recorderFilter.every(element => typeof element.audioData === 'object' && element.audioData !== null && !Array.isArray(element.audioData));

  const allListenSubmitted = listenFilter.length > 0 && listenFilter.every(element => element.isListen);

  const onHandler = (idx: number, list: IListenAndAnswer[], currntType: string | null, isListen: boolean, audioData: IAudioData | null) => {
    const _list = list?.map((data, index) => (index === idx ? { ...data, isListen, audioData } : data));
    setListData(_list);
    handleChangeInputData(mainKey[idx], subKey[idx], { currntType, isListen, audioData });
  };

  const handelModal = () => {
    setShow(!isShow);
  };

  const completeQnA = () => {
    setShow(false);
    gradeSubmitPageData();
  };

  const onRadioHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectValue(e.target.value);
  };

  useEffect(() => {
    if (currntType) {
      console.log(currntType);
      setSelectValue(currntType);
    }
  }, [currntType]);

  console.log(recorderData);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={allRecordersSubmitted && allListenSubmitted ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      submitDisabled={!(allRecordersSubmitted && allListenSubmitted)}
      onSubmit={handelModal}
      vAlign='flex-start'
    >
      <ListHeader align='flex-end'>
        <Typography size={EStyleFontSizes.MEDIUM}>나의 역할 :</Typography>
        <Box>
          <RadioList name='radio-group' data={groupData} selectValue={selectValue} onChange={onRadioHandler} />
        </Box>
      </ListHeader>

      <Box marginTop='40px'>
        <List data={recorderData}>
          {({ value, index = 1 }) => (
            <BoxWrap alignItems='center'>
              <Box width='105px' flexShrink='0'>
                <NameTag
                  label={value?.character}
                  style={{
                    minWidth: '38px',
                    height: '38px',
                    background: `${value?.color}`,
                    fontWeight: '500',
                    fontSize: '24px',
                  }}
                />
              </Box>
              <Box position='relative' width='100%'>
                <Typography weight='bold' size={EStyleFontSizes.LARGE} useGap={false}>
                  {value?.question}
                </Typography>
              </Box>
              {currntType ? (
                <Box>
                  {currntType === value?.type ? (
                    <Box display='flex' gap='5px' marginLeft='auto'>
                      {selectValue === currntType && (
                        <Recorder
                          recorderIndex={index}
                          initialData={value.audioData}
                          onSubmit={audioData => onHandler(index - 1, listData, selectValue, value.isListen, audioData)}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box display='flex' gap='5px' marginLeft='auto'>
                      {selectValue === currntType && value?.audio && (
                        <SimpleAudioPlayer
                          audioSrc={value?.audio}
                          onChangeStatus={state => onHandler(index - 1, listData, selectValue, state, value?.audioData)}
                        />
                      )}
                    </Box>
                  )}
                </Box>
              ) : (
                <Box>
                  {selectValue && (
                    <Box>
                      {selectValue === value?.type ? (
                        <Box display='flex' gap='5px' marginLeft='auto'>
                          <Recorder
                            recorderIndex={index}
                            initialData={value.audioData}
                            onSubmit={audioData => onHandler(index - 1, listData, selectValue, value.isListen, audioData)}
                          />
                        </Box>
                      ) : (
                        <Box display='flex' gap='5px' marginLeft='auto'>
                          {value?.audio && (
                            <SimpleAudioPlayer
                              audioSrc={value?.audio}
                              onChangeStatus={state => onHandler(index - 1, listData, selectValue, state, value?.audioData)}
                            />
                          )}
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              )}

              {/* {selectValue && (
                <Box>
                  {selectValue === value?.type ? (
                    <Box display='flex' gap='5px' marginLeft='auto'>
                      <Recorder
                        recorderIndex={index}
                        initialData={value.audioData}
                        onSubmit={audioData => onHandler(index - 1, listData, selectValue, value.isListen, audioData)}
                      />
                    </Box>
                  ) : (
                    <Box display='flex' gap='5px' marginLeft='auto'>
                      {value?.audio && (
                        <SimpleAudioPlayer
                          audioSrc={value?.audio}
                          onChangeStatus={state => onHandler(index - 1, listData, selectValue, state, value?.audioData)}
                        />
                      )}
                    </Box>
                  )}
                </Box>
              )} */}
            </BoxWrap>
          )}
        </List>
      </Box>
      <Dialog
        width={400}
        height={200}
        useFooter
        isShow={isShow && allRecordersSubmitted && allListenSubmitted}
        closeLabel='아니오'
        confirmLabel='예'
        onClose={handelModal}
        onConfirm={completeQnA}
      >
        <Typography>완료하시겠습니까?</Typography>
      </Dialog>
    </Container>
  );
};

// RadioList custom
const RadioList: React.FC<RadioGroupProps> = ({ name, width, direction = 'row', selectValue, data, onChange }) => {
  return (
    <RadioWrap>
      <RadioGroup direction={direction}>
        {data.map(({ text, value, color }, index) => {
          return selectValue ? (
            <LI key={index}>
              <Radio
                type='radio'
                name={name}
                value={value}
                id={`radio-${index}`}
                checked={selectValue === String(index + 1)}
                color={color}
                onChange={onChange}
              />
              <Label htmlFor={`radio-${index}`} width={width}>
                {text}
              </Label>
            </LI>
          ) : (
            <LI key={index}>
              <Radio type='radio' name={name} value={value} id={`radio-${index}`} color={color} onChange={onChange} />
              <Label htmlFor={`radio-${index}`} width={width}>
                {text}
              </Label>
            </LI>
          );
        })}
      </RadioGroup>
    </RadioWrap>
  );
};

// RadioList Styles
const RadioWrap = styled.div``;
const RadioGroup = styled.ul<{ direction: string }>`
  display: flex;
  gap: 0 10px;
  align-items: center;
  flex-direction: ${({ direction }) => direction};
`;
const LI = styled.li``;

const Radio = styled.input<{ color?: string }>`
  & {
    display: none;
  }

  &:disabled + label {
    opacity: 0.5;
  }

  ${({ color }) => {
    return color === 'blue'
      ? `
          & + label {
              color: var(--color-grey-900);
              background: #E2F2FF;
          }

          &:checked + label {
              color: #fff;
              background: #275CE7;
          }
      `
      : color === 'yellow'
      ? `
          & + label {
              color: var(--color-grey-900);
              background: #FFF0CC;
          }
          &:checked + label {
              color: #fff;
              background: #996500;
          }
      `
      : color === 'pink'
      ? `
          & + label {
              color: var(--color-grey-900);
              background: #FFECF1;
          }
          &:checked + label {
              color: #fff;
              background: #E71C2C;
          }
      `
      : color === 'green'
      ? `
          & + label {
              color: var(--color-grey-900);
              background: #E5F4EA;
          },
          &:checked + label {
              color: #fff;
              background: #007637;
          },
      `
      : color === 'purple'
      ? `
              & + label {
                  color: var(--color-grey-900);
                  background: #F6EEFF;
              },
              &:checked + label {
                  color: #fff;
                  background: #800EFD;
              },
          `
      : ``;
  }}
  &:checked + label {
  }
`;

const Label = styled.label<{ width?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 42px;
  font-size: 28px;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0px 1px 3px 0px #00000033, 0px 2px 1px 0px #0000001f, 0px 1px 1px 0px #00000024;

  ${({ width }) => {
    if (width) {
      return `width: ${width}`;
    }
  }}
`;

export default Component;
