import { useMemo, useState } from 'react';
import {
  Box,
  IQuestionProps,
  List,
  TMainHeaderInfoTypes,
  Typography,
  Tag,
  ETagLine,
  BottomSheet,
  EStyleButtonTypes,
  BoxWrap,
  SvgIcon,
  ESvgType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import bubbleTail from '../../../assets/icons/bubble_tail.svg';
import figure1 from '../../../assets/icons/figure_1.svg';
import figure10 from '../../../assets/icons/figure_10.svg';
import figure100 from '../../../assets/icons/figure_100.svg';

type TSubmitType = 'marking' | 'complete';
export interface IBoxData {
  count: number;
  ariaLabel: string;
}
export interface IEM00801 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  inputNodes: React.ReactNode[];
  tooltip?: React.ReactNode;
  topFigureNode?: React.ReactNode;
  figureData: IBoxData[];
  inputs: { [key: string]: string };
  answer: { [key: string]: string };
  submitType?: TSubmitType;
  commentary?: string;
  submitted: boolean;
  onSubmit?: (state: boolean[]) => void;
}

export const getImg = (ariaLabel: string) => {
  switch (ariaLabel) {
    case '백 모형':
      return figure100;
    case '십 모형':
      return figure10;
    case '일 모형':
      return figure1;
  }
};

const EM00801 = ({
  headerInfo,
  questionInfo,
  inputNodes,
  tooltip,
  topFigureNode,
  figureData,
  inputs,
  answer,
  submitType = 'marking',
  commentary,
  submitted,
  onSubmit,
}: IEM00801) => {
  const isDisabled = useMemo(() => Object.keys(inputs).some(key => !inputs[key]), [inputs]);
  const [isShow, setShow] = useState<boolean>(false);

  const isCorrectAnswer = (input: string, answer: string) => {
    return input === answer;
  };

  const handleSubmit = () => {
    if (submitted) {
      setShow(show => !show);
    } else {
      const result = Object.keys(inputs).map(key => isCorrectAnswer(inputs[key], answer[key]));
      onSubmit && onSubmit(result);
    }
  };

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={submitted ? (isShow ? '답안 닫기' : '답안 보기') : submitType === 'marking' ? '채점하기' : '완료하기'}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={() => {
        handleSubmit();
      }}
      vAlign={'flex-start'}
      useRound
      useExtend
    >
      {topFigureNode}
      {topFigureNode && (
        <Box margin='10px 0 7px 0' hAlign='center'>
          <SvgIcon src={bubbleTail} width='100%' height='45px' />
        </Box>
      )}
      <Box vAlign='center' flexDirection='column'>
        <Box marginBottom='24px' width='680px' display='grid' gridTemplateColumns='1fr 1fr 1fr' rowGap='8px' columnGap='24px'>
          {figureData.map((item, index) => (
            <Box key={index} type='line' useFull hAlign='center' borderRadius='16px' minHeight='116px' padding='8px 0'>
              <ImgBox role='img' aria-label={item.ariaLabel + item.count + '개'} ariaLabel={item.ariaLabel}>
                {[...Array(item.count)].map((__, index) => (
                  <Box display='flex'>
                    <SvgIcon
                      type={ESvgType.IMG}
                      zIndex={item.ariaLabel === '백 모형' ? item.count - index : 0}
                      src={getImg(item.ariaLabel)}
                      alt=''
                      ariaHidden
                      size='100%'
                    />
                  </Box>
                ))}
              </ImgBox>
            </Box>
          ))}
        </Box>
        <Box hAlign='center'>
          <List data={inputNodes} align='horizontal'>
            <BoxWrap boxGap={0}>{inputNodes.map(node => node)}</BoxWrap>
          </List>
        </Box>
        {tooltip && <Box>{tooltip}</Box>}
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={submitType === 'marking' ? '답안' : '모범답안'} />
          </Box>
          <Box marginTop='12px'>
            {Object.keys(answer)
              .map(key => answer[key])
              .join(', ')}
          </Box>
          {commentary && (
            <Box marginTop={'40px'}>
              <Box>
                <Tag type={ETagLine.GREEN} label={'풀이'} />
              </Box>
              <Box marginTop='12px'>
                <Typography usePre>{commentary}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export const ImgBox = styled.div<{ ariaLabel: string }>`
  ${({ ariaLabel }) => {
    switch (ariaLabel) {
      case '백 모형':
        return css`
          > div + div {
            margin-top: -23px;
          }
        `;
      case '십 모형':
        return css`
          > div + div {
            margin-top: 4px;
          }
        `;
      case '일 모형':
        return css`
          display: grid;
          grid-template-columns: repeat(5, 16px);
          gap: 4px;
        `;
    }
  }}
`;

export default EM00801;
