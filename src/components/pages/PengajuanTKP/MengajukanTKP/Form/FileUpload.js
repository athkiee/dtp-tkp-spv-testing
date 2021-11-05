import React, { useState, Fragment } from 'react';
import Message  from './Message';
import Progress from './Progress';
import axios from 'axios';
import { message } from 'antd';


const FileUpload = () => {
    const [file, setFile] = useState();
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit= async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Const-Type': 'multipart/form-data'
                },
                 //progress bar
                onUploadProgress: progressEvent => {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / 
                    progressEvent.total)))
                    
                    
                //clear precentage
                setTimeout(() => setUploadPercentage(0), 10000);
                }

            });

            const  {fileName, filePath} = res.data;

            setUploadedFile({fileName, filePath});

            setMessage('File Uploaded')
        }catch(err) {
            if(err.response.status === 500){
                setMessage('Problem With Server');
            }else {
                setMessage(err.response.data.msg);
            }
        }
    };

    return (
        <Fragment>
             {/*notif file upload (blue)*/}
            {message ? <Message msg={message} />:null}
            <form onSubmit={onSubmit}>
                <div className='custom-file'>
                    <input type='file' class='custom-file-input' id='customFile' onChange={onChange}/>
                    <label class='custom-file-label' htmlFor='customFile'>
                        {filename}
                    </label>
                </div>

            <Progress percentage={uploadPercentage}/>

                <input type='submit' value='Upload' className= 'btn btn-primary btn-block mt-4' />
            </form>
             {/*show img uploaded*/}
            {uploadedFile ? <div className= 'row mt-5'>
                <div className= 'col-md-6 m-auto'>
                    <h3 className='text=center'>{uploadedFile.fileName}</h3>
                    <img style={{ width:'100%'}} src={uploadedFile.filePath} alt='' /> 
                </div>
            </div> : null}
        </Fragment>
    )
}

export default FileUpload