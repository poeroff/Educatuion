import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L04C09A03 } from './store';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C09A03);
  const [isShow, setIsShow] = useState<boolean>(false);

  const currentPage = 'P01';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mePractice',
    headerText: 'A',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고, 좋은 습관과 나쁜 습관에 대한 문장을 완성해 봅시다.',
  };

  const imageInfo = {
    src: `/L04/C09/A03/ME1-L04-C09-A03-P01.jpg`,
    alt: (
      <>
        <p>1번 남자 아이가 일찍 일어난다.</p>
        <p>get up early</p>
        <p>2번 여자 아이가 밤늦게까지 자 지 않고 있다.</p>
        <p>stay up late</p>
        <p>3번 남자 아이가 달리기 중이다.</p>
        <p>exercise</p>
        <p>every day 4번 여자 아이가 손을 씻고 있 다.</p>
        <p>wash hands</p>
      </>
    ),
  };

  const data = [' is a good habit.', ' is a bad habit.', ' is a good habit.', '.'];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0].value,
            isSubmitted,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const updatedAnswers = cardData.p01.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: updatedAnswers } }));
    changeData(currentPage, 1, 1, value);
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData(currentPage, userSubmission);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      bodyId='targetContainer'
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!Array.isArray(cardData.p01.answer) || cardData.p01.answer.some(value => value === '' || value === undefined)}
      submitBtnColor={
        !Array.isArray(cardData.p01.answer) || cardData.p01.answer.some(value => value === '' || value === undefined)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
      useExtend
    >
      <Box hAlign='center' gap={24}>
        <BoxWrap width='370px'>
          <Box hAlign='center' useFull>
            <Image src={imageInfo.src} height='418px' ariaDescribedby='img_desc' />
            <Box type='hidden' id={'img_desc'}>
              {imageInfo.alt}
            </Box>
          </Box>
        </BoxWrap>
        <BoxWrap flexDirection='column' flex={1}>
          <Box>
            {Array.from({ length: 4 }, (_, index) => (
              <BlockTypography key={'text_' + index}>
                ({index + 1}){' '}
                <Input
                  tabIndex={100 + index}
                  width='450px'
                  placeholder='내용을 넣어 주세요.'
                  maxLength={100}
                  value={cardData.p01.answer[index]}
                  onChange={e => handleChangeValue(e, index)}
                  ariaLabel={index + '번 답안'}
                  readOnly={cardData.p01.isSubmitted}
                  status={cardData.p01.answer[index] === '' ? InputStatus.DEFAULT : InputStatus.ENABLE}
                />
                {data[index]}
              </BlockTypography>
            ))}
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='25%' margin-top={'10px'}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='10px'>
            {Array.from({ length: 4 }, (_, i) => (
              <Typography key={'solution_' + i} style={{ display: 'block' }}>
                ({i + 1}) {cardData.p01.solution[i]}
              </Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;

const BlockTypography = styled(Typography)`
  display: block;
  text-indent: -40px;
  margin-left: 40px;
  line-height: 52px;
`;
