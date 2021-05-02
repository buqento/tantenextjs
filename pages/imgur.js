import React, { Component } from 'react'
class Imgur extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null
        }
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    }

    onFileUpload = () => {
        const { selectedFile } = this.state
        const formdata = new FormData();
        formdata.append("image", selectedFile);
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
                <input type="file" onChange={this.onFileChange} accept="image/*" />
                <button onClick={this.onFileUpload}>Upload</button>
            </div >
        )
    }
}
export default Imgur