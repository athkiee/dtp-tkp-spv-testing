import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#black',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#black',
  transition: 'border .3s ease-in-out'
};

const activeStyle = {
  borderColor: '#17827B'
};

const acceptStyle = {
  borderColor: '#17827B'
};


export default function DragAndDrop(props) {
  const {
    onChange,
    acceptFiles,
    uploadType,
  } = props;
  const [file, setFile] = useState(null);
  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0]);
    onChange(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept: acceptFiles,
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
  }), [
    isDragActive,
    isDragAccept
  ]);

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <div><b>{file ? file.name : `+ Tambahkan file ${uploadType} anda disini`}</b></div>
    </div>
  );
}

DragAndDrop.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  hint: PropTypes.string,
  hinterror: PropTypes.string,
  acceptFiles: PropTypes.string,
  uploadType: PropTypes.string,
};

DragAndDrop.defaultProps = {
  onChange: () => null,
  hint: '',
  hinterror: '',
  acceptFiles: '',
  uploadType: '',
};