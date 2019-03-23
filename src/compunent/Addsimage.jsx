import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import adds1 from "../images/adds1.PNG"
import adds2 from "../images/adds2.PNG"

import adds3 from "../images/adds3.PNG"
import adds4 from "../images/adds4.PNG"
import adds5 from "../images/adds5.PNG"


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});


class SingleLineGridList extends Component {
 
 state={
   interval:0,
 }
  componentDidMount(){
    let array=[adds1,adds2,adds3,adds4,adds5];
    let i=1;
    let interval= setInterval(()=>{
      if(i<5){
        document.getElementById("add").src=array[i];
        i+=1;
      }else{
        i=0;
      }
    },2000);
    this.setState({
      interval
    })
 
  }

 componentWillUnmount(){
   clearInterval(this.state.interval)
 }
  render() {
  
     
  

   
  return (
    <div style={ {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
     
    }}>
      <GridList style={{
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  }} cols={2.5}>
       
            <img id="add" src={adds1} style={{width:"100%"}} alt="connection slow" />
        
      </GridList>
    </div>
  );
}
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);