import styled from '@emotion/styled';
import { BottomSheet, Box, ConnectLine, EStyleButtonTypes, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import React, { useEffect, useState } from 'react';

export interface IEM03501 {
  info?: IEM03501Info;
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  questionNode?: React.ReactNode;
  solutionNode?: React.ReactNode;
  answers: (number | string)[];
  solutions?: (number | string)[];
  isAnswered?: boolean;
  isCorrect?: boolean;
  isSubmitted: boolean;
  onChange: (subKey: number, index: number, value: (number | string)[]) => void;
  onSubmit?: () => void;
}

export interface IEM03501Info {
  subKey?: number;
  lines?: {
    left: string[];
    right: string[];
  };
  direction?: 'vertical' | 'horizontal';
}

interface IConnectEventProps {
  from: {
    sideId: string;
    itemId: string;
  };
  to: {
    sideId: string;
    itemId: string;
  };
}

const EM03501 = ({
  info,
  headerInfo,
  questionInfo,
  questionNode,
  solutionNode,
  answers,
  solutions,
  isAnswered,
  isSubmitted,
  isCorrect,
  onChange,
  onSubmit,
}: IEM03501) => {
  const [lines, setLines] = useState<IConnectEventProps[]>([]);
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const subKey = info?.subKey ?? 1;
  const isSubmitAvailable = isAnswered && !isSubmitted;
  const submitBtnColor = isSubmitted
    ? isShowAnswer
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : isSubmitAvailable
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;

  const updateLines = () => {
    const validAnswers = answers.filter(answer => answer !== '');
    const newLines = validAnswers.map((rightIndex, leftIndex) => ({
      from: {
        sideId: 'left',
        itemId: `left-${leftIndex}`,
      },
      to: {
        sideId: 'right',
        itemId: `right-${rightIndex}`,
      },
    }));

    setLines(newLines);
  };

  const getLineIsError = (type: 'left' | 'right', index: number) => {
    const leftIndex = type === 'left' ? index : answers.indexOf(index);
    const answerIndex = answers?.[leftIndex];
    const solutionIndex = solutions?.[leftIndex];

    return isSubmitted && answerIndex !== solutionIndex;
  };

  const handleChange = (type: 'connect' | 'disconnect', props: IConnectEventProps) => {
    const { from, to } = props;

    const leftId = from.sideId === 'left' ? from.itemId : to.itemId;
    const rightId = from.sideId === 'right' ? from.itemId : to.itemId;
    const leftIndex = Number(leftId.split('-')[1]);
    const rightIndex = type === 'connect' ? Number(rightId.split('-')[1]) : '';

    const newAnswer = answers.map((answer, index) => (index === leftIndex ? rightIndex : answer));

    onChange(subKey, leftIndex, newAnswer);
  };

  const handleSubmit = () => {
    if (isSubmitAvailable) {
      onSubmit?.();
    } else {
      setIsShowAnswer(!isShowAnswer);
    }
  };

  useEffect(updateLines, [answers]);

  return (
    <Container
      useRound
      bodyId='container'
      vAlign={'flex-start'}
      background={'var(--color-white)'}
      headerInfo={headerInfo}
      questionInfo={{
        mark: isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none',
        ...questionInfo,
      }}
      submitBtnColor={submitBtnColor}
      submitLabel={!isSubmitted ? '채점하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={!isSubmitted && !isSubmitAvailable}
      onSubmit={handleSubmit}
    >
      {questionNode}

      <Box useFull minHeight='100%'>
        {info?.lines && (
          <ConnectLine
            useFull
            useItemFull
            connectLines={lines}
            disabled={isSubmitted}
            direction={info?.direction}
            onConnect={props => handleChange('connect', props)}
            onDisConnect={props => handleChange('disconnect', props)}
          >
            <ConnectLineSide sideId='left'>
              {info?.lines?.left.map((line, index) => (
                <ConnectLineItem key={index} itemId={`left-${index}`} content={line} isError={getLineIsError('left', index)} />
              ))}
            </ConnectLineSide>

            <ConnectLineSide sideId='right' bgColor='var(--color-grey-50)'>
              {info?.lines?.right.map((line, index) => (
                <ConnectLineItem key={index} itemId={`right-${index}`} content={line} isError={getLineIsError('right', index)} />
              ))}
            </ConnectLineSide>
          </ConnectLine>
        )}
      </Box>

      <BottomSheet
        bottomSheetTargetId='container'
        height={'auto'}
        show={isShowAnswer}
        closeOption={{ useYn: true, onClose: () => setIsShowAnswer(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          {solutionNode}
        </Box>
      </BottomSheet>
    </Container>
  );
};

const ConnectLineSide = styled(ConnectLine.Side)``;

const ConnectLineItem = styled(ConnectLine.Item)``;

export default EM03501;
