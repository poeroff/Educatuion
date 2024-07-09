import { useEffect, useState } from 'react';
import {
  Image,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Textarea,
  PinchZoom,
  IQuestionProps,
  Typography,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  InputStatus,
} from '@maidt-cntn/ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Container } from '@maidt-cntn/ui/en';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L03C09A03 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C09A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Plan and Write',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Write an e-mail based on Page 1 and revise it.',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!isNotEmptyString(cardData.p02.answer)}
      onSubmit={onSubmitText}
    >
      <BoxWrap useFull>
        <Box hAlign={'center'} useFull>
          <PinchZoom>
            <Image src={'/L03/C09/A03/HE2-L03-C09-A03-P02.jpg'} width='450px' height='280px' ariaDescribedby='imgDesc' alt='' />
            <Box type='hidden' id='imgDesc'>
              <p tabIndex={101}>이 이미지는 전기문을 작성하는 템플릿 입니다.</p>
              <p tabIndex={102}>빈칸 was 빈칸 who succeeded in the face of many difficulties.</p>
              <p tabIndex={103}>Despite 빈칸, he/she overcame the challenges by 빈칸.</p>
              <p tabIndex={104}>Driven by a passion for 빈칸, he/she 빈칸.</p>
              <p tabIndex={105}>He/She also 빈칸.</p>
              <p tabIndex={106}>He/She (has) made many other remarkable accomplishments, which is why he/she is considered 빈칸.</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull>
          <Textarea
            width='100%'
            height='470px'
            value={cardData.p02.answer}
            onChange={handleInputChange}
            readOnly={cardData.p02.isSubmitted}
            placeholder='내용을 넣어 주세요.'
            ariaLabel='답을 입력하세요'
            status={cardData.p02.isSubmitted ? InputStatus.DEFAULT : InputStatus.ENABLE}
          />
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow && cardData.p02.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box display='flex' flexDirection='column' marginTop='12px'>
            <Typography>
              Zaha Hadid (1950 - 2016) was an Iraqi British architect who succeeded in the face of many difficulties. Despite facing discrimination as
              an Iraqi woman in the male-dominated field of Western architecture, she overcame the challenges by standing out for her innovative ideas
              and hard work. Driven by a passion for architecture, she designed new iconic forms characterized by curves, such as in the London
              Aquatics Centre in the U.K. and the Dongdaemun Design Plaza (DDP) in Korea. She also became the first woman to win the Pritzker
              Architecture Prize in 2004. She made many other remarkable accomplishments, which is why she is considered one of the top architects of
              the 21st century.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
