import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imageFile: '',
      files:[],
      fileName: '',
    };
  }

  handleImageChange(e) {
    const {
      files,
    } = this.state;

    e.preventDefault();

    let file = e.target.files[0];
    files.push(e.target.files[0]);
    this.handleFileChange(file);
  }

  handleFileChange = (file) => {
    this.setState({fileName: file.name})

    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: file,
        imageFile: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  displayDocNames = () =>{
    const {
      files,
    } = this.state;

    if(files.length > 0){
      return (
        files.map((item)=>{
          return (
          <div onClick={()=>{this.handleFileChange(item)}}> 
            {item.name} 
          </div>
          )
        })
      )
    } else {
      return null
    }
  }

  render() {
    const {
      imageFile,
      fileName,
    } = this.state;

    let image = null;

    if (imageFile) {
      image = (<img src={imageFile} />);
    } else {
      image = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <div className="uploadFile">
          <div>
            File
            <form>
              <input 
                type="file" 
                id="docpicker"
                onChange={(e)=>this.handleImageChange(e)}
                accept=".doc,.docx,application/msword,image/*,.pdf"/>
            </form>
          </div>
        </div>
        <div className="docName">
          {fileName ? `File Name: ${fileName}` : "Document"}
        </div>
        <div className="docList">
            {this.displayDocNames()}
        </div>
        <div className="filePreview">
          {image}
        </div>
      </div>
    )
  }
}
export default App;
