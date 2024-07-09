import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Textarea,
  Typography,
  ETagLine,
  Tag,
  EStyleButtonTypes,
  BottomSheet,
  TextareaStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01C02A02 } from './store';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A02);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think Ahead',
  };

  const questionText = `How do you feel about\nstarting at a new school?`;

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
      submitBtnColor={
        !isNotEmptyString(cardData.p01.answer1) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!isNotEmptyString(cardData.p01.answer1)}
      onSubmit={onSubmitText}
    >
      <BoxWrap useFull>
        <Box hAlign={'center'} height='470px' useFull>
          <Typography lineHeight='40px' weight='500'>
            {questionText}
          </Typography>
        </Box>
        <Box useFull>
          <Textarea
            width='100%'
            height='470px'
            value={cardData.p01.answer1}
            onChange={handleInputChange}
            readOnly={cardData.p01.isSubmitted}
            placeholder='내용을 넣어 주세요.'
            ariaLabel='답 입력란'
          />
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow && cardData.p01.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box display='flex' flexDirection='column' marginTop='12px'>
            <Typography lineHeight='12px'>I was a bit nervous.</Typography>
            <Typography>I was very excited.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
