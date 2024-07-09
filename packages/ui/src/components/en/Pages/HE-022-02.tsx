import { Box, TMainHeaderInfoTypes, TextView, Image, IQuestionProps, Tag, ETagLine, BottomSheet, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useMemo, useState } from 'react';
import { isAnswer, removeSpaces } from '@maidt-cntn/util/CommonUtil';

export interface IContentList {
  children: React.ReactNode;
}

type TSubmitType = 'marking' | 'complete';
interface IHE02202 {
  headerInfo: TMainHeaderInfoTypes;
  questionText: string;
  imageSrc: string;
  udl?: string[];
  nodeData: IContentList[];
  inputs: { [key: string]: string };
  answer: { [key: string]: string };
  submitType?: TSubmitType;
  onSubmit?: (state: boolean[]) => void;
}

const HE02202 = ({ headerInfo, questionText, imageSrc, udl, nodeData, inputs, answer, submitType = 'marking', onSubmit }: IHE02202) => {
  const [mark, setMark] = useState<IQuestionProps['mark']>('none');
  const [isShow, setShow] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const isDisabled = useMemo(() => Object.keys(inputs).some(key => !inputs[key]), [inputs]);

  const questionInfo: IQuestionProps = {
    text: questionText,
    size: 'medium',
    mark: mark,
  };

  const areArraysEqualIgnoringCaseAndWhitespace = (value: { [key: string]: string }, answer: { [key: string]: string }): boolean => {
    // 배열의 모든 요소가 동일한지 확인 (공백 제거 및 대소문자 무시)
    const inputKeys = Object.keys(value);
    const answerKeys = Object.keys(answer);
    if (inputKeys.length !== answerKeys.length) {
      return false;
    }
    return inputKeys.every(key => isAnswer(removeSpaces(value[key]), removeSpaces(answer[key])));
  };
  const handleSubmit = () => {
    if (submitted) {
      setShow(show => !show);
    } else {
      if (submitType === 'marking') {
        if (!areArraysEqualIgnoringCaseAndWhitespace(inputs, answer)) {
          setMark('incorrect');
        } else {
          setMark('correct');
        }
      }
      const result = Object.keys(inputs).map(key => !isAnswer(removeSpaces(inputs[key]), removeSpaces(answer[key])));
      onSubmit && onSubmit(result);
    }
  };
  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={submitted ? (isShow ? '답안 닫기' : '답안 보기') : submitType === 'marking' ? '채점하기' : '완료하기'}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={() => {
        setSubmitted(true);
        handleSubmit();
      }}
    >
      <Box>
        <Box>
          <TextView title='보기'>
            <Box marginTop={'8px'}>
              <Image src={imageSrc} width={'100%'} alt={''} ariaDescribedby='img_desc' />
              {udl && (
                <Box type='hidden' id='img_desc'>
                  {udl.map((item, index) => (
                    <p key={`img_desc_${index}`}>{item}</p>
                  ))}
                </Box>
              )}
            </Box>
          </TextView>
        </Box>
        <Box marginTop='20px'>
          {nodeData.map((item, index) => {
            return <Box key={index}>{item?.children}</Box>;
          })}
        </Box>
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
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default HE02202;
