import React, { Component } from 'react'
class Imgur extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allFile: null
        }
    }

    onFileChange = event => {
        let f = event.target.files
        let i = []
        for (let index = 0; index < f.length; index++) {
            let file = f[index]
            i.push(file)
        }
        this.setState({ allFile: i })
    }

    onFileUpload = () => {
        const { allFile } = this.state
        let images = []
        let done = false
        for (let index = 0; index < allFile.length; index++) {
            let file = allFile[index]
            const formdata = new FormData();
            formdata.append("image", file);
            fetch("https://api.imgur.com/3/image", {
                method: "post",
                headers: {
                    Authorization: "Client-ID e6aa071d345d18f"
                },
                body: formdata
            })
                .then(data => data.json())
                .then(data => {
                    console.log(data.data.id);
                    images.push(data.data.id + '.webp')
                    console.log("index + 1 => ", index + 1);
                    console.log("allFile.length => ", allFile.length);
                    if (index + 1 === allFile.length) {
                        console.log("done")
                        console.log(images)
                    }
                })
        }
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