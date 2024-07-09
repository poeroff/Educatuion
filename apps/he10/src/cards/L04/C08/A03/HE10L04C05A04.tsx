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
  keyword: string;
  handleSubmit: () => void;
  submitted: boolean;
  isShowAnswer: boolean;
  solution: string;
  value?: string;
}

const HE10L04C05A04Template = ({ questionBox, keyword, handleSubmit, submitted, value, solution, isShowAnswer }: IHE10L04C05A04Template) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 1 :  Practice',
  };
  const isCorrect = isAnswer(value ?? '', solution);

  const mark: TMarkType = submitted ? (isCorrect ? 'correct' : 'incorrect') : 'none';
  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks with the correct forms of the given words.',
    mark,
    markSize: 'middle',
  };

  const bodyId = 'H10-L04-C08-A03-P01';

  const submitLabel = submitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기';
  const submitButtonColor = submitted
    ? isShowAnswer
      ? EStyleButtonTypes.DEFAULT
      : EStyleButtonTypes.PRIMARY
    : value
    ? EStyleButtonTypes.PRIMARY
    : EStyleButtonTypes.SECONDARY;

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      bodyId={bodyId}
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
                src={'/L04/C08/A03/HE1-L04-C08-A03-P01.jpg'}
                width={'639px'}
                alt='They set up a device
which required two individuals to pull both ends of a rope at the same time.'
              />
            </PinchZoom>
            <Box type='hidden'>
              <p>{`이 이미지는 퍼즐 조각 모양으로 나뉜 텍스트를 보여준다. 각 조각은 다음과 같은 문장을 구성한다:`}</p>
              <p>{`첫 번째 조각: "The sentiment is shared by many,"`}</p>
              <p>{`두 번째 조각: "with" (빨간색 글씨로 작성됨)`}</p>
              <p>{`세 번째 조각: "coffee shops"`}</p>
              <p>{`네 번째 조각: "springing" (파란색 글씨로 작성됨)`}</p>
              <p>{`다섯 번째 조각: "up on every street corner."`}</p>
              <p>{`이 조각들이 합쳐져서 "The sentiment is shared by many, with coffee shops springing up on every street corner."라는 문장이 된다.`}</p>
            </Box>
          </Box>
        </TextView>
        {questionBox}
        <Box padding='4px 12px 10px' backgroundColor={'var(--color-blue-50)'}>
          <Typography color={'var(--color-blue-800)'} size={EStyleFontSizes['X-MEDIUM']}>
            제시어 : {keyword}
          </Typography>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId={bodyId} height='40%' show={isShowAnswer}>
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
