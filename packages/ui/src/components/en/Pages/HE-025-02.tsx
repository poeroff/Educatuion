import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  BoxWrap,
  Typography,
  List,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  IAudioPlayerProps,
} from '@maidt-cntn/ui';
import { isNotEmptyString, isAnswer } from '@maidt-cntn/util/CommonUtil';

export interface IHE02502 {
  headerInfo: TMainHeaderInfoTypes;
  audioInfo?: IAudioPlayerProps;
  questionInfoProps?: IQuestionProps;
  questionText?: string;
  wordArr: string[];
  boxNode: React.ReactNode;
  textViewNode: React.ReactNode;
  textViewHeight?: string;
  value: string[];
  answer: string[];
  answerText?: string;
  boxWidth?: string;
  isSubmitted?: boolean;
  onSubmit?: (state: boolean[]) => void;
  showBoxNode?: boolean;
  showSubmitButton?: boolean;
}
export interface ITextView {
  title: string;
  text: string;
  color: string;
  height?: string;
}

const HE02502 = ({
  headerInfo,
  audioInfo,
  questionInfoProps,
  questionText,
  wordArr,
  boxNode,
  value,
  answer,
  answerText, // 개행 : <br/>
  onSubmit,
  isSubmitted,
  boxWidth,
  textViewNode,
  textViewHeight,
  showBoxNode = true,
  showSubmitButton = true,
}: IHE02502) => {
  const [isShow, setShow] = useState(false);
  const [mark, setMark] = useState<IQuestionProps['mark']>('none');
  const result = value.map((val, index) => !isAnswer(val, answer[index]));

  const questionInfo: IQuestionProps = {
    text: questionText,
    size: 'medium',
    mark: mark,
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(show => !show);
      return;
    }
    onSubmit && onSubmit(result);
  };

  const handleClick = () => {
    if (showSubmitButton) {
      handleSubmit();
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfoProps ? questionInfoProps : questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!value.every(isNotEmptyString)}
      submitBtnColor={value.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={showSubmitButton ? () => handleClick() : undefined}
    >
      <BoxWrap height='calc(100% - 107px)'>
        <Box hAlign='center' useFull width={boxWidth}>
          {textViewNode}
        </Box>
        <Box display='flex' flexDirection='column' justifyContent='center' gap='12px' useFull>
          {boxNode}
        </Box>
      </BoxWrap>
      {showBoxNode && (
        <Box marginTop='12px'>
          <TextView title='보기' height={textViewHeight || '100%'}>
            <List align='horizontal' data={wordArr} row={({ value }) => <Typography>{value}</Typography>} />
          </TextView>
        </Box>
      )}

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          {answerText ? answerText.split('<br/>').map(value => <Box marginTop='12px'>{value}</Box>) : <Box marginTop='12px'>{answer.join(', ')}</Box>}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE02502;
