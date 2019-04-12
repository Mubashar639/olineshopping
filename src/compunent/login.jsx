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


  class SignIn extends Component {
    constructor(props){
      super(props)
      this.state = {
        email:"",
        password:"",
        emailvalidate:false
   
      }
    }

    onlogin=(event)=>{
      event.preventDefault();
      console.log("this is email ")
        let mail=document.getElementById("email").value
        let pass=document.getElementById("password").value
        const promise=auth.signInWithEmailAndPassword(mail,pass);
        promise.then(()=>{
          let object= {username:mail,password:pass};
          this.props.startlogin(object);
          if (!this.props.islogin) {
            document.getElementById("goregister").innerHTML="<h6> you have enter incorect email and password \n go for register</h6>"
          }
          console.log(store.getState());
          
        }).catch((e)=>{
          console.log(e.message)
      document.getElementById("check").innerHTML="<h6> "+e.message+"</h6>"

        })
  
    }
    renderRedirect = () => {
      if (this.props.islogin) {
        return <Redirect to='/selected' />
      }
    }
    
    ValidateEmail()
    {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(document.getElementById("email").value.match(mailformat))
    {
      document.getElementById("email").focus();
      document.getElementById("check").innerHTML="";
        
    return true;
    }
    else
    {
      document.getElementById("check").innerHTML="<h6> you have enter wrong email</h6>"
   
    return false;
    }
    }
  
     
  render() {
    const { classes } = this.props;
  console.log ( this.props.islogin)
  console.log ( this.props.propupdate)

  return (
    <main className={classes.main}>
      <CssBaseline />
      {this.renderRedirect()}

      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form method="POST" className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input onChange={this.ValidateEmail} id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <div id="check"></div>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <div id="goregister"></div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.onlogin}
          >
            Sign in
          </Button>
          <Link to="/register" >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Go To Register
          </Button>
          </Link>
        </form>
      </Paper>
    </main>
  );
}
  }

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return ({
    islogin: state.login.islogin,
    propupdate: state.login.update
  })
}
function mapDispatchToProps(dispatch) {
  return {
  
    startlogin: (data) => dispatch({ type: "login",match:data})

  }
}
// export default withStyles(styles)(Album)
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn))