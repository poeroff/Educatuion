import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import {
  Box,
  TMainHeaderInfoTypes,
  BoxWrap,
  List,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  Scroll,
  Question,
  Input,
  InputStatus,
} from '@maidt-cntn/ui';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

export interface IHE02902 {
  headerInfo: TMainHeaderInfoTypes;
  questionText?: string;
  questionInformation?: IQuestionProps;
  info: IHE02902Info;
  value: string[];
  onSubmit?: (state: boolean[]) => void;
  handleOnChange?: (index: number, value: string) => void;
  isSubmitted?: boolean;
  submitAnswer?: () => void;
}

export interface IHE02902Info {
  text: React.ReactNode;
  data: Idata[];
  answer: string[];
}
export interface Idata {
  num: string;
}

const HE02902 = ({ headerInfo, questionText, questionInformation, info, value, onSubmit, handleOnChange, isSubmitted, submitAnswer }: IHE02902) => {
  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: 'none',
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(show => !show);
    } else {
      submitAnswer && submitAnswer();
    }
  };

  const submitAnswers = value;

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInformation ? questionInformation : questionInfo}
      vAlign='flex-start'
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!value.every(isNotEmptyString)}
      submitBtnColor={value.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={() => {
        handleSubmit();
      }}
    >
      <BoxWrap useFull>
        <Box useFull useRound width='468px' lineHeight='48px' paddingRight='16px' marginRight='24px' background='white'>
          <Scroll>
            <Box padding='4px 22px 4px 12px'>{info.text}</Box>
          </Scroll>
        </Box>
        <Box margin={'auto'}>
          <List data={info.data}>
            {({ value, index = 1 }) => (
              <Box vAlign='center' display='block'>
                <Box>
                  <Question type='text' size='small'>
                    {value?.num}
                  </Question>
                </Box>
                <Input
                  width='350px'
                  key={index}
                  inputSize='x-small'
                  onChange={event => handleOnChange?.(index, event.target.value)}
                  readOnly={isSubmitted}
                  placeholder='내용을 넣어 주세요.'
                  ariaLabel={`${index}+'번 답란'`}
                  value={submitAnswers[index - 1] ?? undefined}
                  status={!isSubmitted ? InputStatus.ENABLE : InputStatus.DEFAULT}
                />
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>
            {info.answer.map((item, index) => (
              <div key={index}>
                {index === 0 ? '틀린 부분 : ' : '고친 내용 : '}
                {item}
              </div>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE02902;
