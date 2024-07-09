import { TMainHeaderInfoTypes, Typography, Input, Box, List, BottomSheet, EStyleButtonTypes, Tag, ETagLine } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { ChangeEvent, useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C04A03, getUserSubmissionStore01 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const PAGE = 'P01';

const P01 = () => {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C04A03);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission = getUserSubmissionStore01(['', '', '', '']);

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setCardData(prev => ({
      ...prev,
      p01: { ...prev.p01, data: prev.p01.data!.map((data, idx) => (index - 1 === idx ? { ...data, userAnswer: value } : data)) },
    }));
    changeData(PAGE, 1, index, value);
  };

  const handleSubmit = () => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    submitData(PAGE, getUserSubmissionStore01(cardData.p01.data!.map(value => value.userAnswer)));
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            data: prev.p01.data!.map((value, index) => ({
              ...value,
              userAnswer: userSubmissionList[0].inputData[index]?.value || cardData.p01.data![index].userAnswer,
            })),
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
    if (!cardData.p01.data?.every(value => isNotEmptyString(value.userAnswer))) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p01]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 1. Think and Plan',
  };

  const questionInfo = {
    text: 'Answer the questions to prepare for a presentation.',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={cardData.p01.isSubmitted ? handleShowAnswer : handleSubmit}
      submitLabel={!cardData.p01.isSubmitted ? '완료하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={isButtonDisabled}
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <List data={cardData.p01.data!} gap={10}>
        {({ value: item, index = 1 }) => (
          <Box>
            <Typography>{item?.contents}</Typography>
            <Box paddingLeft={'40px'}>
              <Input
                width='100%'
                value={item?.userAnswer}
                textAlign='left'
                placeholder='내용을 넣어 주세요.'
                onChange={e => handleChangeValue(e, index)}
                maxLength={999}
                readOnly={cardData.p01.isSubmitted}
                ariaLabel={`${index}번째 입력란`}
              />
            </Box>
          </Box>
        )}
      </List>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Typography>
              <Tag type={ETagLine.GREEN} label='모범답안' />
            </Typography>
          </Box>
          <Box>
            {cardData.p01.solution?.map((data, index) => (
              <Typography usePre useGap={false} key={index}>
                {data}
              </Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
