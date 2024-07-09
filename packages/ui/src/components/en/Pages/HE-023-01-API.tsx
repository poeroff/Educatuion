import { BottomSheet, Box, BoxWrap, EStyleButtonTypes, ETagLine, IQuestionProps, Tag, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { cloneElement, useState } from 'react';

export interface IContentList {
  children: React.ReactElement;
}
export interface IHE02301 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  nodeData: IContentList[];
  answer: string[];
  solution: ISolution[];
  isSubmitted: boolean;
  onSubmit: (isCorrect: boolean) => void;
}

export interface ISolution {
  num: string;
  text: string;
}

const HE02301 = ({ headerInfo, questionInfo, answer, solution, isSubmitted, onSubmit, nodeData }: IHE02301) => {
  const [isShow, setShow] = useState(false);

  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(!isShow);
      return;
    }

    const result: boolean[] = [];

    solution.forEach((sol, index) => {
      result[index] = sol.text === answer[index];
    });

    onSubmit && onSubmit(result.every(val => val === true));
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={answer.includes('')}
      submitBtnColor={
        isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : answer.includes('')
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
          {solution.map((sol, index) => {
            return (
              <Box marginTop='12px'>
                <Typography key={index}>
                  {sol.num} {sol.text}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE02301;
