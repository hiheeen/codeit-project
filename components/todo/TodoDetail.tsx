'use client';

import { useEffect, useState } from 'react';
import TodoDetailItem from './TodoDetailItem';
import styled from 'styled-components';
import Image from 'next/image';
import ImageUploadBackground from '../../public/images/ImageUpload.png';
import PlusButton from '../../public/images/PlusButton.png';
import EditButton from '../../public/images/EditButton.png';
import Memo from '../../public/images/Memo.png';
import Button from '../common/Button';
import CheckText from '../../public/images/Check.png';
import XText from '../../public/images/X.png';
import { useRouter } from 'next/navigation';
import { GetTodoDetailResponseType } from '@/types';
import { deleteItem, getImageUrl, updateItem } from '@/services/todoServices';

interface ITodoDetailProps {
  initialTodoDetail: GetTodoDetailResponseType;
}

const TodoDetail = ({ initialTodoDetail }: ITodoDetailProps) => {
  const router = useRouter();
  const [todoDetail] = useState<GetTodoDetailResponseType>(initialTodoDetail);
  const {
    id,
    name: initialName,
    isCompleted,
    imageUrl: initialImageUrl,
    memo: initialMemo,
  } = initialTodoDetail;
  const [newName, setNewName] = useState<string>(initialName);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImageUrl
  ); // 이미지 업로드 후 미리보기 url
  const [memo, setMemo] = useState<string>(initialMemo || '');
  const [isChanged, setIsChanged] = useState<boolean>(false);

  // 변경사항이 있을 경우를 감지하여 '수정'버튼을 활성화 합니다.
  useEffect(() => {
    if (
      newName !== initialName ||
      (imagePreview !== '' && imagePreview !== initialImageUrl) ||
      (memo !== '' && memo !== initialMemo)
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [newName, image, memo, initialName, initialTodoDetail.memo]);

  // 이미지 업로드 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    //이미지가 올라온 경우
    if (file) {
      const fileName = file.name;
      const validFileName = /^[a-zA-Z]+\.(jpg|png|jpeg|gif)$/; // 영어 알파벳 + .jpg, .png, .jpeg, .gif 확장자만 허용

      if (!validFileName.test(fileName)) {
        alert('이미지 파일 이름은 영어로만 이루어져야 합니다');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('5MB 이하의 이미지를 업로드해주세요.');
        return;
      }

      setImage(file);
      // 미리보기 세팅
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 이미지 url 핸들러
  const getImageUrlHandler = async (): Promise<string | null> => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      try {
        const response = await getImageUrl(formData);
        return response.url;
      } catch (error) {
        console.error('Failed to upload image', error);
        return null;
      }
    }
    return '';
  };

  // todo 수정 핸들러
  const handleUpdate = async () => {
    if (!isChanged) {
      alert('수정 사항이 없습니다');
      return;
    }
    // 이미지 url을 먼저 받아옵니다.
    const imageUrl = await getImageUrlHandler();

    // imageUrl이 유효한 값일 경우에만 form에 추가합니다.
    const formData = {
      name: newName,
      memo: memo,
      isCompleted: isCompleted,
      ...(imageUrl && { imageUrl: imageUrl }),
    };
    try {
      await updateItem(id, formData);
      alert('할 일이 수정되었습니다.');
      setIsChanged(false);
      router.refresh();

      // 할 일 목록 페이지로 이동합니다.
      window.location.href = '/';
    } catch (error) {
      console.error('update todo error', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(id);
      alert('할 일이 삭제되었습니다.');
      router.refresh();

      // 할 일 목록 페이지로 이동합니다.
      window.location.href = '/';
    } catch (error) {
      console.error('delete todo error', error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <TodoDetailItem
          todo={{ name: newName, id, isCompleted }}
          setNewName={setNewName}
          newName={newName}
          todoDetail={todoDetail}
        />
        <ResponsiveContainer>
          {/* 기존 이미지가 있을 때 */}
          {imagePreview ? (
            <ImageContainer>
              <ImagePreview src={imagePreview} alt="이미지 프리뷰" />
              <Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <AbsoluteImage
                  src={EditButton}
                  width={64}
                  height={64}
                  alt="수정 버튼"
                />
              </Label>
            </ImageContainer>
          ) : (
            // 기존 이미지가 없을 때
            <ImageContainer>
              <Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                <AbsoluteImage
                  src={PlusButton}
                  width={64}
                  height={64}
                  alt="추가 버튼"
                />
              </Label>
            </ImageContainer>
          )}

          {/* 메모 */}
          <TextBox>
            <MemoText>Memo</MemoText>
            <TextArea
              value={memo}
              onChange={e => setMemo(e.target.value)}
              rows={4}
            />
            <div></div>
          </TextBox>
        </ResponsiveContainer>

        {/* 버튼 */}
        <ButtonContainer>
          <Button
            $bgcolor={isChanged ? 'lime300' : 'slate200'}
            $textcolor="slate900"
            text="수정완료"
            handleClick={handleUpdate}
            imageSrc={CheckText}
          />
          <Button
            $bgcolor="rose500"
            $textcolor="white"
            text="삭제하기"
            handleClick={handleDelete}
            imageSrc={XText}
          />
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

export default TodoDetail;
const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
`;
const Wrapper = styled.div`
  background-color: #ffffff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 1025px) {
    margin: 0 50px;
  }
`;
const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 1025px) {
    display: grid;
    width: 100%;
    grid-template-columns: 40% 60%;
    gap: 16px;
  }
`;
const ButtonContainer = styled.div`
  > *:first-child {
    margin-right: 10px;
  }
  padding-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const ImagePreview = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지를 컨테이너에 맞게 채움 */
  border-radius: 24px;
`;
const MemoText = styled.div`
  color: #92400e;
  font-weight: 800;
  font-size: 16px;
`;
const TextArea = styled.textarea`
  all: unset;
  color: #1e293b;
  font-weight: 400;
  text-align: center;
  width: 100%;
`;
const TextBox = styled.div`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  margin-top: 15px;
  border-radius: 24px;
  background-image: url(${Memo.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  width: 100%;
  height: 311px;
`;
const Label = styled.label`
  position: absolute;
  bottom: 9px;
  right: 9px;
  cursor: pointer;

  // 이미지 input 숨김
  input[type='file'] {
    display: none;
  }
`;
const AbsoluteImage = styled(Image)`
  position: absolute;
  bottom: 9px;
  right: 9px;
`;
const ImageContainer = styled.div`
  margin-top: 17px;
  background-image: url(${ImageUploadBackground.src});
  background-size: 64px;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  height: 311px;
  width: 100%;
  background-color: #f8fafc;
  border: 2px dotted #cbd5e1;
  border-radius: 24px;
`;
