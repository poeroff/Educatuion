import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Image,
  PinchZoom,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isValidString } from '@maidt-cntn/util/CommonUtil';
import React, { ReactNode, useState } from 'react';

export interface IHE01802 {
  children: ReactNode;
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  info: IHE01802Info;
  answers: string[];
  correctAnswers: string[];
  isCorrect?: boolean;
  isSubmitted: boolean;
  onSubmit?: () => void;
}

export interface IHE01802Info {
  title?: string;
  content?: string;
  subTitleIndexes?: Set<number>;
  imageSrc: string;
  altText?: string;
  imageWidth?: string;
  imageHeight?: string;
  exampleAnswer?: string;
}

const HE01802 = ({ children, headerInfo, questionInfo, info, answers, correctAnswers, isCorrect, isSubmitted, onSubmit }: IHE01802) => {
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isShowPassage, setIsShowPassage] = useState(false);

  const isAnswered = answers.every((answer: string) => isValidString(answer));
  const isSubmitAvailable = isAnswered && !isSubmitted;
  const submitBtnColor = isSubmitted
    ? isShowAnswer
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.PRIMARY
    : isSubmitAvailable
    ? EStyleButtonTypes.PRIMARY
    : EStyleButtonTypes.SECONDARY;

  const handleSubmit = () => {
    if (isSubmitAvailable) {
      onSubmit?.();
    } else {
      setIsShowAnswer(!isShowAnswer);
    }
  };

  return (
    <Container
      bodyId='container'
      vAlign={'flex-start'}
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
      <Box hAlign='flex-end' vAlign='flex-start' marginBottom='8px'>
        <Button width='96px' color={EStyleButtonTypes.TERTIARY} style={{ height: '44px' }} onClick={() => setIsShowPassage(true)}>
          <CustomButtonLabel>지문 보기</CustomButtonLabel>
        </Button>
      </Box>

      <BoxWrap>
        <Box width={'30%'} hAlign={'center'} height={'342px'}>
          <PinchZoom>
            <Image
              type={EImageType.IMG}
              src={info.imageSrc}
              alt={info.altText && info.altText.length < 150 ? info.altText : ''}
              width={info.imageWidth}
              height={info.imageHeight}
            />

            {info.altText && info.altText.length >= 150 && <Box type='hidden'>{info.altText}</Box>}
          </PinchZoom>
        </Box>

        <Box marginLeft={'24px'} width={'70%'} height={'342px'} hAlign='center'>
          {children}
        </Box>
      </BoxWrap>

      <PassageDialog
        isOpen={isShowPassage}
        textTitle={info.title || ''}
        textContent={info.content || ''}
        subtitleIndexes={info.subTitleIndexes}
        onClose={() => setIsShowPassage(false)}
      />

      <BottomSheet
        bottomSheetTargetId='container'
        height={'40%'}
        show={isShowAnswer}
        closeOption={{ useYn: true, onClose: () => setIsShowAnswer(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            {correctAnswers.map((correctAnswer, index) => (
              <Typography key={index} useGap={false}>
                {correctAnswer}
              </Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export interface IDialogInfo {
  textTitle: string;
  textContent: string;
  subtitleIndexes?: Set<number>;
  isOpen: boolean;
  onClose: () => void;
}

const PassageDialog = ({ isOpen, textTitle, textContent, subtitleIndexes, onClose }: IDialogInfo) => {
  return (
    <Dialog
      tabIndex={102}
      width={893}
      height={458}
      topHeight={50}
      useHeader
      header={() => (
        <Box height='50px' marginBottom='20px' background={'var(--color-grey-100)'} vAlign='center' useRound={true}>
          <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
            {textTitle}
          </Typography>
        </Box>
      )}
      isShow={isOpen}
      onClose={onClose}
      useFooter={true}
      closeLabel={'지문 닫기'}
    >
      {textContent.split('\n').map((paragraph, index, arr) => (
        <React.Fragment key={index}>
          <Typography
            weight={!subtitleIndexes?.has(index) ? 'var(--font-weight-medium)' : 'var(--font-weight-bold)'}
            size={EStyleFontSizes.MEDIUM}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {paragraph}
          </Typography>
          <br />
          {index !== arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </Dialog>
  );
};

export default HE01802;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;
