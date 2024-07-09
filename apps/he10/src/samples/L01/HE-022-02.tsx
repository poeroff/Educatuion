import { ChangeEventHandler, useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Input,
  Typography,
  Image,
  SvgIcon,
  BoxWrap,
  ESvgType,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  EStyleFontSizes,
  Tag,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

const HE02202 = () => {
  const [isShow, setShow] = useState(false);
  const [mark, setMark] = useState<IQuestionProps['mark']>('none');
  const [inputValue, setInputValue] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Practice',
  };
  const questionInfo: IQuestionProps = {
    text: 'Find and correct grammatical errors in the underlined parts.',
    mark: mark,
  };
  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setInputValue(event.target.value);
  };

  const handleOnSubmit = () => {
    if (mark !== 'none') {
      setShow(show => !show);
    } else {
      const isCorrect =
        isAnswer(inputValue, 'which offers good service and delicious food') || isAnswer(inputValue, 'that offers good service and delicious food');
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleOnSubmit}
      submitLabel={mark !== 'none' ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isNotEmptyString(inputValue)}
      submitBtnColor={isNotEmptyString(inputValue) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <BoxWrap useFull flexDirection='column' paddingTop='20px'>
        <Box width='888px'>
          <TextView title='보기' height='106px'>
            <Image
              src='/L01/C08/A03/HE1-L01-C08-A03.jpg'
              width='636px'
              alt='They set up a device which required two individuals to pull both ends of a rope at the same time. 빨간 색자 which가 이끄는 절이 which 앞의 파란 색자 a device를 수식하는 모습을 나타낸다.'
            />
          </TextView>
        </Box>
        <Box useFull marginTop='30px'>
          <Box vAlign='center' marginBottom='10px'>
            <Typography>1. Do you know a restaurant</Typography>
            <CustomUnderline>who offers good service and delicious food</CustomUnderline>
          </Box>
          <Box vAlign='center'>
            <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} />
            <Typography>Do you know a restaurant</Typography>
            <Input
              width='auto'
              minWidth='460px'
              textAlign='start'
              placeholder='내용을 넣어 주세요.'
              ariaLabel='답을 입력하세요.'
              value={inputValue}
              onChange={handleInputOnChange}
              maxLength={50}
              readOnly={mark !== 'none'}
              status={mark === 'incorrect' ? 'error' : mark === 'none' ? 'enable' : mark}
            />
            <Typography>?</Typography>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='10px'>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
              which offers good service and delicious food / that offers good service and delicious food
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE02202;

const CustomUnderline = styled.span`
  position: relative;
  display: inline-flex;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -5px; /* 밑줄의 위치 조정 */
    height: 2px; /* 밑줄의 굵기 */
    background-color: black; /* 밑줄의 색상 */
  }
`;
