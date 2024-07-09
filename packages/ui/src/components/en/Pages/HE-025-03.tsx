import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  BoxWrap,
  Input,
  Dialog,
  Typography,
  List,
  Image,
  Scroll,
  Question,
  Label,
  EStyleFontSizes,
  IQuestionProps,
  EStyleButtonTypes,
  Tag,
  ETagLine,
  BottomSheet,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { TextBoard } from '@maidt-cntn/ui/en';
import { isAnswer, isNotEmptyString, removeSpaces } from '@maidt-cntn/util/CommonUtil';

export interface IContentList {
  imgSrc: string;
  imgAlt: string;
  children: React.ReactNode;
}
export interface IArticleProps {
  titleColor: string;
  titleText: string;
  text: string;
}
export interface IScrollQuestionProps {
  questionTitle: string;
  questionSubTitle: string;
  questionSubTitleColor: string;
  questionData: IContentList[];
}

interface IHE02503 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfoProps?: IQuestionProps;
  questionText?: string;
  articleInfo: IArticleProps;
  scrollQuestionInfo: IScrollQuestionProps;
  wordArr: string[];
  value: string[];
  answer: string[];
  textViewHeight?: string;
  onSubmit?: (state: boolean[]) => void;
  isSubmitted?: boolean;
}

const HE02503 = ({
  headerInfo,
  questionInfoProps,
  questionText,
  articleInfo,
  scrollQuestionInfo,
  wordArr,
  value,
  answer,
  textViewHeight,
  onSubmit,
  isSubmitted = false,
}: IHE02503) => {
  const [mark, setMark] = useState<IQuestionProps['mark']>('none');
  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    text: questionText,
    size: 'medium',
    mark: mark,
  };
  const areArraysEqualIgnoringCaseAndWhitespace = (value: string[], answer: string[]): boolean => {
    // 배열의 길이가 다르면 false 반환
    if (value.length !== answer.length) {
      return false;
    }

    // 배열의 모든 요소가 동일한지 확인 (공백 제거 및 대소문자 무시)
    return value.every((val, index) => isAnswer(removeSpaces(val), removeSpaces(answer[index])));
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(show => !show);
    } else {
      if (!areArraysEqualIgnoringCaseAndWhitespace(value, answer)) {
        setMark('incorrect');
      } else {
        setMark('correct');
      }
      const result = value.map((val, index) => !isAnswer(removeSpaces(val), removeSpaces(answer[index])));
      onSubmit && onSubmit(result);
    }
  };

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfoProps ? questionInfoProps : questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!value.every(isNotEmptyString)}
      submitBtnColor={value.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={() => {
        handleSubmit();
      }}
    >
      <BoxWrap height='calc(100% - 107px)'>
        {/*Article Start*/}
        <Box hAlign='center'>
          <TextBoard color={articleInfo.titleColor ?? 'var(--color-blue-300)'} width='330px'>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM} weight={700}>
                {articleInfo.titleText}
              </Typography>
            </Box>
            <Box>
              <Scroll height='185px'>
                <Typography>{articleInfo.text}</Typography>
              </Scroll>
            </Box>
          </TextBoard>
        </Box>
        {/*Article End*/}
        <Box useFull>
          <Scroll>
            <Box hAlign='center'>
              <Typography weight={700}>{scrollQuestionInfo.questionTitle}</Typography>
            </Box>
            <Box hAlign='center'>
              <Question type={'dot'} size='small'>
                <Typography color={scrollQuestionInfo.questionSubTitleColor} weight={700}>
                  {scrollQuestionInfo.questionSubTitle}
                </Typography>
              </Question>
            </Box>
            <Box>
              <List gap={12} data={scrollQuestionInfo.questionData}>
                {({ value, index }) => {
                  return (
                    <Box display='flex'>
                      <Label value={index} />
                      <Box>
                        <Image src={value!.imgSrc} alt={value!.imgAlt} width={'230px'} />
                      </Box>
                      <Box>{value!.children}</Box>
                    </Box>
                  );
                }}
              </List>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
      <Box marginTop='12px'>
        <TextView title='보기' height={textViewHeight || '100%'}>
          <List align='horizontal' data={wordArr} row={({ value }) => <Typography>{value}</Typography>} />
        </TextView>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{answer.join(', ')}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE02503;
