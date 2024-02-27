import { useState } from "react";
import { Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { RootState } from "@/store";
import {
  useUploadProfilePictureMutation,
  useRemoveProfilePictureMutation,
} from "@/store/API/userAuthAPI";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const UserProfilePicture = ({ user }: { user: RootState["user"] }) => {
  const [uploadProfilePicture] = useUploadProfilePictureMutation();
  const [removeProfilePicture] = useRemoveProfilePictureMutation();

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    image.style.width = "100%";
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const [fileList, setFileList] = useState<UploadFile[]>(
    user?.photoURL
      ? [
          {
            name: "profile picture",
            uid: user?.uid,
            status: "done",
            url: user?.photoURL,
          },
        ]
      : []
  );

  const uploadProfilePictureFunction = async (e: FileType) =>
    await uploadProfilePicture(e)
      .unwrap()
      .then((res) =>
        setFileList([
          {
            name: "profile picture",
            uid: user?.uid,
            status: "done",
            url: res,
          },
        ])
      )
      .catch((err) => console.log(err));

  const removeProfilePictureFunction = async () => {
    setFileList([]);
    await removeProfilePicture().unwrap();
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        action={uploadProfilePictureFunction as unknown as string}
        listType="picture-card"
        fileList={fileList}
        onPreview={onPreview}
        onRemove={removeProfilePictureFunction}
      >
        {fileList.length === 0 && <div className="text-primary">+ Upload</div>}
      </Upload>
    </ImgCrop>
  );
};

export default UserProfilePicture;
