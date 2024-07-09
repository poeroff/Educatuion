import { useState } from 'react';
import {
  Box,
  Label,
  TMainHeaderInfoTypes,
  Typography,
  IQuestionProps,
  BottomSheet,
  ETagLine,
  EStyleButtonTypes,
  Scroll,
  List,
  Radio,
  Tag,
  Button,
  EStyleSizes,
  Dialog,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';

export interface IData {
  text: string;
}

export interface IQuestion {
  questionText: string;
  questionPosition: string; //before, after, none
}

export interface IDialog {
  dialogTitle: React.ReactNode;
  dialogText: string;
}

export interface IProps {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: IData[];
  answer: number;
  solution: number;
  question: IQuestion;
  dialog: IDialog;
  isSubmitted: boolean;
  handleChange: (index: number) => void;
  submitAnswer: () => void;
}

const Template = ({ headerInfo, questionInfo, data, question, answer, solution, dialog, isSubmitted, handleChange, submitAnswer }: IProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(prev => !prev);
      return;
    }
    submitAnswer();
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (show ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={answer === 0}
      submitBtnColor={answer !== 0 ? (show ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box vAlign='center' width='775px' height='156px' hAlign={'center'} background='white' useRound useShadow tabIndex={101}>
          <Box display='flex' hAlign='center'>
            {question.questionPosition === 'before' && (
              <Box display='flex' alignItems='center'>
                <Box width='100px' height='40px' borderBottom='2px solid black' />
                <Typography>{question.questionText}</Typography>
              </Box>
            )}
            {question.questionPosition === 'after' && (
              <Box display='flex' alignItems='center'>
                <Typography>{question.questionText}</Typography>
                <Box width='100px' height='40px' borderBottom='2px solid black' />
              </Box>
            )}
            {question.questionPosition === 'none' && <Typography>{question.questionText}</Typography>}
          </Box>
        </Box>
        <Scroll height='70%' width='800px' tabIndex={0}>
          <List
            gap={4}
            data={data}
            row={({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                value={index === answer}
                onClick={() => handleChange(index)}
                isError={isSubmitted && answer !== solution}
                readOnly={isSubmitted}
                ariaLabel={index + '번 보기'}
                tabIndex={102 + index}
              >
                <Box>
                  <Label value={index} /> {value?.text}
                </Box>
              </Radio>
            )}
          />
        </Scroll>
      </Box>
      <SubmitBtn>
        <Button width='152px' color={EStyleButtonTypes.TERTIARY} size={EStyleSizes['XX-SMALL']} onClick={() => setIsDialogOpen(!isDialogOpen)}>
          지문 보기
        </Button>
      </SubmitBtn>
      <Dialog
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              {dialog.dialogTitle}
            </Typography>
          </Box>
        )}
        isShow={isDialogOpen}
        width={893}
        height={458}
        useFooter
        onClose={() => setIsDialogOpen(!isDialogOpen)}
        closeLabel='닫기'
      >
        <Typography>{dialog.dialogText}</Typography>
      </Dialog>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={show}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{answer}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export const SubmitBtn = styled.div`
  position: absolute;
  right: 4px;
  bottom: 28px;
`;

export default Template;
