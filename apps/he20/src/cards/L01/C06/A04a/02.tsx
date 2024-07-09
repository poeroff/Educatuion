import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  Textarea,
  BottomSheet,
  Tag,
  ETagLine,
  Scroll,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C06A04a, getUserSubmissionStore } from './store';
import { getUserSubmission } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const PAGE = 'P02';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A04a);
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [isShowText, setIsShowText] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const defaultSubmission = getUserSubmissionStore('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary (2)',
  };
  const questionInfo = {
    text: 'Q2. What did Mia and the club members do for the elephants with weak teeth?',
  };

  const content = `July 29, Monday\n\nOur club arrived at the Free Animals sanctuary. Jane, the staff member in charge of animal care, welcomed us with a big smile and gave us a tour of the facility. It was amazing to see bears and elephants moving freely in a large field. Our tasks for the day included cleaning the shelter and preparing food for the animals. While cleaning the habitats, we checked if there were any hazards that could harm the animals. Then, we helped prepare the food by cutting up fruits and vegetables and dividing them into several large baskets. For old elephants with weak teeth, we chopped bananas instead of the sugarcane that they usually eat. Spending the whole day helping out with the animals was an incredible experience for me. It was a rewarding experience, and I was impressed with the attention the staff members gave to all the animals.`;

  const handleShowText = () => {
    setIsShowText(!isShowText);
  };

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData(PAGE, 1, 1, value);
  };

  const handleSubmit = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    submitData(PAGE, getUserSubmissionStore(cardData.p02.answer));
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
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
      initData(PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    if (!isNotEmptyString(cardData.p02.answer)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p02]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={isButtonDisabled}
      onSubmit={cardData.p02.isSubmitted ? handleShowAnswer : handleSubmit}
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap useFull>
        <Box useFull marginRight='24px'>
          <Textarea
            width='100%'
            height='100%'
            value={cardData.p02.answer}
            onChange={handleChangeValue}
            placeholder='내용을 입력해 주세요.'
            readOnly={cardData.p02.isSubmitted}
            ariaLabel='텍스트 입력란'
          />
        </Box>
        <Box background='blue' useRound useFull>
          {isShowText ? (
            <Box>
              <Box hAlign='flex-end' marginBottom='10px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleShowText} />
              </Box>
              <Box height='275px' lineHeight='40px'>
                <Scroll>
                  <Typography usePre>{content}</Typography>
                </Scroll>
              </Box>
            </Box>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleShowText} />
            </Box>
          )}
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p02.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
