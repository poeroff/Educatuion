import { useState } from 'react';
import { IQuestionProps, BoxWrap, Box, Typography, TMainHeaderInfoTypes, BottomSheet, Tag, ETagLine, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';

type TSubmitType = 'marking' | 'complete';

export interface IEM04903 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  tableNode: React.ReactNode;
  radioNode: React.ReactNode;
  answer: number;
  signs?: string[];
  solutions: { [key: string]: number }[];
  submitted: boolean;
  submitType?: TSubmitType;
  commentary?: string;
  onSubmit?: () => void;
}

const EM04903 = ({
  headerInfo,
  questionInfo,
  tableNode,
  radioNode,
  answer,
  signs,
  solutions,
  submitted,
  submitType = 'marking',
  commentary,
  onSubmit,
}: IEM04903) => {
  const [isShow, setShow] = useState<boolean>(false);

  const handleSubmit = () => {
    if (submitted) {
      setShow(show => !show);
    } else {
      onSubmit && onSubmit();
    }
  };

  return (
    <Container
      useRound
      useExtend
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={submitted ? (isShow ? '답안 닫기' : '답안 보기') : submitType === 'marking' ? '채점하기' : '완료하기'}
      submitBtnColor={answer === 0 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      submitDisabled={answer === 0}
      onSubmit={() => {
        handleSubmit();
      }}
      vAlign='flex-start'
    >
      <BoxWrap position='relative' justifyContent='center' marginTop={10}>
        {tableNode}
      </BoxWrap>

      <Box marginTop={24} textAlign='center'>
        {radioNode}
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={submitType === 'marking' ? '답안' : '모범답안'} />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>
              {solutions.map((solution, index) => {
                const values = Object.values(solution);
                return (
                  <Typography useGap={false} key={index}>
                    {values.map((value, i) => (
                      <Typography useGap={false} key={i}>
                        {value}
                        {signs && i < values.length - 1 && `${signs[i] || ''}`}
                      </Typography>
                    ))}
                    <Typography key={index}>{index < solutions.length - 1 && ' 또는 '}</Typography>
                  </Typography>
                );
              })}
            </Typography>
          </Box>
          {commentary && (
            <Box marginTop='40px'>
              <Box>
                <Tag type={ETagLine.GREEN} label={'풀이'} />
              </Box>
              <Box marginTop='22px'>
                <Typography usePre>
                  <MathExpression equation={commentary} />
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default EM04903;
