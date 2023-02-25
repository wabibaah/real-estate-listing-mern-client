import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";

import { useAuth } from "../../context/auth";

function ProfileUpload({ photo, setPhoto, uploading, setUploading }) {
  const [auth, setAuth] = useAuth();
  const handleUpload = async (e) => {
    try {
      let file = e.target.files[0];
      if (file) {
        setUploading(true);
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
                setPhoto(data);
                setUploading(false);
              } catch (err) {
                setUploading(false);
              }
            },
            "base64"
          );
        });
      }
    } catch (err) {
      setUploading(false);
    }
  };
  const handleDelete = async (file) => {
    const answer = window.confirm("Delete Image?");
    if (!answer) return;
    setUploading(true);

    try {
      const { data } = await axios.post("/ad/remove-image", photo);
      if (data?.ok) {
        setPhoto(null);
        setUploading(false);
      }
    } catch (err) {
      setUploading(false);
    }
  };
  return (
    <>
      <label className="btn btn-secondary mb-4">
        {uploading ? "Processing..." : "Upload photos"}
        <input type="file" accept="image/*" onChange={handleUpload} hidden />
      </label>
      {photo?.Location ? (
        <Avatar
          src={photo.Location}
          shape="square"
          size="46"
          className="ml-1 mb-4"
          onClick={() => {
            handleDelete();
          }}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default ProfileUpload;
