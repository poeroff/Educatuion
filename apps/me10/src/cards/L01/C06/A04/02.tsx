import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  BottomSheet,
  Tag,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  Textarea,
  Scroll,
  ETagLine,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01C06A04 } from './store';

const P02 = () => {
  const currentPage = 'P02';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A04);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What’s in Your School Survival Kit? (1)',
  };
  const questionInfo = {
    text: 'Q. 중학교 등교 첫 날 기분이 어땠나요?',
  };

  const [opened, setOpened] = useState<boolean>(false);
  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const content =
    'Hello, everyone! Welcome to my class! I’m Ms. Seo, your English teacher. Today is the first day of middle school. Are you nervous? I’m also nervous, but   I feel okay with this box.';

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
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
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
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: e.target.value } }));
    changeData(currentPage, 1, 1, e.target.value);
  };

  const onSubmitText = () => {
    if (cardData.p02.isSubmitted) {
      return;
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
      submitData(currentPage, userSubmission);
    }
  };

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={'완료하기'}
      submitBtnColor={
        cardData.p02.answer === '' ? EStyleButtonTypes.SECONDARY : !cardData.p02.isSubmitted ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.GRAY
      }
      submitDisabled={cardData.p02.answer === '' || cardData.p02.isSubmitted}
      onSubmit={onSubmitText}
      vAlign='flex-start'
    >
      <BoxWrap useFull>
        <Box width='50%' marginRight='24px'>
          <Textarea
            width='100%'
            height='100%'
            placeholder='내용을 넣어 주세요.'
            value={cardData.p02.answer}
            onChange={handleInputChange}
            readOnly={cardData.p02.isSubmitted}
            ariaLabel='답안 입력란'
          />
        </Box>

        <Box width='50%' background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound padding='20px 16px'>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='56px' onClick={handleButtonOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} style={{ textIndent: 'var(--font-size-28)' }}>
                  {content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
            </Box>
          )}
        </Box>
      </BoxWrap>
    </Container>
  );
};
export default P02;
