import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import {connect} from 'react-redux';
import {Link} from "react-router-dom"
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {ShoppingBasket } from '@material-ui/icons';

import MoreIcon from '@material-ui/icons/MoreVert';
 
const styles = theme => ({
  root: {
    width: '100%',
    
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    '&:hover': {
      backgroundColor: "oldlace",
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 100,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:"black"
  },
  inputRoot: {
    color: 'black',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      array:[]
    }
  }
 componentDidMount(){
   

      this.setState({
        array:this.props.array
      })
 
  
 }


  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  componentWillReceiveProps(nextProps) {
    console.log(" props change from app bar " + nextProps)
  } 
  

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    //  let noofitem=this.props.a;
     console.log(this.props.propupdate);
    
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
      <Link to="login"><MenuItem onClick={this.handleMenuClose}>Loggin</MenuItem></Link>
      <Link to="register"><MenuItem onClick={this.handleMenuClose}>Register</MenuItem></Link>
      <Link to="upload"><MenuItem onClick={this.handleMenuClose}>upload</MenuItem></Link>

        
        
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
         <MenuItem onClick={this.handleMobileMenuClose}>
        <Link to="/" style={{color:"black"}} >
              
          <span>Home</span>
              </Link>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
        <Link to="/selected" style={{color:"black"}} >
              <IconButton color="inherit">
                <Badge badgeContent={this.state.array.length} color="secondary">
                  <ShoppingBasket />
                </Badge>
              </IconButton>
          <span>Notifications</span>
              </Link>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div  className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Online Shop
        {this.props.selected}

            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            <Link to="/" style={{color:"white"}} >
              <IconButton color="inherit">
                <Badge badgeContent={this.state.array.length} color="secondary">
                   Home
                </Badge>
              </IconButton>
              </Link>
              <Link to="/selected" style={{color:"white"}} >
              <IconButton color="inherit">
                <Badge badgeContent={this.state.array.length} color="secondary">
                  <ShoppingBasket />
                </Badge>
              </IconButton>
              </Link>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};



function mapStateToProps(state) {
  return ({
    array: state.todo.selected,
    propupdate: state.todo.update
  })
}

// export default withStyles(styles)(Album)
export default connect(mapStateToProps)(withStyles(styles)(PrimarySearchAppBar))