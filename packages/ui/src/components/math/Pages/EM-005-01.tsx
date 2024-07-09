import { useMemo, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { BottomSheet, Box, BoxWrap, EStyleButtonTypes, ETagLine, IQuestionProps, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import ConnectorLine from '@maidt-cntn/assets/icons/connector_line.svg';
import ConnectorArrow from '@maidt-cntn/assets/icons/connector_arrow.svg';
import { isAnswer, isNotEmptyString, removeSpaces } from '@maidt-cntn/util/CommonUtil';

type TSubmitType = 'marking' | 'complete';

export interface IEM00501 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  sequenceNodes: string[];
  inputNodes: React.ReactNode[];
  answers: string[];
  solutions: string[];
  submitted: boolean;
  submitType?: TSubmitType;
  commentary?: string;
  onSubmit?: (isCorrect: boolean[]) => void;
}

const EM00501 = ({
  headerInfo,
  questionInfo,
  sequenceNodes,
  inputNodes,
  answers,
  solutions,
  submitType = 'marking',
  submitted,
  commentary,
  onSubmit,
}: IEM00501) => {
  const [isShow, setShow] = useState<boolean>(false);
  const isAllFilled = useMemo(() => answers.every(isNotEmptyString), [answers]);

  const handleSubmit = () => {
    if (submitted) {
      setShow(show => !show);
    } else {
      const result: boolean[] = answers.map((val, index) => isAnswer(removeSpaces(val), solutions[index]));
      onSubmit && onSubmit(result);
    }
  };

  const onSubmitLabel = () => {
    return submitted ? (isShow ? '답안 닫기' : '답안 보기') : submitType === 'marking' ? '채점하기' : '완료하기';
  };

  return (
    <Container
      useRound
      useExtend
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={onSubmitLabel()}
      submitDisabled={!isAllFilled}
      submitBtnColor={isAllFilled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.GRAY}
      onSubmit={() => {
        handleSubmit();
      }}
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              {sequenceNodes[0]}
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>{sequenceNodes[1]}</GrayRoundBox>
            </Box>
            <Box>{inputNodes[0]}</Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>{sequenceNodes[2]}</GrayRoundBox>
            </Box>
            <Box>{inputNodes[1]}</Box>
          </BoxWrap>
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{solutions.join(', ')}</Typography>
            </Box>
            {commentary && (
              <Box position='relative' marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='해설' />
                <Box>
                  <Typography usePre>{commentary}</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const GrayRoundBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-100);
  min-width: 120px;
  height: 52px;
  padding: 4px 12px;
  border-radius: 80px;
  margin-top: -140px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -30px;
    top: 50%;
    width: 26px;
    height: 42px;
    background: url(${`"${ConnectorLine}"`}) no-repeat;
    background-size: contain;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    right: -40px;
    top: 50%;
    width: 35px;
    height: 46px;
    background: url(${`"${ConnectorArrow}"`}) no-repeat;
    background-size: contain;
  }
`;

export default EM00501;
