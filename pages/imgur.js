import React, { Component } from 'react'

class Imgur extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            files: []
        }
    }

    onFileChange = event => {
        // this.setState({ selectedFile: event.target.files[0] });
        this.setState({ files: [...this.state.files, ...event.target.files] })
    }

    onFileUpload = () => {
        const { selectedFile, files } = this.state
        // Create an object of formData 
        const formdata = new FormData();
        console.log(files);

        // Update the formData object 
        // formdata.append("image", selectedFile);

        // Request made to the backend api 
        // Send formData object 
        formdata.append("image", files)
        fetch("https://api.imgur.com/3/image", {
            method: "post",
            headers: {
                Authorization: "Client-ID e6aa071d345d18f"
            },
            body: formdata
        }).then(data => data.json()).then(data => {
            console.log(data)
        })

    }

    render() {
        return (
            <div>
                <input type="file" multiple onChange={this.onFileChange} accept="image/*" />
                <button onClick={this.onFileUpload}>Upload</button>
            </div >
        )
    }
}
export default Imgur





