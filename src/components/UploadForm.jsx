import { useState } from "react";
import useStorage from "../hooks/useStorage";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { progress, startUpload } = useStorage(selectedFile);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      //start upload the image
      startUpload(selectedFile);
    }
    setSelectedFile(null);
  };

  return (
    <div className="text-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col gap-8"
      >
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
        />
        <button
          className={`btn gap-3 ${Boolean(progress) && `loading`}`}
          disabled={!selectedFile}
        >
          Upload <span>🚀</span>
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
