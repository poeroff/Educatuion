import { BottomSheet, Box, BoxWrap, EStyleButtonTypes, ETagLine, IQuestionProps, Tag, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { cloneElement, useMemo, useState } from 'react';

export interface IContentList {
  children: React.ReactElement;
}
export interface IHE02901 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  nodeData: IContentList[];
  answer: number;
  solution: ISolution;
  isSubmitted: boolean;
  onSubmit: (isCorrect: boolean) => void;
}

export interface ISolution {
  correctAnswer: number;
  explanation?: React.ReactNode;
  translation?: React.ReactNode;
}

const HE02901 = ({ headerInfo, questionInfo, answer, solution, isSubmitted, onSubmit, nodeData }: IHE02901) => {
  const [isShow, setShow] = useState(false);
  const isDisabled = useMemo(() => answer === -1, [answer]);

  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(!isShow);
      return;
    }
    const result = solution.correctAnswer === answer;
    onSubmit && onSubmit(result);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={isDisabled}
      submitBtnColor={
        isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : answer === -1
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={() => {
        handleSubmit();
      }}
    >
      <BoxWrap display={'flex'} flexDirection={'row'} useFull marginTop={'20px'}>
        {nodeData.map((item, index) => {
          return cloneElement(item?.children, { key: index });
        })}
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{solution.correctAnswer}</Typography>
          </Box>
          {solution.explanation && (
            <>
              <Box marginTop={'40px'}>
                <Tag type={ETagLine.GREEN} label='문제해설' />
              </Box>
              <Box marginTop='12px'>{solution.explanation}</Box>
            </>
          )}
          {solution.translation && (
            <>
              <Box marginTop={'40px'}>
                <Tag type={ETagLine.GREEN} label='해석' />
              </Box>
              <Box marginTop='12px'>{solution.translation}</Box>
            </>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE02901;
