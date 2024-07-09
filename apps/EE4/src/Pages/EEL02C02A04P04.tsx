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
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface BoxInfo {
  width: string;
}

export type IListenAndAnswer = {
  question: string;
  mainKey: number;
  subKey: string;
  type: string;
  character: string;
  color: string;
  audio: string;
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
  BoxInfo: BoxInfo;
};

const Component = (pageInfo: PageProps) => {
  const { headerInfo, questionInfo, pageNumber, mainKey, subKey, getCorrectData, getDefaultData, data, groupData, BoxInfo } = pageInfo;
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [listData, setListData] = useState<IListenAndAnswer[]>([]);
  const [isShow, setShow] = useState(false);

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageNumber),
    collectDatas: getCorrectData(pageNumber),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: IAudioData) => {
    changeInputData(mainKey, subKey, value);
  };

  const _data = data
    .map((item, index) => ({ ...item, audioData: getValueInputData(mainKey[index], subKey[index]) || null }))
    .filter(item => selectValue === item?.type);

  const allRecordersSubmitted =
    _data.length > 0 &&
    _data.every(element => typeof element.audioData === 'object' && element.audioData !== null && !Array.isArray(element.audioData));

  const onHandler = (idx: number, list: IListenAndAnswer[], audioData: IAudioData) => {
    const _list = list?.map((data, index) => (index === idx ? { ...data, audioData } : data));
    setListData(_list);
    handleChangeInputData(mainKey[idx], subKey[idx], audioData);
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
    setListData(data);
  }, [allRecordersSubmitted]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={allRecordersSubmitted ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      submitDisabled={!allRecordersSubmitted}
      onSubmit={handelModal}
      vAlign='flex-start'
    >
      <ListHeader align='flex-end'>
        <Typography size={EStyleFontSizes.MEDIUM}>나의 역할 :</Typography>
        <Box>
          <RadioList name='radio-group' data={groupData} onChange={onRadioHandler} />
        </Box>
      </ListHeader>

      <Box marginTop='40px'>
        <List data={listData}>
          {({ value, index = 1 }) => (
            <BoxWrap alignItems='center'>
              {/* <Box width='105px'  flexShrink='0'> */}
              <Box width={BoxInfo.width} flexShrink='0'>
                <NameTag
                  label={value?.character}
                  style={{
                    display: 'inline-block',
                    minWidth: '54px',
                    height: '38px',
                    textAlign: 'center',
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
              {selectValue && (
                <Box>
                  {selectValue === value?.type ? (
                    <Box display='flex' gap='5px' marginLeft='auto'>
                      <Recorder recorderIndex={index} onSubmit={audioData => onHandler(index - 1, listData, audioData)} />
                    </Box>
                  ) : (
                    <Box display='flex' gap='5px' marginLeft='auto'>
                      {value?.audio && <SimpleAudioPlayer audioSrc={value?.audio} />}
                    </Box>
                  )}
                </Box>
              )}
            </BoxWrap>
          )}
        </List>
      </Box>
      <Dialog
        width={400}
        height={200}
        useFooter
        isShow={isShow && allRecordersSubmitted !== null}
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
const RadioList: React.FC<RadioGroupProps> = ({ name, width, direction = 'row', data, onChange }) => {
  return (
    <RadioWrap>
      <RadioGroup direction={direction}>
        {data.map(({ text, value, color }, index) => {
          return (
            <LI>
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
