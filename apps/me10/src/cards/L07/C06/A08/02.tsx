import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  IQuestionProps,
  List,
  Scroll,
  Textarea,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L07C06A08 } from './store';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L07C06A08);

  const [isParagraphOpen, setIsParagraphOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Amazing Facts About the World (5)',
  };

  const questionInfo: IQuestionProps = {
    text: 'What about you?',
  };

  const subQuestion = (
    <Box display='flex'>
      <Typography>Q.</Typography>
      <Typography>본문의 내용 중 가장 흥미로운 사실은 무엇인가요?</Typography>
    </Box>
  );

  interface IListenAndAnswer {
    label?: string;
    labelColor?: string;
    originText: string;
    translation: string;
  }

  const data: IListenAndAnswer[] = [
    {
      label: 'Host',
      labelColor: 'var(--color-purple-700)',
      originText: 'Thanks, Joe.',
      translation: '고마워요, Joe.',
    },
    {
      originText: 'We have two winners today.',
      translation: '오늘 우승자가 두 명 있네요.',
    },
    {
      originText: 'Congratulations, Namjun and Sara!',
      translation: '축하합니다, 남준과 사라!',
    },
  ];

  const dialog = (
    <List<IListenAndAnswer>
      data={data}
      row={({ value, index = 1 }) => (
        <BoxWrap boxGap={10}>
          <Box minWidth='84px' textAlign='left' color={value?.labelColor} height='fit-content' borderRadius='8px'>
            <Typography weight='var(--font-weight-bold)'>{value?.label || ``}</Typography>
          </Box>
          <Box>
            <Typography>{value?.originText}</Typography>
          </Box>
        </BoxWrap>
      )}
    />
  );

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [{ subKey: 1, type: 'TEXT', value: '' }],
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
            answer: userSubmissionList[0].inputData[0]?.value || '',
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      return;
    } else {
      setCardData(prev => ({
        ...prev,
        p02: { ...prev.p02, isSubmitted: true },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [{ subKey: 1, type: 'TEXT', value: cardData.p02.answer }],
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({
      ...prev,
      p02: { ...prev.p02, answer: value },
    }));
    changeData('P02', 1, 1, value);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  const handleParagraphOpen = () => {
    setIsParagraphOpen(!isParagraphOpen);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel='완료하기'
      submitDisabled={!isNotEmptyString(cardData.p02.answer) || cardData.p02.isSubmitted}
      submitBtnColor={!isNotEmptyString(cardData.p02.answer) || cardData.p02.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap useFull>
        <BoxWrap flexDirection='column' justifyContent='center' useFull>
          <Box>{subQuestion}</Box>
          <Box marginTop={'20px'}>
            <Textarea
              value={cardData.p02.answer}
              onChange={e => handleInputChange(e.target.value)}
              width='100%'
              height='128px'
              placeholder='내용을 넣어 주세요.'
              alt='답안 입력란'
              readOnly={cardData.p02.isSubmitted}
            />
          </Box>
        </BoxWrap>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isParagraphOpen ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button
                  tabIndex={103}
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={handleParagraphOpen}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={104}>
                <Typography lineHeight={'48px'}>{dialog}</Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button tabIndex={105} color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleParagraphOpen} />
            </Box>
          )}
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P02;
