import {
  BoxWrap,
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Textarea,
  Scroll,
  IQuestionProps,
  Typography,
  BottomSheet,
  ETagLine,
  Tag,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { L01C12A05 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
const P02 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C12A05);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Reading',
  };

  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
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
              value: cardData.p02.answer,
              isAnswer: true,
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const handleChange = (index: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: index } }));
    changeData('P02', 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);
  const questionText = (
    <>
      <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='50px'>
        10. 밑줄 친&nbsp;
      </Typography>
      <Typography textDecoration='underline' useGap={false} fontSize='var(--font-size-32)' lineHeight='50px'>
        my own school survival kit
      </Typography>
      <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='50px'>
        &nbsp;안에 들어 있는 것을&nbsp;
      </Typography>
      <Typography textDecoration='underline' useGap={false} fontSize='var(--font-size-32)' lineHeight='50px'>
        모두
      </Typography>
      <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='50px'>
        찾아 써 봅시다. (단, 본문에 나온 표현 그대로 쓸 것)
      </Typography>
    </>
  );
  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);
  const questionInfo: IQuestionProps = {
    size: 'small',
    text: questionText,
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(event.target.value);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={submitAnswer}
      submitDisabled={!cardData.p02.isSubmitted && !isNotEmptyString(cardData.p02.answer)}
      submitBtnColor={
        isNotEmptyString(cardData.p02.answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap useFull>
        <Box background='white' useRound hAlign={'center'} useFull>
          <Scroll height='100%' width='453px'>
            Tomorrow is the first day of school. I make{' '}
            <Typography style={{ borderBottom: '1px solid black', display: 'inline-block', width: '350px' }}>my own school survival kit</Typography>.
            In my survival kit, I have a tennis ball. I hold it tightly. Then I am not nervous anymore. Also, I have many pens. I love colors!
          </Scroll>
        </Box>
        <Box useFull>
          <Textarea
            ariaLabel='답란'
            placeholder='내용을 넣어 주세요.'
            value={cardData.p02.answer}
            onChange={handleInputChange}
            readOnly={cardData.p02.isSubmitted}
          />
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>{cardData.p02.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
