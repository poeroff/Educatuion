import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  Label,
  SvgIcon,
  TBody,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableCaption,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L07C09A03 } from './store';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import LeftLine from '@/assets/icon/left_line.svg';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L07C09A03);
  const [isShow, setIsShow] = useState<boolean>(false);

  const currentPage = 'P01';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
          isAnswer: true,
          isCorrect: false,
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
    text: '과일 정보를 보고, 괄호 안의 말을 활용하여 비교하는 문장을 완성해 봅시다.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const tableInfo = {
    sizes: ['60px', '217px', '217px', '217px', '217px'],
    caption: 'fruits’ size and price',
  };

  const tableData = [
    { thText: '', size: 'size', weight: 'weight', price: 'price', height: '' },
    { thText: 'lemon', size: '/L07/C09/A03/ME1-L07-C09-A03-P01-1.jpg', weight: '90g', price: '1,000 won', alt: '레몬', height: '29px' },
    { thText: 'tomato', size: '/L07/C09/A03/ME1-L07-C09-A03-P01-2.jpg', weight: '160g', price: '800 won', alt: '토마토', height: '53px' },
    { thText: 'apple', size: '/L07/C09/A03/ME1-L07-C09-A03-P01-3.jpg', weight: '300g', price: '2,000 won', alt: '사과', height: '60px' },
    { thText: 'watermelon', size: '/L07/C09/A03/ME1-L07-C09-A03-P01-4.jpg', weight: '2,500g', price: '12,000 won', alt: '수박', height: '112px' },
  ];

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
    const isCorrect = cardData.p01.answer.every((a, idx = 0) => isAnswer(a, cardData.p01.solution[idx]));

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.answer,
            isAnswer: true,
            isCorrect: cardData.p01.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
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

  const CustomInput = (index: number) => {
    return (
      <Input
        tabIndex={100 + index}
        maxLength={30}
        placeholder='내용을 넣어 주세요.'
        width='242px'
        value={cardData.p01.answer[index - 1]}
        onChange={e => handleChangeValue(e, index - 1)}
        ariaLabel={index + '번 답안'}
        readOnly={cardData.p01.isSubmitted}
        status={
          cardData.p01.answer[index - 1] === ''
            ? InputStatus.DEFAULT
            : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer[index - 1], cardData.p01.solution[index - 1])
            ? InputStatus.ERROR
            : InputStatus.ENABLE
        }
        inputSize='small'
      />
    );
  };

  const textData = [
    <Typography useGap={false}>
      <TextLabel value='(1)' type='text' />A lemon is {CustomInput(1)} than a watermelon.{' '}
      <Typography useGap={false} color='var(--color-blue-600)'>
        (small)
      </Typography>
    </Typography>,
    <Typography useGap={false}>
      <TextLabel value='(2)' type='text' />
      An apple is {CustomInput(2)} {CustomInput(3)} a tomato.{' '}
      <Typography useGap={false} color='var(--color-blue-600)'>
        (heavy)
      </Typography>
    </Typography>,
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      bodyId='targetContainer'
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
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
      <Table color={EStyleTableTypes.DEFAULT} sizes={tableInfo.sizes}>
        <TableCaption caption={tableInfo.caption} hidden />
        <THead>
          {tableData.map(value => (
            <TH>
              <Typography useGap={false} fontSize='24px' lineHeight='36px' color='var(--color-black)' fontWeight='var(--font-weight-bold)'>
                {value.thText}
              </Typography>
            </TH>
          ))}
        </THead>
        <TBody>
          <TR>
            <TD type='main'>
              <BoxWrap height={114} alignItems='center' justifyContent='center'>
                <Typography useGap={false} fontSize='24px' lineHeight='36px' color='var(--color-black)' fontWeight='var(--font-weight-bold)'>
                  {tableData[0].size}
                </Typography>
              </BoxWrap>
            </TD>
            {tableData.slice(1).map((value, index) => (
              <TD>
                <BoxWrap height={114} alignItems='center' justifyContent='center'>
                  <Image src={value.size} alt={value.alt} height={value.height} />
                  {index !== 3 && (
                    <SvgWrapper>
                      <SvgIcon size='38px' src={LeftLine} />
                    </SvgWrapper>
                  )}
                </BoxWrap>
              </TD>
            ))}
          </TR>
          <TR>
            <TD type='main'>
              <Typography useGap={false} fontSize='24px' lineHeight='36px' color='var(--color-black)' fontWeight='var(--font-weight-bold)'>
                {tableData[0].weight}
              </Typography>
            </TD>
            {tableData.slice(1).map(value => (
              <TD>
                <BoxWrap alignItems='center' justifyContent='center'>
                  <Typography useGap={false} fontSize='24px' lineHeight='36px' color='var(--color-black)'>
                    {value.weight}
                  </Typography>
                </BoxWrap>
              </TD>
            ))}
          </TR>
          <TR>
            <TD type='main'>
              <BoxWrap alignItems='center' justifyContent='center'>
                <Typography useGap={false} fontSize='24px' lineHeight='36px' color='var(--color-black)' fontWeight='var(--font-weight-bold)'>
                  {tableData[0].price}
                </Typography>
              </BoxWrap>
            </TD>
            {tableData.slice(1).map(value => (
              <TD>
                <BoxWrap alignItems='center' justifyContent='center'>
                  <Typography useGap={false} fontSize='24px' lineHeight='36px' color='var(--color-black)'>
                    {value.price}
                  </Typography>
                </BoxWrap>
              </TD>
            ))}
          </TR>
        </TBody>
      </Table>
      <Box marginTop={20}>
        <BoxWrap boxGap={4} alignItems='center'>
          <BoxWrap boxGap={0} alignItems='center'>
            {textData[0]}
          </BoxWrap>
        </BoxWrap>
        <BoxWrap boxGap={4} alignItems='center' marginTop={8}>
          <BoxWrap boxGap={0} alignItems='center'>
            {textData[1]}
          </BoxWrap>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='25%' margin-top={'10px'}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography style={{ display: 'block' }}>(1) {cardData.p01.solution[0]}</Typography>
            <Typography style={{ display: 'block' }}>
              (2) {cardData.p01.solution[1]} {cardData.p01.solution[2]}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;

const SvgWrapper = styled.div`
  position: absolute;
  right: -18px;
  top: calc(50% - 14px);
  z-index: 2;
`;

const TH = styled.th`
  display: table-cell;
  vertical-align: middle;
  height: 59px;
  background: var(--color-green-100);
`;

const TD = styled.td<{ type?: string }>`
  position: relative;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 52px;
  background: ${({ type }) => (type === 'main' ? 'var(--color-green-100); padding-inline: 29px;' : 'var(--color-white)')};
  min-width: 132px;
`;

const TextLabel = styled(Label)`
  font-size: 28px;
  margin-right: 12px;
`;
