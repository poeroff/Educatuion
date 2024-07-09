import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  Image,
  Input,
  InputStatus,
  Tag,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C08A03a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A03a);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const handleInputChangeEvent = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  const onGrade = () => {
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

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Practice',
  };
  const questionInfo = {
    text: 'Complete the sentences using who(m) or which with the given words. If necessary, change the forms of the words.',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onGrade}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!cardData.p02.answer}
      submitBtnColor={!cardData.p02.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <Box>
        <Box gap={'10px'}>
          <TextView title='보기'>
            <Image src={'/L01/C08/A03/HE1-L01-C08-A03.jpg'} width={'636px'} height='49px' ariaDescribedby='img_desc' alt='' />
            <Box type='hidden' id='img_desc'>
              <p>They set up a device which required two individuals to pull both ends of a rope at the same time.</p>
              <p>빨간 색자 which가 이끄는 절이 which 앞의 파란 색자 a device를 수식하는 모습을 나타낸다.</p>
            </Box>
          </TextView>
        </Box>
        <Box marginTop='24px' display='flex' flexDirection='column' gap={'10px'}>
          <Box paddingLeft={'10px'}>
            <Typography>
              2.{' '}
              <Input
                width='auto'
                minWidth={'350px'}
                textAlign='start'
                value={cardData.p02.answer}
                onChange={e => handleInputChangeEvent(1, e.target.value)}
                maxLength={30}
                placeholder={'내용을 넣어 주세요.'}
                readOnly={cardData.p02.isSubmitted}
                ariaLabel='2번 입력란'
                status={isNotEmptyString(cardData.p02.answer) ? InputStatus.ENABLE : InputStatus.DEFAULT}
              />{' '}
              can take part in the singing contest.
            </Typography>
          </Box>
        </Box>
        <Box hAlign='flex-start' height='48px' marginTop='24px' paddingLeft={'10px'} backgroundColor='var(--color-blue-50)'>
          <Typography useGap color='var(--color-blue-800)' style={{ fontSize: '24px' }}>
            제시어 : anyone, love
          </Typography>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              Anyone who loves to sing, Anyone that loves to sing
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
