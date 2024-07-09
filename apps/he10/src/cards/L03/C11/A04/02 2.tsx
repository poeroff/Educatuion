import {
  BoxWrap,
  TMainHeaderInfoTypes,
  Box,
  Textarea,
  Scroll,
  IQuestionProps,
  Typography,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';

const P02 = () => {
  const [inputContent, setInputContent] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitDisabled, setSubmitDisabled] = useState<boolean>(() => isSubmitted || !isNotEmptyString(inputContent));
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };

  const questionInfo: IQuestionProps = {
    text: '2. Rewrite the underlined sentence, starting with "rarely."',
  };

  const answer = 'Rarely do people want to put up with a lot of noise'; // 모범 답안

  useEffect(() => {
    if (!isSubmitted) {
      setSubmitDisabled(!isNotEmptyString(inputContent));
    }
  }, [inputContent, isSubmitted]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(event.target.value);
  };

  const handleSubmit = () => {
    if (!isSubmitted) {
      setIsSubmitted(true);
    } else {
      setShow(!isShow);
    }
  };

  const getSubmitBtnColor = () => {
    if (!isSubmitted) {
      return isSubmitDisabled ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return !isShow ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.GRAY;
    }
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '완료하기'}
      submitDisabled={isSubmitDisabled}
      submitBtnColor={getSubmitBtnColor()}
      onSubmit={handleSubmit}
    >
      <BoxWrap useFull>
        <Box useFull background='white' useRound>
          <Scroll height='100%'>
            <Typography useGap={false}>
              Which is the better environment for studying: a noisy place or a quiet place?{' '}
              <Typography
                useGap={false}
                weight='var(--font-weight-bold)'
                textDecoration={'underline'}
                style={{ display: 'inline', textUnderlinePosition: 'under' }}
              >
                People rarely want to put up with a lot of noise
              </Typography>{' '}
              because it can be unpleasant and distracting. Fortunately, scientists have invented noise-cancelling technology, which is now being used
              across various fields to reduce unwanted noise. ( a ) What is the scientific principle behind this achievement? ( b ) Sound is produced
              through vibrations that occur from a sound source, when the strings of a guitar are played, for instance. ( c ) The vibrations of the
              sound source cause the air to vibrate and the sound to travel as waves, similar to the ripples created in a lake when you throw a stone.{' '}
              ( d ) When these sound waves reach our ears, the brain interprets them as sound. Just as different ripples in water might overlap if you
              throw two stones, sound waves can also interfere with each other when they meet.
            </Typography>
          </Scroll>
        </Box>
        <Box useFull>
          <Textarea
            value={inputContent}
            onChange={handleInputChange}
            width='100%'
            height='100%'
            rows={9}
            placeholder='내용을 넣어 주세요.'
            readOnly={isSubmitted}
            ariaLabel='답을 입력하세요'
          />
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='container' height={'40%'} show={isShow} closeOption={{ useYn: true, onClose: () => setShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>{answer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
