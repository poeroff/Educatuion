import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { C02000113_store } from './store';
import usePageData from '@/hooks/usePageData';
import {
  Input,
  Box,
  Typography,
  IQuestionProps,
  Image,
  BoxWrap,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  SvgIcon,
  InputStatus,
} from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C02000113_store);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const PAGE_NUMBER = 'P01';

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <Box vAlign='center'>원 위에 두 점을 이어 선분을 그으려고 합니다. 두 점을 찾아 써 보세요.</Box>
      </>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p01.solution1.includes(cardData.p01.answer1);
      const isCorrect2 = cardData.p01.solution2.includes(cardData.p01.answer2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    }
    changeData('P01', 1, subKey, value);
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
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={onGrade}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2)}
      submitBtnColor={
        !cardData.p01.answer1 && cardData.p01.answer2 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW
      }
      useRound
    >
      <BoxWrap justifyContent='center' height='60%'>
        <Box hAlign='center' flexDirection='column'>
          <Image
            src='/C02/0001/13/DEC322003.png'
            alt='점 ①과 ⑤는 원 위의 두 점이고, 점 ②는 원 밖의 한 점이고, 점 ③과 ④는 원 안의 두 점으로 있는 원의 그림입니다.'
            height='170px'
          />
        </Box>
      </BoxWrap>

      <BoxWrap justifyContent='flex-end' marginBottom='30px'>
        <Box>
          <Input
            type='number'
            value={cardData.p01.answer1}
            onChange={event => handleChange(1, event.target.value)}
            readOnly={cardData.p01.isSubmitted}
            status={
              !cardData.p01.isSubmitted
                ? InputStatus.DEFAULT
                : cardData.p01.solution1.includes(cardData.p01.answer1)
                ? InputStatus.ENABLE
                : InputStatus.ERROR
            }
            placeholder=''
            ariaLabel='답란1'
            width='50px'
            maxLength={1}
          />
          <Typography>,</Typography>
          <Input
            type='number'
            value={cardData.p01.answer2}
            onChange={event => handleChange(2, event.target.value)}
            readOnly={cardData.p01.isSubmitted}
            status={
              !cardData.p01.isSubmitted
                ? InputStatus.DEFAULT
                : cardData.p01.solution2.includes(cardData.p01.answer2)
                ? InputStatus.ENABLE
                : InputStatus.ERROR
            }
            placeholder=''
            ariaLabel='답란2'
            width='50px'
            maxLength={1}
          />
        </Box>
      </BoxWrap>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>①, ⑤</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap marginTop='12px'>
              <Box hAlign='center' vAlign='start' flexDirection='column' useRound useFull>
                <Typography>원 위에 두 점을 이어 선분을 그으려면 ①과 ⑤를 이어야 합니다. </Typography>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
