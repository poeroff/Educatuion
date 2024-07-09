import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Box, PinchZoom, Button, EStyleButtonTypes } from '@maidt-cntn/ui';
import { TSubjectCode, handleUploadByPath, makeFilePath } from '@maidt-cntn/util/FileUtil';
import { StyleFile, StyleAlert } from './File.style';
import { loadingIndicatorAtom } from '@maidt-cntn/stores/loadingIndicator';
import { alertAtom } from '@maidt-cntn/stores/alert';

export interface IFileRef {
  handleFileSubmit: () => void;
}

export interface IFileCardStoreInfo {
  subjectCode: TSubjectCode;
  cardPath: string;
  page: string;
  index?: number;
  userId: number;
}
export interface IFileProps {
  tabIndex?: number;
  inputText?: string;
  cardStoreInfo: IFileCardStoreInfo;
  readOnly?: boolean;
  imgSrc?: string;
  onChange?: (src: string) => void;
  onSubmit?: (src: string) => void;
}

interface IFileAlertProps {
  color?: EStyleButtonTypes;
  width?: string;
  height?: string;
  handleAlert: () => void;
}

const FileAlert: React.FC<IFileAlertProps> = ({
  color = EStyleButtonTypes.PRIMARY,
  width = '118px',
  height = '44px',
  handleAlert,
}: IFileAlertProps) => {
  return (
    <StyleAlert.AlertFooter>
      <Button color={color} width={width} height={height} useRound onClick={handleAlert}>
        <StyleAlert.ButtonText isActive>닫기</StyleAlert.ButtonText>
      </Button>
    </StyleAlert.AlertFooter>
  );
};

export const File = forwardRef<IFileRef, IFileProps>(
  ({ tabIndex = 0, inputText = '이미지를 올려 주세요.', cardStoreInfo, onChange, onSubmit, imgSrc, readOnly = false }, ref) => {
    const validExtension = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'];
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [alert, setAlert] = useRecoilState(alertAtom);
    const [loading, setLoading] = useRecoilState(loadingIndicatorAtom);

    const handleFileChange = () => {
      const file = inputRef.current?.files?.[0] ?? null;

      if (file) {
        if (!validExtension.includes(file.type)) {
          setAlert(prev => ({
            ...prev,
            isShow: true,
            iconType: 'no-file',
            subMessage: '지원하지 않는 파일 형식이에요.',
            description: '파일 형식을 확인해주세요.',
            children: (
              <FileAlert
                handleAlert={() => {
                  setAlert(prev => ({ ...prev, isShow: false }));
                }}
              />
            ),
          }));
          return;
        }

        const sizeLimit = 5 * 1024 * 1024; // 5MB
        if (file.size > sizeLimit) {
          setAlert(prev => ({
            ...prev,
            isShow: true,
            iconType: 'no-file',
            subMessage: '파일 크기 제한을 초과했어요.',
            description: '5MB 이하의 파일을 업로드해주세요.',
            children: (
              <FileAlert
                handleAlert={() => {
                  setAlert(prev => ({ ...prev, isShow: false }));
                }}
              />
            ),
          }));
          return;
        }
        const url = URL.createObjectURL(file);
        onChange?.(url);
      }
    };

    const handleOnClick = () => {
      inputRef.current?.click();
    };

    useImperativeHandle(ref, () => ({
      handleFileSubmit: async () => {
        const imageFile = inputRef.current?.files?.[0] ?? null;

        if (!imageFile) {
          setAlert(prev => ({
            ...prev,
            isShow: true,
            iconType: 'no-file',
            subMessage: '업로드할 이미지가 필요해요.',
            description: '이미지를 첨부하고 다시 시도해주세요.',
            children: (
              <FileAlert
                handleAlert={() => {
                  setAlert(prev => ({ ...prev, isShow: false }));
                }}
              />
            ),
          }));
          return;
        }
        setLoading(prev => ({ ...prev, isShow: true }));
        const filePath = makeFilePath({
          cardPath: cardStoreInfo.cardPath,
          page: cardStoreInfo.page.toUpperCase(),
          index: cardStoreInfo.index ?? 1,
          fileType: 'image',
          userId: cardStoreInfo.userId,
        });
        const result = await handleUploadByPath(imageFile, cardStoreInfo.subjectCode, filePath);
        if (result) {
          onSubmit?.(filePath);
          setLoading(prev => ({ ...prev, isShow: false }));
        } else {
          setLoading(prev => ({ ...prev, isShow: false }));
          setAlert(prev => ({
            ...prev,
            isShow: true,
            iconType: 'no-file',
            subMessage: '파일 업로드에 실패했어요.',
            description: '네트워크 환경을 확인해주세요.',
            children: (
              <FileAlert
                handleAlert={() => {
                  setAlert(prev => ({ ...prev, isShow: false }));
                }}
              />
            ),
          }));
        }
      },
    }));

    return (
      <StyleFile.Container hasFile={!!imgSrc} ref={containerRef}>
        {imgSrc ? (
          <PinchZoom>
            <StyleFile.PreviewImage
              src={readOnly ? '/' + imgSrc : imgSrc}
              isUrl={!readOnly}
              alt=''
              style={{ borderRadius: '8px' }}
              onClick={handleOnClick}
              maxWidth={containerRef.current?.clientWidth + 'px'}
              maxHeight={containerRef.current?.clientHeight + 'px'}
            />
          </PinchZoom>
        ) : (
          <Box hAlign='center' flexDirection='column' width='100%'>
            <StyleFile.FileUploadButton onClick={handleOnClick} aria-label='이미지 파일 업로드' />
            <StyleFile.InputText>{inputText}</StyleFile.InputText>
          </Box>
        )}
        <StyleFile.Input
          type='file'
          onChange={handleFileChange}
          aria-label='파일 업로드'
          accept='.jpg,.gif,.png'
          ref={inputRef}
          disabled={readOnly}
        />
      </StyleFile.Container>
    );
  },
);

export default File;
