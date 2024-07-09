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
  List,
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
import { L06C09A03 } from './store';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L06C09A03);
  const [isShow, setIsShow] = useState<boolean>(false);

  const currentPage = 'P02';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
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
    text: '파티에 참석하려는 신데렐라 그림을 보고, 괄호 안의 말을 용하여 문장을 완성해 봅시다.',
  };

  const imageInfo = {
    src: `/L06/C09/A03/ME1-L06-C09-A03-P01.jpg`,
    alt: (
      <>
        <p>신데렐라가</p>
        <p>1. 파티에 가고 싶어한다.</p>
        <p>2. 많은 사람들을 만나고 싶어 한다.</p>
        <p>3. 12시 전에는 집에 갈 계획이 다.</p>
        <p>4. 보라색 드레스를 입을 생각 이다.</p>
      </>
    ),
  };

  const data = ['She plans', 'She decided'];
  const blue = [`go home before 12 o'clock`, `wear a purple dress`];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
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
    const updatedAnswers = cardData.p02.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: updatedAnswers } }));
    changeData(currentPage, 1, 1, value);
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }

    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p02.answer,
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
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!Array.isArray(cardData.p02.answer) || cardData.p02.answer.some(value => value === '' || value === undefined)}
      submitBtnColor={
        !Array.isArray(cardData.p02.answer) || cardData.p02.answer.some(value => value === '' || value === undefined)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
      useExtend
    >
      <BoxWrap useFull>
        <Box hAlign='center' width='370px'>
          <Image src={imageInfo.src} height='378px' ariaDescribedby='img_desc' />
          <Box type='hidden' id={'img_desc'}>
            {imageInfo.alt}
          </Box>
        </Box>
        <Box hAlign='center'>
          <List data={data}>
            {({ value, index = 1 }) => (
              <Box>
                <Typography>
                  ({index + 2}) {value}{' '}
                  <Input
                    tabIndex={100 + index}
                    width={index === 1 ? '403px' : '370px'}
                    placeholder='내용을 넣어 주세요.'
                    maxLength={100}
                    value={cardData.p02.answer[index - 1]}
                    onChange={e => handleChangeValue(e, index - 1)}
                    ariaLabel={index + 2 + '번 답안'}
                    readOnly={cardData.p02.isSubmitted}
                    status={cardData.p02.answer[index - 1] === '' ? InputStatus.DEFAULT : InputStatus.ENABLE}
                  />
                  .
                </Typography>
                <BlueTypography>({blue[index - 1]})</BlueTypography>
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='25%' margin-top={'10px'}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='10px'>
            {Array.from({ length: cardData.p02.solution.length }, (_, i) => (
              <Typography key={'solution_' + i} style={{ display: 'block' }}>
                ({i + 3}) {cardData.p02.solution[i]}
              </Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const BlueTypography = styled(Typography)`
  color: var(--color-blue-600);
  margin-left: 40px;
`;
