import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  ETagLine,
  IQuestionProps,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Textarea,
  TextareaStatus,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isAnswer, isNotEmptyString, removeSpaces } from '@maidt-cntn/util/CommonUtil';
import { ChangeEvent, useMemo, useRef, useState } from 'react';
type TSubmitType = 'marking' | 'complete';

type TAnswerLabelType = '모범답안' | '예시답안';
interface IHE01703 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  submitType?: TSubmitType;
  content: React.ReactNode;
  inputs: { [key: string]: string };
  onInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  answer?: { [key: string]: string };
  isSubmitted?: boolean;
  onSubmit?: (state: boolean[]) => void;
  answerLabel?: TAnswerLabelType;
  inputHeight?: string;
  customLeftDiv?: React.ReactNode;
}
const HE01703 = ({
  headerInfo,
  questionInfo,
  content,
  inputs,
  onInputChange,
  answer,
  submitType = 'complete',
  isSubmitted,
  onSubmit,
  answerLabel = '모범답안',
  inputHeight = '100%',
  customLeftDiv,
}: IHE01703) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isPassageShow, setPassageShow] = useState<boolean>(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const isDisabled = useMemo(() => Object.keys(inputs).some(key => !inputs[key]), [inputs]);
  const status = useMemo(
    () => Object.keys(inputs).map(key => (isNotEmptyString(inputs[key]) ? TextareaStatus.ENABLE : TextareaStatus.DEFAULT)),
    [inputs],
  );

  const openModal = () => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setPassageShow(true);
  };

  const closeModal = () => {
    setPassageShow(false);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setIsShow(prevState => !prevState);
      return;
    } else {
      const result = Object.keys(inputs).map(key => (answer ? !isAnswer(removeSpaces(inputs[key]), removeSpaces(answer[key])) : false));
      onSubmit && onSubmit(result);
    }
  };

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted && answer ? (isShow ? '답안 닫기' : '답안 보기') : submitType === 'marking' ? '채점하기' : '완료하기'}
      submitBtnColor={
        !isSubmitted
          ? isDisabled
            ? EStyleButtonTypes.SECONDARY
            : EStyleButtonTypes.PRIMARY
          : answer
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={answer ? isDisabled : isDisabled || isSubmitted}
      onSubmit={handleSubmit}
      vAlign='flex-start'
    >
      <BoxWrap useFull>
        {customLeftDiv ? (
          customLeftDiv
        ) : (
          <Box useFull marginRight='24px' hAlign='center'>
            <Textarea
              name={'value1'}
              width='100%'
              height={inputHeight}
              readOnly={isSubmitted}
              placeholder='내용을 넣어 주세요.'
              ariaLabel={'답란'}
              value={inputs?.value1}
              onChange={onInputChange}
              status={status[0]}
              tabIndex={102}
            />
          </Box>
        )}
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isPassageShow ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={closeModal}
                  tabIndex={104}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'}>{content}</Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={openModal} tabIndex={103} />
            </Box>
          )}
        </Box>
      </BoxWrap>
      {answer && (
        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px'>
            <Box>
              <Tag type={ETagLine.GREEN} label={submitType === 'marking' ? '답안' : answerLabel} />
            </Box>
            <Box marginTop='12px'>
              {Object.keys(answer)
                .map(key => answer[key])
                .join(', ')}
            </Box>
          </Box>
        </BottomSheet>
      )}
    </Container>
  );
};

export default HE01703;
