import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Input,
  Typography,
  Image,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  InputStatus,
  BoxWrap,
  PinchZoom,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

interface IHE1L02C08A05Props {
  answer: string;
  givenWord: string;
  text1: string;
  text2: string;
  userInput: string;
  isSubmitted: boolean;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
}

const HE1L02C08A05a = ({ answer, givenWord, text1, text2, userInput, isSubmitted, onInputChange, onSubmit }: IHE1L02C08A05Props) => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2 : Practice',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <Typography>
        Complete the sentences using{' '}
        <Typography useGap={false} fontStyle='italic'>
          as if
        </Typography>{' '}
        with the correct forms of the given words.
      </Typography>
    ),
  };

  const handleOnSubmit = () => {
    if (isSubmitted) {
      setShow(show => !show);
      return;
    } else {
      onSubmit();
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={handleOnSubmit}
      submitDisabled={!isNotEmptyString(userInput)}
      submitBtnColor={isNotEmptyString(userInput) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <Box>
        <Box width='920px'>
          <TextView title='보기' height='120px'>
            <PinchZoom>
              <Image src={'/L02/C08/A05/HE1-L02-C08-A05-P01.jpg'} width='900px' alt='' />
              <Box type='hidden' id='img_desc'>
                <p> 이미지에는 문장이 퍼즐 조각처럼 나뉘어져 있다:</p>
                <p>첫 번째 조각: "I felt"</p>
                <p>두 번째 조각: "as if people from the past were looking over the shoulders of the old men."</p>
                <p>문장 아래에 회색 글씨로 추가 설명이 있다: "(→ In fact, they were not looking.)"</p>
              </Box>
            </PinchZoom>
          </TextView>
        </Box>
      </Box>

      <BoxWrap display='flex' flexDirection='column' justifyContent='center' marginTop='40px'>
        <Box width='960px' height='88px'>
          <Typography usePre>{text1}</Typography>
          <Input
            width='220px'
            value={userInput}
            placeholder='내용을 넣어주세요.'
            onChange={e => onInputChange(e.target.value)}
            inputSize='x-small'
            maxLength={2000}
            readOnly={isSubmitted}
            status={isNotEmptyString(userInput) ? InputStatus.ENABLE : InputStatus.DEFAULT}
            ariaLabel={`답란`}
          />
          <Typography usePre>{text2}</Typography>
        </Box>

        <Box marginTop='20px' backgroundColor='var(--color-blue-50)' width='920px' height='48px' vAlign='start' useRound>
          <Typography color='var(--color-blue-800)'>제시어: {givenWord}</Typography>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>{answer}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE1L02C08A05a;
