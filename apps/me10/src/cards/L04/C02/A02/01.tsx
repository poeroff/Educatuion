import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
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
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C02A02 } from './store';
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C02A02);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'View Ahead',
    headerPattern: 'icon',
    iconType: 'play',
  };

  const questionInfo: IQuestionProps = {
    text: 'What will Son say?',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [{ subKey: 1, type: 'TEXT', value: '' }],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmitText = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
            },
          ],
        },
      ];
      submitData('P01', userSubmission);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: e.target.value } }));
    changeData('P01', 1, 1, e.target.value);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
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
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={
        !isNotEmptyString(cardData.p01.answer1) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!isNotEmptyString(cardData.p01.answer1)}
      onSubmit={onSubmitText}
    >
      <BoxWrap height='340px' paddingLeft='16px' paddingRight='16px'>
        <Box useFull width='50%'>
          <PinchZoom>
            <Image
              src={'/L04/C02/A02/ME1-L04-C02-A02-P01.jpg'}
              width='418px'
              height='270px'
              alt={`엄마 토끼가 아들 토끼에게 "Let's go to the Moon." 이라고 말하고 있고 아들 토끼는 달토끼 전설을 상상하며 기뻐하는 모습. 아들 토끼의 말풍선이 비어있다.`}
            />
          </PinchZoom>
        </Box>
        <Box useFull width='50%'>
          <Box>
            <Textarea
              height='270px'
              value={cardData.p01.answer1}
              onChange={handleInputChange}
              readOnly={cardData.p01.isSubmitted}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='답 입력란'
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow && cardData.p01.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box display='flex' flexDirection='column' marginTop='12px'>
            <Typography>{cardData.p01.solution1}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;