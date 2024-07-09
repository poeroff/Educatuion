import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
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
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L03C11A04 } from './store';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C11A04);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };

  const questionInfo: IQuestionProps = {
    text: '2. Rewrite the underlined sentence, starting with "rarely."',
  };

  const answer = 'Rarely do people want to put up with a lot of noise'; // 모범 답안

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const onSubmitText = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: e.target.value } }));
    changeData('P02', 1, 1, e.target.value);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const getSubmitBtnColor = () => {
    if (!cardData.p02.isSubmitted) {
      return !isNotEmptyString(cardData.p02.answer1) ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return !isShow ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.GRAY;
    }
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onSubmitText}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={getSubmitBtnColor()}
      submitDisabled={!isNotEmptyString(cardData.p02.answer1)}
    >
      <BoxWrap useFull>
        <Box useFull background='white' useRound>
          <Scroll height='100%'>
            <Typography useGap={false}>
              <Typography useGap={false} style={{ textIndent: 'var(--font-size-28)' }}>
                Which is the better environment for studying: a noisy place or a quiet place?{' '}
              </Typography>{' '}
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
            value={cardData.p02.answer1}
            onChange={handleInputChange}
            width='100%'
            height='100%'
            rows={9}
            placeholder='내용을 넣어 주세요.'
            readOnly={cardData.p02.isSubmitted}
            ariaLabel='답 입력란'
          />
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='container' height={'40%'} show={isShow} closeOption={{ useYn: true, onClose: () => setShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
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
