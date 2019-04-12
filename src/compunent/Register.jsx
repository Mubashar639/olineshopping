import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from "react-redux";
import store from "../store/store";
import { Link,Redirect } from 'react-router-dom';
import { auth } from '../firebase/index';
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

  class Register extends Component {
    constructor(props){
      super(props)
       window.validemail=false;
      this.state = {
        email:"",
        password:"",
   
      }
    
    }
    renderRedirect = () => {
      if (this.props.isregister) {
        return <Redirect to='/login' />
      }
    }
  
    onlogin=(event)=>{
      event.preventDefault();
      if(window.validemail){
      console.log("this is email ")
        let mail=document.getElementById("email").value;
        let pass=document.getElementById("password").value;
        let pnumber=document.getElementById("pnumber").value;
        let adress=document.getElementById("address").value;
        let fname=document.getElementById("fname").value;
        const promise=auth.createUserWithEmailAndPassword(mail,pass);
        promise.then(()=>{
          let object= {username:mail,password:pass,phone:pnumber,homeAdress:adress,fullname:fname};
          localStorage.setItem("register",JSON.stringify(object));
  
          this.props.register(object)
          console.log(store.getState());
          console.log(object)
        }).catch((e)=>{console.log(e.message)
      document.getElementById("check").innerHTML="<h6> "+e.message+"</h6>"
    });
      }else{
        window.alert("Please make sure correct email")
      }

    }
    ValidateEmail()
    {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(document.getElementById("email").value.match(mailformat))
    {
      document.getElementById("email").focus();
      document.getElementById("check").innerHTML="";
      
        window.validemail=true;
    
    return true;
    }
    else
    {
      document.getElementById("check").innerHTML="<h6> you have enter wrong email</h6>"
      window.validemail=false;
    return false;
    }
    }
     
  render() {
    const { classes } = this.props;
  console.log ( this.props.isregister)
  return (
    <main className={classes.main}>
      <CssBaseline />
      {this.renderRedirect()}
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form method="POST" className={classes.form}>
        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="fname">Full Name</InputLabel>
            <Input id="fname" name="fname" autoComplete="fname" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" onChange={this.ValidateEmail} name="email" autoComplete="email" autoFocus />
          </FormControl>
          <div id="check"></div>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <FormControl>
          <InputLabel htmlFor="pnumber">Phone Number</InputLabel>
            <Input id="pnumber" name="pnumber" autoComplete="pnumber" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="address">Home Addres</InputLabel>
            <Input name="address" type="text" id="address" autoComplete="current-adress" />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.onlogin}
          >
            Register
          </Button>
          <Link to="/login">
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Go to login
          </Button>
          </Link>
        </form>
      </Paper>
    </main>
  );
}
  }

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return ({
    isregister: state.login.isregister,
    array: state.login.register
  })
}
function mapDispatchToProps(dispatch) {
  return {
  
    register: (data) => dispatch({ type: "register",match:data})

  }
}
// export default withStyles(styles)(Album)

    export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register))