import { useState, useRef, useEffect } from 'react'
import './UploadFile.scss'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Publish, ArrowForward, Add, Close } from '@material-ui/icons'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as fileUtils from '../../Utils/fileHelper'
import { DataGrid } from '@material-ui/data-grid'
import { Tooltip, Zoom } from '@material-ui/core'
import axios from 'axios'
import { columns } from '../../constants/constants'

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setinfoMessage] = useState(null)
  const [isCsv, setIsCsv] = useState(false)
  const [toggle, setToggle] = useState(true)
  const [users, setUsers] = useState('')

  useEffect(() => {
    if (selectedFile.length > 1) {
      setErrorMessage('Can not Upload More Than 1 FIle!!!')
    }
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
      setSelectedFile((prevArray) => [files[0], ...prevArray])
      setIsCsv(true)
    } else {
      setErrorMessage('Please Upload CSV File!!!')
    }
  }

  const removeFile = () => {
    setinfoMessage('File Removed')
    setIsCsv(false)
    setSelectedFile([])
    fileInputRef.current.value = ''
  }

  const clickHandler = () => {
    if (!(isCsv && selectedFile)) {
      setErrorMessage('Please Upload Your File First!!!')
    } else {
      var reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target.result
        setUsers(fileUtils.csvReader(text))
        setToggle(false)
      }
      reader.readAsText(selectedFile[0])
    }
  }

  const toastHandler = () => {
    if (infoMessage) {
      toast.info(infoMessage, {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
      setinfoMessage(null)
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
      setErrorMessage(null)
    }
  }

  const cancelHandler = () => {
    setIsCsv(false)
    setSelectedFile([])
    setToggle(true)
    setinfoMessage('Data Cleared')
  }

  const addHandler = () => {
    axios
      .post('http://localhost:5000/api/users/csv', users)
      .then((res) => {
        setinfoMessage(res.data.message)
        setIsCsv(false)
        setSelectedFile([])
        setToggle(true)
      })
      .catch((error) => {
        setErrorMessage('Error in Saving Data')
      })
  }

  return (
    <>
      {toggle ? (
        <Container fluid className='upload-wrapper'>
          {errorMessage || infoMessage ? toastHandler() : ''}

          <Row className='justify-content-center mb-3'>
            <Tooltip TransitionComponent={Zoom} title='Load Employees' arrow>
              <Button
                variant='primary'
                onClick={clickHandler}
                className={`${isCsv ? '' : 'disabled'} btn-style`}
              >
                Next <ArrowForward className='ml-2' />
              </Button>
            </Tooltip>
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
          <Row className='mb-2 justify-content-center'>
            <Col>
              <Tooltip TransitionComponent={Zoom} title='Clear Data' arrow>
                <Button variant='danger m-1' onClick={cancelHandler}>
                  <Close className='mr-2' /> Cancel
                </Button>
              </Tooltip>

              <Tooltip
                TransitionComponent={Zoom}
                title='Add New Employees'
                arrow
              >
                <Button variant='primary m-1' onClick={addHandler}>
                  <Add className='mr-2' /> Add Employees
                </Button>
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Col xl={10} style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
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
