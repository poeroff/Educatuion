import { BottomSheet, Box, BoxWrap, EStyleButtonTypes, ETagLine, IQuestionProps, Tag, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import React from 'react';
import { useMemo, useState } from 'react';

interface IHE03701SP {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  word?: string;
  wordNode?: React.ReactNode[];
  blankWordNode?: React.ReactNode[];
  underLineWordNode?: React.ReactNode[];
  choices?: string[];
  answers: string;
  nodes: React.ReactNode[];
  submitted: boolean;
  solution: string | string[];
  onSubmit?: (isCorrect: boolean) => void;
}

const HE03701SP = ({ headerInfo, questionInfo, word, wordNode, answers, nodes, submitted, solution, onSubmit }: IHE03701SP) => {
  const [isShow, setShow] = useState<boolean>(false);

  const handleSubmit = () => {
    if (submitted) {
      setShow(show => !show);
    } else {
      onSubmit && onSubmit(isAnswer(answers, solution));
    }
  };

  const isSubmitDisabled = useMemo(() => {
    if (submitted) return false;
    if (isNotEmptyString(answers)) return false;
    else return true;
  }, [answers, submitted]);

  const submitBtnColor: EStyleButtonTypes = useMemo(() => {
    if (isSubmitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (isShow) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  }, [isSubmitDisabled, isShow]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={isShow ? '답안 닫기' : submitted ? '답안 보기' : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={isSubmitDisabled}
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px' width={920}>
        {word && (
          <Box vAlign='center' width='685px' height='156px' hAlign={'center'} background='white' useRound useShadow>
            <Typography fontSize='var(--font-size-36)' weight='var(--font-weight-bold)'>
              {word}
            </Typography>
          </Box>
        )}
        {wordNode && (
          <Box vAlign='center' padding='48px 30px' hAlign={'center'} background='white' borderRadius={24} useShadow>
            <Box hAlign='center'>{wordNode}</Box>
          </Box>
        )}
        <BoxWrap>{nodes}</BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            {Array.isArray(solution) ? (
              solution.map((item, index) => (
                <React.Fragment key={index}>
                  <Typography>{item}</Typography>
                  {index < solution.length - 1 && (
                    <React.Fragment>
                      <br />
                      <Typography>또는 </Typography>
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))
            ) : (
              <Typography>{solution}</Typography>
            )}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE03701SP;
