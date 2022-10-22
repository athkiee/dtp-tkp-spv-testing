import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import DescriptionIcon from "@mui/icons-material/Description";
import Button from "@material-ui/core/Button";
import CloseIcon from "@mui/icons-material/Close";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "black",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "black",
  transition: "border .3s ease-in-out",
};
const baseStyleFileName = {
  display: "flex",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "black",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "black",
  transition: "border .3s ease-in-out",
  justifyContent: 'space-between',
};

const activeStyle = {
  borderColor: "#000",
};

const acceptStyle = {
  borderColor: "#17827B",
};

const rejectStyle = {
  display: "flex",
  justifyContent: 'space-between',
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#DE1B1B",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "black",
  transition: "border .3s ease-in-out",
};

export default function DragAndDrop(props) {
  const { onChange, acceptFiles, uploadType, hintError, name } = props;
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(name);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    onChange(acceptedFiles[0]);
  }, [setFile, onChange]);
  const onClose = useCallback(() => {
    setFile(null);
    onChange(null);
    setFileName("");
  }, [setFile, onChange, setFileName]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: acceptFiles,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragAccept, isDragReject]
  );

  const styleNameFile = useMemo(
    () => ({
      ...baseStyleFileName,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragAccept, isDragReject]
  );
      

  return (
    <>
      {fileName || file? (
        <div style={hintError ? rejectStyle : styleNameFile}>
            <div style={{display:'flex'}}>
              <DescriptionIcon
                style={{ fontSize: "20px" }}
              />
              {fileName || file.name}
            </div>
            <div>
              <Button
                style={{ fontSize: "14px", padding: 0 }}
                onClick={onClose}
              >
                <CloseIcon />
              </Button>
            </div>
        </div>
      ) : (
        <div
          {...getRootProps({
            style: {
              ...style,
              ...(hintError !== undefined && rejectStyle),
              ...(hintError === undefined && activeStyle),
            },
          })}
        >
          <input {...getInputProps()} />
          <div styles={{fontSize:14}}>
            <b>{`+ Tambahkan File ${uploadType}`}</b>
            </div>
        </div>
      )}
    </>
  );
}

DragAndDrop.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  hint: PropTypes.string,
  hinterror: PropTypes.string,
  acceptFiles: PropTypes.string,
  uploadType: PropTypes.string,
  name: PropTypes.string,
};

DragAndDrop.defaultProps = {
  onChange: () => null,
  hint: "",
  hinterror: "",
  acceptFiles: "",
  uploadType: "",
};
