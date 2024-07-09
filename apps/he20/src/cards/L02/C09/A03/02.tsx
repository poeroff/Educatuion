import { useEffect, useState } from 'react';
import {
  Image,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Textarea,
  PinchZoom,
  IQuestionProps,
  ETagLine,
  BottomSheet,
  Tag,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02C09A03 } from './store';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C09A03);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Plan and Write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Write an e-mail based on Page 1 and revise it.',
  };

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: e.target.value } }));
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
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={submitAnswer}
      submitDisabled={!isNotEmptyString(cardData.p02.answer)}
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer)
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p02.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BoxWrap useFull>
        <Box hAlign={'center'} useFull>
          <PinchZoom>
            <Image src={'/L02/C09/A03/HE2-L02-C09-A03-P02.jpg'} width='450px' height='280px' alt='' />
            <Box type='hidden'>
              <p>이 이미지는 이메일을 작성하는 템플릿 입니다.</p>
              <p>To 빈칸</p>
              <p>Subject Request for 빈칸</p>

              <p>Dear Customer Service,</p>
              <p>I’m writing to request 빈칸.</p>
              <p>Unfortunately, 빈칸.</p>
              <p>I think 빈칸. I would therefore like to kindly request that 빈칸.</p>
              <p>If you have any questions about my request, contact me at 빈칸.</p>
              <p>I look forward to your earliest response to this matter.</p>

              <p>Regards,</p>
              <p>빈칸</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull>
          <Textarea
            value={cardData.p02.answer}
            onChange={handleChange}
            readOnly={cardData.p02.isSubmitted}
            ariaLabel='답을 입력하세요'
            placeholder='내용을 넣어 주세요.'
          />
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow && cardData.p02.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='12px'>
            <p>To: cscenter@flowerlove.com</p>
            <p>Subject: Request for an Exchange</p>
            <br />
            <p>Dear Customer Service,</p>
            <p>
              I’m writing to request an exchange for a plant I bought from your online store. Unfortunately, when I received it, I found that the pot
              was broken. I think more attention should have been paid to the packaging. I would therefore like to kindly request that a new plant be
              sent as a replacement to my address at 123 Seoul-ro. If you have any questions about my request, contact me at 019 -1234-5678. I look
              forward to your earliest response to this matter.
            </p>
            <br />
            <p>Regards,</p>
            <p>Mina Kim</p>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
