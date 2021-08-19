import { useState, useRef, useEffect } from 'react'
import './UploadFile.scss'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Publish } from '@material-ui/icons'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as fileUtils from '../../Utils/fileHelper'
import { DataGrid } from '@material-ui/data-grid'

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isCsv, setIsCsv] = useState(false)
  const [toggle, setToggle] = useState(true)
  const [users, setUsers] = useState('')

  useEffect(() => {
    // if(selectedFile.length>1){
    //   setErrorMessage('Please Upload 1 CSV File')
    // }
  }, [selectedFile])

  var fileInputRef = useRef()
  const fileInputClicked = () => {
    fileInputRef.current.click()
  }
  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files)
    }
  }

  const fileDrop = (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length) {
      handleFiles(files)
    }
  }

  const handleFiles = (files) => {
    if (fileUtils.validateFile(files[0])) {
      setSelectedFile((prevArray) => [...prevArray, files[0]])
      setIsCsv(true)
    } else {
      setErrorMessage('Please Upload CSV File')
    }
  }

  const removeFile = () => {
    setIsCsv(false)
    setSelectedFile([])
  }

  const clickHandler = () => {
    var reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result
      setUsers(fileUtils.csvReader(text))
      setToggle(false)
    }
    reader.readAsText(selectedFile[0])
  }

  const columns = [
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 200,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 200,
      editable: false,
    },
    {
      field: 'emailAddress',
      headerName: 'Email',
      width: 300,
    },
  ]

  return (
    <>
      {toggle ? (
        <Container fluid className='upload-wrapper'>
          {errorMessage
            ? (() => {
                setErrorMessage('')
                toast.error(errorMessage, {
                  position: 'bottom-right',
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
              })()
            : ''}
          <Row className='justify-content-center mb-3'>
            <Button variant='primary' onClick={clickHandler}>
              Upload
            </Button>
          </Row>
          <Row className='justify-content-center'>
            <Col
              md={10}
              lg={8}
              sm={10}
              onClick={fileInputClicked}
              className='drop-container p-5'
              onDragOver={fileUtils.dragOver}
              onDragEnter={fileUtils.dragEnter}
              onDragLeave={fileUtils.dragLeave}
              onDrop={fileDrop}
            >
              <Publish className='icon-style' />
              <div className='drop-message pt-2'>
                Drap & Drop File here or Click to Select Your File
              </div>
              <input
                ref={fileInputRef}
                className='file-input'
                type='file'
                multiple
                onChange={filesSelected}
              />
            </Col>
          </Row>

          {selectedFile && isCsv && (
            <Row className='file-display-container justify-content-center'>
              <Col md={10} lg={8} sm={10} className='file-preview-wrapper'>
                <div className='file-info'>
                  <div className='file-type-logo'></div>
                  <div className='file-name'>{selectedFile[0].name}</div>
                  <div className='file-size'>
                    ({fileUtils.fileSize(selectedFile[0].size)})
                  </div>
                </div>
                <div className='file-remove' onClick={removeFile}>
                  X
                </div>
              </Col>
            </Row>
          )}
        </Container>
      ) : (
        <Container fluid className='users-container'>
          <Row>
            <Col xl={10} style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection = {false}
                disableSelectionOnClick
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default UploadFile
