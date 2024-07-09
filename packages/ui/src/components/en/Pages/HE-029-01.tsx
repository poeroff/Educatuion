import {
  BoxWrap,
  Box,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  List,
  Label,
  Radio,
  EStyleButtonTypes,
  IQuestionProps,
  BottomSheet,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useState } from 'react';

export interface IHE02901 {
  headerInfo: TMainHeaderInfoTypes;
  questionText: string;
  info: IHE02901Info;
}

export interface IHE02901Info {
  text: React.ReactNode;
  data: Idata[];
  answer: string;
}

export interface Idata {
  text: string;
}

const HE02901 = ({ headerInfo, questionText, info }: IHE02901) => {
  const [isShow, setShow] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const checkAnswer = () => {
    setIsSubmitted(true);
    setIsCorrect(selectedIdx === Number(info.answer ?? 0) - 1);
  };

  return (
    <Container
      bodyId='targetContainer'
      useExtend={true}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={selectedIdx === -1}
      submitBtnColor={
        isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : selectedIdx === -1
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={() => {
        isSubmitted ? (isShow ? setShow(false) : setShow(true)) : checkAnswer();
      }}
    >
      <BoxWrap useFull>
        <Box useFull background='white' line-height='48px' useRound paddingRight='10px' marginRight='20px'>
          <Scroll>{info.text}</Scroll>
        </Box>
        <Box useFull>
          <List gap={10} data={info.data}>
            {({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                value={index - 1 === selectedIdx}
                isError={isSubmitted && !isCorrect}
                onClick={() => setSelectedIdx(index - 1)}
                disabled={isSubmitted}
              >
                <BoxWrap alignItems='baseline'>
                  <Label value={index} />
                  <Typography>{value?.text}</Typography>
                </BoxWrap>
              </Radio>
            )}
          </List>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>{info.answer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE02901;
