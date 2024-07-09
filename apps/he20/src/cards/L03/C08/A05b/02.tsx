import {
  Box,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  Tag,
  ETagLine,
  BottomSheet,
  TextView,
  Input,
  Typography,
  SvgIcon,
  Image,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect } from 'react';
import arrow from '@maidt-cntn/assets/icons/arrow-icon.svg';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L03C08A05b } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A05b);
  const { userId } = useRecoilValue(studentAtom);
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            value: userSubmissionList[0].inputData[0]?.value || cardData.p02.value,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const [isShow, setIsShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2 : Practice',
  };
  const questionInfo = {
    text: 'Write the part that the blue phrase in the sentence describes.',
  };

  const handleOnSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      const isCorrect = cardData.p02.value === cardData.p02.value;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.value,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    } else setIsShow(!isShow);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={handleOnSubmit}
      submitDisabled={!isNotEmptyString(cardData.p02.value)}
      submitBtnColor={
        isNotEmptyString(cardData.p02.value) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <Box>
        <Box width='920px'>
          <TextView title='보기' height='120px'>
            <Image src={'/L03/C08/A05/HE2-L03-C08-A05-P01.jpg'} width={'800px'} title={'보기'} />
            <Box type='hidden' id='img_desc'>
              <p>이미지에는 두 개의 문장이 퍼즐 조각처럼 나뉘어져 있다:</p>
              <p>첫 번째 문장:</p>
              <p>첫 번째 조각: "She even studied abroad in Paris,"는 파란색으로 강조되어 있다.</p>
              <p>
                두 번째 조각: "which was unusual for women at the time."는 "which"가 빨간색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.
              </p>
              <p>두 번째 문장:</p>
              <p>
                첫 번째 조각: "Lewis went to live with her aunt in Digby,"는 "Digby"가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.
              </p>
              <p>두 번째 조각: "where she met her future husband."는 "where"가 빨간색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.</p>
            </Box>
          </TextView>
        </Box>
        <Box marginTop='20px'>
          <Box>
            <Typography lineHeight='normal'>
              <Typography usePre>2. Sarah는 그녀의 사진들로 개인전을 열었는데, 이는 그녀의 어린 시절 꿈이었다.</Typography>
              <Typography>Sarah hosted a personal gallery with her photographs,</Typography>
              <Typography useGap={false} color={'var(--color-blue-900)'}>
                &nbsp;which was her childhood dream
              </Typography>
              <Typography useGap={false}>.</Typography>
            </Typography>
          </Box>
          <Box hAlign={'flex-start'} marginTop='10px'>
            <SvgIcon src={arrow} size='38px' />
            <Input
              value={cardData.p02.value}
              maxLength={100}
              onChange={e => {
                setCardData(prev => ({ ...prev, p02: { ...prev.p02, value: e.target.value } }));
                changeData('P02', 1, 1, e.target.value);
              }}
              placeholder='내용을 넣어 주세요.'
              width='850px'
              readOnly={cardData.p02.isSubmitted}
              inputSize='x-small'
              ariaLabel='답란'
            />
          </Box>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>{'Sarah hosted a personal gallery with her photographs'}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
