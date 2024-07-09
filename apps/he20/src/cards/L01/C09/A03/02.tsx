import { L01C09A03 } from '@/cards/L01/C09/A03/store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Image,
  PinchZoom,
  TMainHeaderInfoTypes,
  Tag,
  Textarea,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C09A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan and Write',
  };
  const questionInfo: IQuestionProps = {
    text: 'Write a volunteer application based on Page 1 and revise it.',
  };

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

  const onSubmitText = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
      setShowAnswer(!showAnswer);
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
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => {
      return { ...prev, p02: { ...prev.p02, answer: e.target.value } };
    });
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!isNotEmptyString(cardData.p02.answer)}
      onSubmit={onSubmitText}
      useExtend
    >
      <BoxWrap useFull>
        <Box tabIndex={101} hAlign={'center'} useFull>
          <PinchZoom>
            <Image src={'/L01/C09/A03/HE2-L01-C09-A03-P02.jpg'} width='450px' height='410px' alt='' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>이 이미지는 자원봉사 지원서 작성 템플릿 입니다.</p>
              <p>Volunteer Application for 빈칸</p>
              <p>Name 빈칸</p>
              <p>Phone 빈칸</p>
              <p>E-mail 빈칸</p>
              <p>Type of Work You Want to</p>
              <p>Do I’d like to 빈칸</p>
              <p>Reasons for Volunteering</p>
              <p>빈칸</p>
              <p>Your Expectations</p>
              <p>I expect my volunteer work to 빈칸</p>
              <p>Available Time</p>
              <p>I’m available to volunteer 빈칸</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box tabIndex={102} useFull>
          <Textarea value={cardData.p02.answer} onChange={handleInputChange} readOnly={cardData.p02.isSubmitted} placeholder='내용을 넣어 주세요.' />
        </Box>
      </BoxWrap>
      {/* 답안보기 바텀시트 */}
      <BottomSheet bottomSheetTargetId='targetContainer' height='400px' show={showAnswer && cardData.p02.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box tabIndex={103}>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box tabIndex={104} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
            <Typography useGap={false}>Volunteer Application for House Repair Center</Typography>
          </Box>
          <Box tabIndex={105} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
            <Typography useGap={false} weight={700}>
              • Name
            </Typography>
            <Typography useGap={false}>Kim Minho</Typography>
          </Box>
          <Box tabIndex={106} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
            <Typography useGap={false} weight={700}>
              • Phone
            </Typography>
            <Typography useGap={false}>019-2345-6789</Typography>
          </Box>
          <Box tabIndex={107} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
            <Typography useGap={false} weight={700}>
              • E-mail
            </Typography>
            <Typography useGap={false}>want2bekind@example.com</Typography>
          </Box>
          <Box tabIndex={108} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
            <Typography useGap={false} weight={700}>
              Type of Work You Want to Do
            </Typography>
          </Box>
          <Box tabIndex={109} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
            <Typography useGap={false}>I’d like to help repair houses for people in need.</Typography>
          </Box>
          <Box tabIndex={110} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
            <Typography useGap={false} weight={700}>
              • Reasons for Volunteering
            </Typography>
          </Box>
          <Box tabIndex={111} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
            <Typography useGap={false}>
              I heard the news that several houses had been damaged by heavy rain, and many volunteers have come to help. I want to give them a hand.
            </Typography>
          </Box>
          <Box tabIndex={112} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
            <Typography useGap={false} weight={700}>
              • Your Expectations
            </Typography>
          </Box>
          <Box tabIndex={113} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
            <Typography useGap={false}>I expect my volunteer work to help the local community.</Typography>
          </Box>
          <Box tabIndex={114} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
            <Typography useGap={false} weight={700}>
              • Available Time
            </Typography>
          </Box>
          <Box tabIndex={115} vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
            <Typography useGap={false}>I’m available to volunteer two times in the evenings during the week and any time on weekends.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
