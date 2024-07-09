import { Box, TMainHeaderInfoTypes, Typography, Input, List, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef, useState } from 'react';
import simpleRightArrow from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page'
import { studentAtom } from '@/stores/student';
import { L03C08A02 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';



const P02 = () => {
  const [cardData, setCardData] = useRecoilState(L03C08A02);
  const [isDisabled, setIsDisabled] = useState<boolean>(cardData.p02.isSubmitted || false);

  const PAGE_NUMBER = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);

  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData.p02.answer[0].value,
          isAnswer: true,
        },
      ],
    },
  ];




  const handleChange = (index: number, value: string) => {


    const newAnswer = cardData.p02.answer.map(item => ({ ...item }));

    newAnswer[0].value = value
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: newAnswer } }));

    changeData(PAGE_NUMBER, 1, 1, value)


  };

  const handleSubmit = () => {

    setIsDisabled(true)


    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer[0].value,
            isAnswer: true,


          },
        ],


      },
    ];
    submitDataWithResult(PAGE_NUMBER, userSubmission, true);

  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'point1',
  };
  const questionInfo = {
    text: 'Discovering the Patterns',
  };
  const init = async () => {

    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (isSubmitted) {
        setIsDisabled(true)
      }
      if (userSubmissionList.length > 0) {

        const newAnswer = cardData.p02.answer.map(item => ({ ...item }));

        newAnswer[0].value = userSubmissionList[0].inputData[0]?.value || cardData.p02.answer[0].value;

        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: newAnswer,
            isSubmitted,

          },
        }));


      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {

      saveData(PAGE_NUMBER);
    };
  }, []);

  useEffect(() => {

    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);


  return (
    <Container headerInfo={headerInfo} submitLabel='완료하기'
      questionInfo={questionInfo}
      submitDisabled={isDisabled || cardData.p02.answer[0].value.trim() === ''}
      onSubmit={handleSubmit}
      submitBtnColor={isDisabled || cardData.p02.answer[0].value.trim() === '' ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >

      <Box flexDirection='column' hAlign='center' gap='20px' useFull>
        <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px' background='white' useRound>
          {/* <Box display='flex' flexDirection='column' gap='26px' padding='0 26px'> */}

          {/* <SvgIcon src={simpleRightArrow} size='38px' />  */}
          <SimpleRightArrowWrapper>
            <span>
              <Typography color='var(--color-red-800)' title='빨간색 글자' useGap={false}>
                Although
              </Typography>
              {' '}he became a free man, he still faced racial discrimination.
            </span>
          </SimpleRightArrowWrapper>



          <SimpleRightArrowWrapper>
            <span>
              <Typography color='var(--color-blue-700)' title='파란색 글자' useGap={false} >Despite</Typography>
              {' '}challenges in their lives, the artists never gave up on their art.

            </span>
          </SimpleRightArrowWrapper>



          {/* </Box> */}
        </Box>

        <List data={cardData.p02.answer} gap={20}>
          {({ value: item, index = 0 }) => (
            <Box>
              <Typography>{item?.text}</Typography>
              <Box marginTop={'8px'} paddingLeft={'40px'}>
                <Input
                  width='100%'
                  value={item?.value}
                  onChange={event => {
                    handleChange(index, event.target.value);
                  }}
                  maxLength={100}
                  disabled={isDisabled}
                  placeholder='내용을 넣어 주세요.'
                  ariaLabel='답란'
                />
              </Box>
            </Box>
          )}
        </List>
      </Box>
    </Container>
  );
};

export const SimpleRightArrowWrapper = styled.p`

display: flex;
align-items: baseline;
gap: 7px;

font-weight: var(--font-weight-bold);
&::before {
  content: '';
  display: block;
  width: 24px;
  height: 24px;
  background: url(${simpleRightArrow}) center center no-repeat;
}

`

export default P02;
