'use client';

import { useEffect, useState } from 'react';
import TodoDetailItem from './TodoDetailItem';
import { BASE_URL } from '@/app/constants';
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

export type TodoDetailType = {
  isCompleted: boolean;
  imageUrl: string;
  memo: string;
  name: string;
  tenantId: string;
  id: number;
};
interface ITodoDetailProps {
  initialTodoDetail: TodoDetailType;
}

const TodoDetail = ({ initialTodoDetail }: ITodoDetailProps) => {
  const router = useRouter();
  const [todoDetail, setTodoDetail] =
    useState<TodoDetailType>(initialTodoDetail);
  const { id, name: initialName, isCompleted, imageUrl } = initialTodoDetail;
  const [newName, setNewName] = useState<string>(initialName);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialTodoDetail.imageUrl
  ); // 미리보기 URL
  const [memo, setMemo] = useState<string>(initialTodoDetail.memo || '');
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    if (
      newName !== initialName ||
      image !== null ||
      memo !== initialTodoDetail.memo
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [newName, image, memo, initialName, initialTodoDetail.memo]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const getImageUrl = async (): Promise<string | null> => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      try {
        const response = await fetch(`${BASE_URL}/images/upload`, {
          method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          body: formData,
        });
        const json = await response.json();
        return json.url;
      } catch (error) {
        console.error('Failed to upload image', error);
        return null;
      }
    }
    return '';
  };
  const handleUpdate = async () => {
    const imageUrl = await getImageUrl();
    const formData = {
      name: newName,
      memo: memo,
      imageUrl: imageUrl,
      isCompleted: isCompleted,
    };
    console.log(formData, 'formData');
    try {
      const response = await fetch(`${BASE_URL}/items/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      console.log(json, '수정에 대한 응답');
      alert('할 일이 수정되었습니다.');
      setIsChanged(false);
      router.refresh();
      window.location.href = '/';
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`${BASE_URL}/items/${id}`, {
        method: 'DELETE',
      });
      alert('할 일이 삭제되었습니다.');
      // 할 일 목록 페이지로 이동
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <TodoDetailItem
          todo={{ name: newName, id, isCompleted }}
          // handleToggle={() => handleToggle(id)}
          setNewName={setNewName}
          newName={newName}
          todoDetail={todoDetail}
        />
        <ResponsiveContainer>
          {/* 이미지 */}
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
            <ImageContainer>
              {imageUrl && <ImagePreview src={imageUrl} alt="이미지" />}
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
            children="수정완료"
            handleClick={handleUpdate}
            imageSrc={CheckText}
          />
          <Button
            $bgcolor="rose500"
            $textcolor="white"
            children="삭제하기"
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
  @media (min-width: 745px) {
    margin: 0 50px;
  }
`;
const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 745px) {
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
  border-radius: 24px; /* 컨테이너의 모서리 반경과 맞춤 */
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
