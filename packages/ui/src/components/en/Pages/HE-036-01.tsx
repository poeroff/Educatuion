import {
  Box,
  TMainHeaderInfoTypes,
  BoxWrap,
  Input,
  PinchZoom,
  List,
  SvgIcon,
  EImageType,
  Image,
  Question,
  IAudioPlayerProps,
  IQuestionProps,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import arrow_right from '@/assets/icon/arrow_right.svg';
import styled from '@emotion/styled';
import { ChangeEvent, EventHandler, useEffect, useState } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

export interface IImageView {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

export interface IHE03601 {
  headerInfo: TMainHeaderInfoTypes;
  audioInfo?: IAudioPlayerProps;
  questionText: string;
  imageInfo?: IImageView;
  contentsText?: string; // 개행 : <br/>
  errors: string[];
  corrections: string[];
  answerText?: string; // 개행 : <br/>
  showSubmitButton?: boolean;
}

const HE03601 = ({
  headerInfo,
  audioInfo,
  questionText,
  imageInfo,
  contentsText,
  errors,
  corrections,
  answerText,
  showSubmitButton = true,
}: IHE03601) => {
  const [inputErrors, setInputErrors] = useState<string[]>(new Array(errors.length).fill(''));
  const [inputCorrections, setInputCorrections] = useState<string[]>(new Array(corrections.length).fill(''));
  const [isShow, setShow] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const data = Array.from({ length: errors.length }, (_, i) => ({ num: `(${i + 1})` }));
  const questionInfo: IQuestionProps = {
    text: questionText,
  };

  const handleInputErrors = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setInputErrors(prev => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleInputCorrections = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setInputCorrections(prev => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleSubmit = () => {
    if (submitted) {
      setShow(!isShow);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <Container
      vAlign='flex-start'
      useExtend
      bodyId='targetContainer'
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel={submitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={() => {
        showSubmitButton && handleSubmit();
      }}
      submitDisabled={!(inputErrors.every(isNotEmptyString) && inputCorrections.every(isNotEmptyString))}
      submitBtnColor={
        inputErrors.every(isNotEmptyString) && inputCorrections.every(isNotEmptyString)
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      {imageInfo && (
        <BoxWrap useFull height='239px' width='970px'>
          <Box useFull hAlign='center'>
            <PinchZoom pinchType={'image'}>
              <Image type={EImageType.IMG} src={imageInfo.src} alt={imageInfo.alt} width={imageInfo.width} height={imageInfo.height} />
            </PinchZoom>
          </Box>
        </BoxWrap>
      )}

      {contentsText && (
        <Box alignContent='center'>
          <Box width='910px' padding='20px' background='white' useRound>
            {contentsText.split('<br/>').map(value => (
              <Box marginTop='12px'>{value}</Box>
            ))}
          </Box>
        </Box>
      )}

      <BoxWrap useFull height='fit-content'>
        <Box useFull>
          <Box hAlign='center' useFull width='447px'>
            <Typography>errors</Typography>
          </Box>
        </Box>
        <Box useFull>
          <Box hAlign='center' useFull width='447px'>
            <Typography>corrections</Typography>
          </Box>
        </Box>
      </BoxWrap>
      <Box vAlign='center' marginTop='9px'>
        <List data={data}>
          {({ value, index }) => (
            <Box vAlign='center'>
              <Box width={70}>
                <Question type='text' size='small'>
                  {value?.num}
                </Question>
              </Box>
              <ItemWrap>
                <Input
                  ariaLabel={index + '번 답란'}
                  value={index ? inputErrors[index - 1] : ''}
                  readOnly={submitted}
                  width='410px'
                  placeholder='내용을 넣어 주세요.'
                  onChange={e => {
                    index && handleInputErrors(e, index - 1);
                  }}
                />
                <SvgIcon src={arrow_right} size='38px' />
                <Input
                  ariaLabel={index + '번 답란'}
                  value={index ? inputCorrections[index - 1] : ''}
                  readOnly={submitted}
                  width='410px'
                  placeholder='내용을 넣어 주세요.'
                  onChange={e => {
                    index && handleInputCorrections(e, index - 1);
                  }}
                />
              </ItemWrap>
            </Box>
          )}
        </List>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          {answerText
            ? answerText.split('<br/>').map(value => <Box marginTop='12px'>{value}</Box>)
            : errors.map((value, index) => (
                <Box marginTop='12px'>
                  ({index + 1}) {value}, {corrections[index]}
                </Box>
              ))}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE03601;

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0px;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;
