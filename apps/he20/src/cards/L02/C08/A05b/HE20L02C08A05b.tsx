import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Image,
  PinchZoom,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  TextView,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import { ReactNode } from 'react';
interface IHE10L04C05A04Template {
  questionBox: ReactNode;
  hint: string;
  handleSubmit: () => void;
  submitted: boolean;
  isShowAnswer: boolean;
  solution: string;
  value?: string;
}

const HE10L04C05A04Template = ({ questionBox, hint, handleSubmit, submitted, solution, value, isShowAnswer }: IHE10L04C05A04Template) => {
  const isCorrect = isAnswer(value ?? '', solution);
  const mark: TMarkType = submitted ? (isCorrect ? 'correct' : 'incorrect') : 'none';

  const containerId = `HE2-L02-C08-A05`;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2 :  Practice',
  };
  const questionInfo: IQuestionProps = {
    text: 'Choose the grammatically correct words.',
    mark,
  };
  const submitLabel = submitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기';
  const submitButtonColor = submitted
    ? isShowAnswer
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.PRIMARY
    : value
    ? EStyleButtonTypes.PRIMARY
    : EStyleButtonTypes.SECONDARY;
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      bodyId={containerId}
      onSubmit={handleSubmit}
      submitDisabled={!submitted && !value}
      submitLabel={submitLabel}
      submitBtnColor={submitButtonColor}
    >
      <BoxWrap flexDirection='column' gap={20}>
        <TextView title='보기'>
          <Box margin={'28px'} height={'auto'}>
            <PinchZoom>
              <Image
                src={'/L02/C08/A05/HE2-L02-C08-A05-P01.jpg'}
                width={'100%'}
                alt='They set up a device
which required two individuals to pull both ends of a rope at the same time.'
              />
            </PinchZoom>
            <Box type='hidden'>
              <p></p>
              <p>이미지에는 문장이 퍼즐 조각처럼 나뉘어져 있다:</p>
              <p>첫 번째 조각: "Critics suggest"는 "suggest"가 빨간색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.</p>
              <p>두 번째 조각: "that"는 검은색으로 표시되어 있다.</p>
              <p>
                세 번째 조각: "a marketing strategy create value for both companies and customers."는 "create"가 파란색으로 강조되어 있으며 나머지는
                검은색으로 표시되어 있다.
              </p>
              <p>위쪽에는 "(should)"라는 단어가 회색으로 추가되어 있다.</p>
            </Box>
          </Box>
        </TextView>
        {questionBox}
        <Box padding='4px 12px 10px' backgroundColor={'var(--color-blue-50)'}>
          <Typography color={'var(--color-blue-800)'} size={EStyleFontSizes['X-MEDIUM']}>
            {hint}
          </Typography>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId={containerId} height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} usePre>
              {solution}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE10L04C05A04Template;
