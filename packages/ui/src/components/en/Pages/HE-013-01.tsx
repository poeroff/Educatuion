import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React, { useMemo, useState } from 'react';

const AnswerTagBox = React.memo(({ marginTop = 20, label, children }: { marginTop?: number; label: string; children: React.ReactNode }) => (
  <>
    <Box marginTop={marginTop}>
      <Tag type={ETagLine.GREEN} label={label} />
    </Box>
    <Box marginTop='10px'>
      <Typography size={EStyleFontSizes.MEDIUM} usePre>
        {children}
      </Typography>
    </Box>
  </>
));

export interface IHE01301 {
  headerText?: string;
  questionText?: React.ReactNode;
  audioInfo?: IAudioPlayerProps;
  question: string;
  underlineText: string;
  choices: string[];
  answer: number;
  explanation?: React.ReactNode;
  script?: React.ReactNode;
  translation?: React.ReactNode;
}

const HE01301 = ({
  headerText = 'Word Preview',
  questionText = 'Choose the correct meaning of the underlined part.',
  audioInfo,
  question,
  choices,
  answer,
  underlineText,
  explanation,
  script,
  translation,
}: IHE01301) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [viewAnswer, setViewAnswer] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = useMemo(
    () => ({
      headerText: headerText,
      headerPattern: 'text',
    }),
    [],
  );

  const questionInfo: IQuestionProps = useMemo(
    () => ({
      text: questionText,
      markSize: 'middle',
      mark: viewAnswer ? (selectedIndex === answer - 1 ? 'correct' : 'incorrect') : 'none',
    }),
    [viewAnswer, selectedIndex],
  );

  const data = choices.map(text => ({ text }));

  const handleSubmitClick = () => {
    if (!viewAnswer) setViewAnswer(true);
    else {
      setIsModalOpen(!isModalOpen);
    }
  };

  const handleRowClick = (index: number) => {
    if (!viewAnswer) setSelectedIndex(index);
  };

  const parts = question.split(underlineText);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={viewAnswer ? (isModalOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={selectedIndex == null}
      submitBtnColor={selectedIndex != null ? (isModalOpen ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmitClick}
    >
      <Box useFull hAlign='center' padding='20px 0px' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px' background='white' useRound>
            {parts[0]}{' '}
            {underlineText === '__' ? (
              <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>
            ) : (
              <Typography
                useGap={false}
                textDecoration={'underline'}
                style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}
                weight={'var(--font-weight-bold)'}
              >
                {underlineText}
              </Typography>
            )}{' '}
            {parts[1]}
          </Box>

          <Scroll height='70%' width='910px' tabIndex={0}>
            <List gap={4} data={data}>
              {({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index - 1 === selectedIndex}
                  onClick={() => handleRowClick(index - 1)}
                  readOnly={viewAnswer}
                  isError={viewAnswer && selectedIndex !== answer - 1}
                >
                  <Box vAlign='center'>
                    <Label value={index} marginRight={8} />
                    {value?.text}
                  </Box>
                </Radio>
              )}
            </List>
          </Scroll>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isModalOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <AnswerTagBox marginTop={0} label='답안'>
            {answer}
          </AnswerTagBox>
          {explanation && <AnswerTagBox label='해설'>{explanation}</AnswerTagBox>}
          {script && <AnswerTagBox label='스크립트'>{script}</AnswerTagBox>}
          {translation && <AnswerTagBox label='해석'>{translation}</AnswerTagBox>}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE01301;
