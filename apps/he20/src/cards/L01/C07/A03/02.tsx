import React, { useEffect, useState } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  Image,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
  Input,
  EStyleSizes,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { textContentA03, imgContentA03P02 } from './commonData';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C07A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const { title, content, subTitleIndexes } = textContentA03;
  const { imgSrc, imgAlt } = imgContentA03P02;
  const [isMainTextOpen, setIsMainTextOpen] = useState(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A03);
  const [isShow, setShow] = useState<boolean>(false);
  const { userId } = useRecoilValue(studentAtom);

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
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  const handleButtonClick = () => {
    setIsMainTextOpen(true);
  };

  const handleDialogClose = () => {
    setIsMainTextOpen(false);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Write',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Complete the club members’ conversation before visiting the Free Animals sanctuary based on the main text.',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={!cardData.p02.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={onGrade}
      submitDisabled={!cardData.p02.answer}
      vAlign={'flex-start'}
    >
      <Box hAlign='right' height={'24px'}>
        <Button minWidth='96px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' onClick={handleButtonClick} useRound />
      </Box>
      <BoxWrap>
        <Box width={'450px'} hAlign={'center'} height={'330px'}>
          <PinchZoom>
            <Image type={EImageType.IMG} src={imgSrc} width='450px' />
            <Box type='hidden'>{imgAlt}</Box>
          </PinchZoom>
        </Box>

        <Box width={'85%'} height={'330px'} paddingTop={'105px'}>
          <Scroll>
            <Box marginTop={'20px'}>
              <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                Yes. It’s a place where
              </Typography>
            </Box>

            <Box>
              <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                {'1)'}{' '}
                <Input
                  value={cardData.p02.answer}
                  onChange={e => handleInputChangeEvent(1, e.target.value)}
                  minWidth='350px'
                  maxLength={87}
                  placeholder='내용을 넣어 주세요.'
                  inputSize='x-small'
                  readOnly={cardData.p02.isSubmitted}
                  ariaLabel='1번 답란'
                  status={cardData.p02.answer ? InputStatus.ENABLE : InputStatus.DEFAULT}
                />
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>

      <Dialog
        width={893}
        height={458}
        isShow={isMainTextOpen}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              {title}
            </Typography>
          </Box>
        )}
        onClose={handleDialogClose}
        useFooter={true}
        closeLabel={'지문 닫기'}
      >
        <Box>
          <Scroll tabIndex={0}>
            {content.split('\n').map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <Typography useGap={false} weight={!subTitleIndexes.has(index) ? 'normal' : 'semi-bold'} size={EStyleFontSizes.MEDIUM}>
                  {paragraph}
                </Typography>
                <br />
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Scroll>
        </Box>
      </Dialog>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
              rescued, injured, or abused animals can live in a safe and caring environment
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
