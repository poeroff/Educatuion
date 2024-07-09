import { useEffect, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Button,
  Input,
  BoxWrap,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  EStyleFontSizes,
  SvgIcon,
  BottomSheet,
  Tag,
  ETagLine,
  IQuestionProps,
  Scroll,
} from '@maidt-cntn/ui';
import arrowRight from '@maidt-cntn/assets/icons/arrow_right_template.svg';
import { Container } from '@maidt-cntn/ui/en';

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C06A07 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

export interface IDialog {
  dialogTitle: React.ReactNode;
  dialogText: string;
}

const P02 = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShow, setShow] = useState<boolean>(false);

  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L04C06A07);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans?(5)',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Q5. Fill in the blanks to complete the author’s opinion.',
  };

  const dialogWithoutTitle: Omit<IDialog, 'dialogTitle'> = {
    dialogText:
      'I hope that we can overcome these challenges through careful consideration of neuroethics. This field highlights the social aspects of neural technology and provides possible answers to what should be considered legal and ethical. I think it is important to establish a prior review process and thoroughly assess the ethical aspects before any kind of brain research is conducted. This will ensure thatscience and technology progress in accordance with ethical principles. \n What do you think about this technology? Please share your opinion in the comments section below.',
  };

  const { userId } = useRecoilValue(studentAtom);

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

  const handleSubmit = () => {
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
              isAnswer: true,
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
      if (userSubmissionList.lenght > 0) {
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
  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData('P02', 1, 1, value);
  };

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

  const openModal = () => {
    setIsShowModal(true);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      onSubmit={handleSubmit}
      submitDisabled={cardData.p02.answer === ''}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={!cardData.p02.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap justifyContent={'flex-end'} marginTop={'24px'} width={'100%'} marginBottom={'24px'}>
        <Box width={'30%'} hAlign='flex-end'>
          <Button label={'지문보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} minWidth='132px' useRound onClick={openModal} />
        </Box>
      </BoxWrap>

      <Dialog
        isShow={isShowModal}
        width={893}
        height={500}
        useFooter
        onClose={() => setIsShowModal(false)}
        closeLabel='지문 닫기'
        confirmLabel='지문 닫기'
      >
        <Box tabIndex={103} useFull padding='24px 32px'>
          <Box vAlign='center' width='100%' height='48px' useRound backgroundColor='var(--color-grey-100)' marginBottom='24px'>
            <Typography weight={'bold'} size={EStyleFontSizes['X-MEDIUM']}>
              Will AI-Powered Neural Implants Make Us Super-Humans?(5)
            </Typography>
          </Box>
          <Scroll height='270px'>
            <Box padding='4px 12px'>
              <Typography fontSize='28px' lineHeight={'40px'} style={{ whiteSpace: 'pre-wrap' }}>
                {dialogWithoutTitle.dialogText}
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </Dialog>
      <Box background={'white'} useRound>
        What should be done before conducting brain research?
        <br />
        <SvgIcon src={arrowRight} size='20px' /> I think it is important to {''}
        <Input
          maxLength={100}
          value={cardData.p02.answer}
          inputSize='x-small'
          width='500px'
          onChange={event => handleChange(event.target.value)}
          placeholder='내용을 넣어 주세요.'
          readOnly={cardData.p02.isSubmitted}
          ariaLabel='답란'
        />
        <br />
        before any kind of brain research is conducted.
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
              I think it is important to {''}
            </Typography>
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
              establish a prior review process and thoroughly assess the ethical aspects
            </Typography>
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
              before any kind of brain research is conducted.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
