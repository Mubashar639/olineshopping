import React, {Component} from 'react';
import {storage} from '../firebase/index';
import {connect} from "react-redux";
import FormControl from '@material-ui/core/FormControl';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0
    }
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }
  handleUpload = () => {
      const {image} = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
        }).then((res)=>{
          console.log(res);
          let object={img:this.state.url,name:document.getElementById("details").value ,Prize:document.getElementById("prize").value}
          this.props.uploadadd(object)
        })
    });
    
  }
  render() {
    const style = {
      height: '100vh',
      display: 'flex',
      marginTop:"30hv",
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <div style={style}>
        <div style={{ alignItems: 'center',  justifyContent: 'center', width:"300px" , margin:"auto"}}>
      <progress value={this.state.progress} max="100"/>
      
        <input type="file" onChange={this.handleChange}/>
        {"\n\n"}
        <FormControl style={{ alignItems: 'center',  justifyContent: 'center', width:"300px" , margin:"auto"}} margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Product Details</InputLabel>
            <Input id="details"  name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Product Prize</InputLabel>
            <Input id="prize" onChange={this.ValidateEmail} name="email" autoComplete="email" autoFocus />
          </FormControl>
          </div>
        <button onClick={this.handleUpload}>Upload</button>
        <br/>
        <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>
        
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return ({
//     cards: state.adds.cards,
//     array: state.todo.selected
//   })
// }
function mapDispatchToProps(dispatch) {
  return {
    uploadadd: (data) => dispatch({ type: "upload", upload: data }),
    

  }
}
// export default withStyles(styles)(Album)
export default connect(null, mapDispatchToProps)((ImageUpload))