import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, EStyleButtonTypes, BoxWrap, Textarea, File, IQuestionProps } from '@maidt-cntn/ui';
import styled from 'styled-components';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { initDataType, correctDataType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { handleDownload, handleUpload } from '@maidt-cntn/util/FileUtil';
import { getCorrectData, getDefaultData } from './pageData';
import { LabelTypes } from '@/assets/styles';

// 홀딩
interface Props {
  userId: number;
  Layout: {
    headerInfo: TMainHeaderInfoTypes;
    questionInfo: IQuestionProps;
  };
}

export const imgName = 'uploadImg1.png';

const P03 = ({ userId }: Props) => {
  const { isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(3),
    collectDatas: getCorrectData(3),
  });

  const [disabled, setDisabled] = useState(true);
  const [showSolution, setShowSolution] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  const mainKey = 3;
  const subjectCode = 'EE40';
  const path = '/L02/C03/A10';
  const id = userId;
  const serverFileName = imgName;
  const isComplete = isSubmittedInput(mainKey, 'TEXT-0');

  const loadPreviewImg = async (subjectCode: string, path: string, id: number, setImgSrc: Function) => {
    const filename = `${path}/${id}/${serverFileName}`;
    const img = await handleDownload(subjectCode, filename);
    const url = window.URL.createObjectURL(img);
    setImgSrc(url);
  };

  useEffect(() => {
    loadPreviewImg(subjectCode, path, id, setImgSrc);
  }, [subjectCode, path, id]);

  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const fileName = file.name;
    const uploadSuccess = await handleUpload(file, subjectCode, path, id, fileName);

    if (uploadSuccess) {
      console.log('[ uploadSuccess ]');
      loadPreviewImg(subjectCode, path, id, setImgSrc);
    }
  };

  const handleSubmit = () => {
    if (!isComplete) {
      submitPageData();
    } else {
      setShowSolution(!showSolution);
    }
  };

  const CONST: Props['Layout'] = {
    headerInfo: { headerText: 'Mission 3_Try It' },
    questionInfo: {
      text: '휴대 전화 연락처에 가족을 영어로 저장하고, 연락처 화면 사진을 올려 봅시다.',
    },
  };

  return (
    <Container
      headerInfo={CONST.headerInfo}
      submitLabel={'완료하기'}
      submitDisabled={disabled}
      submitBtnColor={!disabled ? EStyleButtonTypes.TERTIARY : EStyleButtonTypes.TERTIARY}
      onSubmit={handleSubmit}
      questionInfo={CONST.questionInfo}
    >
      <Box useFull display='flex' flexDirection='column' alignItems='center' padding={'20px'}>
        <Box>
          <FileWrap onChange={handleUploadImage}>{imgSrc ? <ImgWrap src={imgSrc} alt='업로드된 이미지' /> : <File />}</FileWrap>
        </Box>
      </Box>
    </Container>
  );
};

export default P03;

const FileWrap = styled.div`
  width: 1000px;
  height: 336px;
  background: #e0e2e6;
  border-radius: 8px;
`;

const ImgWrap = styled.img`
  width: 480px;
  height: 340px;
  border-radius: 8px;
`;
