import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";

function ImageUpload({ ad, setAd }) {
  const handleUpload = async (e) => {
    try {
      let files = e.target.files;
      files = [...files];
      if (files?.length) {
        setAd({ ...ad, uploading: true });
        files.map((file) => {
          new Promise(() => {
            Resizer.imageFileResizer(
              file,
              1080,
              720,
              "JPEG",
              100,
              0,
              async (uri) => {
                try {
                  // we are now uploading to our server to be sent to aws after the resize
                  console.log(uri);
                  const { data } = await axios.post("/ad/upload-image", { image: uri });
                  setAd((prev) => ({ ...prev, photos: [data, ...prev.photos], uploading: false }));
                } catch (err) {
                  setAd({ ...ad, uploading: false });
                }
              },
              "base64"
            );
          });
        });
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, uploading: false });
    }
  };
  const handleDelete = async (file) => {
    const answer = window.confirm("Delete Image?");
    if (!answer) return;
    setAd({ ...ad, uploading: true });

    try {
      const { data } = await axios.post("/ad/remove-image", file);
      if (data?.ok) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((p) => p.Key !== file.Key),
          uploading: false,
        }));
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, uploading: false });
    }
  };
  return (
    <>
      <label className="btn btn-secondary">
        {ad.uploading ? "Processing..." : "Upload photos"}
        <input type="file" accept="image/*" multiple onChange={handleUpload} hidden />
      </label>
      {ad.photos?.map((file) => (
        <Avatar
          key={file}
          src={file?.Location}
          shape="square"
          size="46"
          className="ml-1 mb-4"
          onClick={() => {
            handleDelete(file);
          }}
        />
      ))}
    </>
  );
}

export default ImageUpload;
