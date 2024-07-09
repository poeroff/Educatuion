import empty_square from '@/assets/icon/math_empty_square.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  Label,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A05_0002_05 } from './store';

const P01 = () => {
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(A05_0002_05);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: <Typography color='var(--color-grey-900)'>길이 나타내기</Typography>,
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' color='var(--color-white)' background='#969590' />
        <Box display='flex' alignItems='center'>
          <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
          &nbsp;안에 알맞은 수를 써넣어 자를 완성해 보세요.
        </Box>
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
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
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const isAnswerUnfilled = () => {
    let flag = false;
    cardData.p01.answer.forEach(ans => {
      if (!isNotEmptyString(ans)) {
        flag = true;
      }
    });
    return flag;
  };

  const setSubmitBtnColor = () => {
    if (isAnswerUnfilled()) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (isShow) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  const setSubmitLabel = () => {
    if (cardData.p01.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p01.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(show => !show);
      return;
    }

    const isCorrect1 = cardData.p01.answer[0] === cardData.p01.solution[0];
    const isCorrect2 = cardData.p01.answer[1] === cardData.p01.solution[1];
    const isCorrect3 = cardData.p01.answer[2] === cardData.p01.solution[2];
    const isCorrect4 = cardData.p01.answer[3] === cardData.p01.solution[3];
    const isAllCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        isCorrect: isAllCorrect,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer[0],
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer[1],
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer[2],
            isCorrect: isCorrect3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer[3],
            isCorrect: isCorrect4,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P01', userSubmission, isAllCorrect);
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
            answer:
              [
                userSubmissionList[0].inputData[0]?.value,
                userSubmissionList[0].inputData[1]?.value,
                userSubmissionList[0].inputData[2]?.value,
                userSubmissionList[0].inputData[3]?.value,
              ] || cardData.p01.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const answerList = [...cardData.p01.answer];
    answerList[subKey - 1] = value;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: answerList } }));
    changeData('P01', 1, subKey, value);
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
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      useRound
      vAlign='flex-start'
    >
      <Box position='relative' marginTop={30}>
        <Box position='absolute' bottom='15px' left='49px'>
          <Input
            ariaLabel='1센치미터를 밀리미터로 나타냈을 때의 값'
            width='100px'
            maxLength={2}
            type='number'
            status={
              !cardData.p01.answer[0]
                ? InputStatus.DEFAULT
                : cardData.p01.isSubmitted && cardData.p01.answer[0] !== cardData.p01.solution[0]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            readOnly={cardData.p01.isSubmitted}
            value={cardData.p01.answer[0]}
            onChange={e => handleChange(1, e.target.value)}
          />
          <Input
            ariaLabel='4센치미터를 밀리미터로 나타냈을 때의 값'
            width='100px'
            marginLeft={139}
            maxLength={2}
            type='number'
            status={
              !cardData.p01.answer[1]
                ? InputStatus.DEFAULT
                : cardData.p01.isSubmitted && cardData.p01.answer[1] !== cardData.p01.solution[1]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            readOnly={cardData.p01.isSubmitted}
            value={cardData.p01.answer[1]}
            onChange={e => handleChange(2, e.target.value)}
          />
          <Input
            ariaLabel='7센치미터를 밀리미터로 나타냈을 때의 값'
            width='100px'
            marginLeft={138}
            maxLength={2}
            type='number'
            status={
              !cardData.p01.answer[2]
                ? InputStatus.DEFAULT
                : cardData.p01.isSubmitted && cardData.p01.answer[2] !== cardData.p01.solution[2]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            readOnly={cardData.p01.isSubmitted}
            value={cardData.p01.answer[2]}
            onChange={e => handleChange(3, e.target.value)}
          />
          <Input
            ariaLabel='9센치미터를 밀리미터로 나타냈을 때의 값'
            width='100px'
            marginLeft={59}
            maxLength={2}
            type='number'
            status={
              !cardData.p01.answer[3]
                ? InputStatus.DEFAULT
                : cardData.p01.isSubmitted && cardData.p01.answer[3] !== cardData.p01.solution[3]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            readOnly={cardData.p01.isSubmitted}
            value={cardData.p01.answer[3]}
            onChange={e => handleChange(4, e.target.value)}
          />
        </Box>
        <Box position='absolute' left={310} top={-15}>
          <Image src='/A05/0002/05/종이띠.png' alt='종이띠' width='140px' height='50px' />
        </Box>
        <Image
          src='/A05/0002/05/MC31505.png'
          alt='자로 종이띠를 재고 있습니다. 2센티미터는 20밀리미터, 3센티미터는 30밀리미터 등이 적혀 있으므로 센티미터가 밀리미터 단위로 바뀌면 10배가 됩니다.'
          width='100%'
          height='160px'
        />
      </Box>
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
              <Typography>10, 40, 70, 90</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>1 cm는 10 mm, 4 cm는 40 mm, 7 cm는 70 mm, 9 cm는 90 mm입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;

export const BackgroundImage = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 65px;
`;
