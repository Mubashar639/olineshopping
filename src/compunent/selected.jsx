import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, Route, Redirect } from "react-router-dom";
import footer from "../images/footer.PNG"
import { auth } from '../firebase/index';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import { connect } from "react-redux"
import { withStyles } from '@material-ui/core/styles';

import tick from "../images/tick.png"


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: "100%",
    margin: '30px auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});


class Album extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      login:false

    }

  }

  login = (index) => {
    auth.onAuthStateChanged(firebase=>{
      if(firebase){console.log(firebase)
        this.props.selectedindex(index)  
        this.openForm();
        console.log(index)
        this.setState({
          islogin:true
        })
      }else{
        this.renderRedirect();
      }
    })
  }
  renderRedirect = () => {
    if (!this.state.islogin) {
      return <Redirect to='/login' />
    }
  }

  componentDidMount() {

    console.log(" this is props change")
    this.setState({
      cards: this.props.cards
    })
  }

  openForm() {
    document.getElementById("formme").style.display = "block";
  }

  closeForm() {
    
    document.getElementById("formme").style.display="none"
  }
  confirm= (data,index)=>{
    data.preventDefault();
      console.log(data);
      console.log(index)
    console.log(" login runing");
    var image = document.createElement("img");
    image.src = tick;
    image.setAttribute("class", "good");

    this.refs.container.appendChild(image);
    setTimeout(() => {
      image.remove();

    }, 2000);

    document.getElementById("formme").style.display="none"

  }
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}

          <div ref="container" className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={40}>
              {this.state.cards.map((card, index) => (
                <Grid item key={index} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <Link to={"/details/" + card.name + index} >
                      <CardMedia
                        className={classes.cardMedia}
                        image={card.img}
                        title={card.name}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.Prize}
                        </Typography>
                        <Typography>
                          {card.name}
                        </Typography>
                      </CardContent>


                    </Link>


                    <Button onClick={() => this.login(index)} size="small" color="primary">
                      Confirm Order
                    </Button>
                    </Card>
                <Route exact path={"/details" + card.name + index} />
                </Grid>

        ))}
            </Grid>
            <div id="formme" style={{
                      width: "100 %",
                      height:" 100 %",
                      opacity: ".95",
                    margin: "auto",
                      display: "none",
                      position: "absolute",
                      top:"200px",
                      left:"15%",
                      backgroundColor: "#313131",
                        overflow:"auto"}} >
                  <form style={{
                    maxWidth: "300px",
                    minWidth: "250px",
                    padding: "10px 50px",
                    border: "2px solid gray",
                    borderRadius: "10px",
                    fontFamily: "raleway",
                    backgroundColor: "#fff",
                  }}
                    action="/ordered" method="POST" class="form-container">
                    <h1>Order Confirm</h1>

                    <label htmlFor="email"><b>Full  name</b></label>
                    <input type="text" placeholder="Enter name" name="username" required />
                    <label htmlFor="number"><b>Phone Number</b></label>
                    <input type="text" placeholder="Enter Number" name="number" required />
                    <label htmlFor="item"><b> Number of item</b></label>
                    <input type="number" placeholder="Enter Number of item" name="item" required />
                    <label htmlFor="adress"><b>Home Address</b></label>
                    <input type="text" placeholder="Enter adress" name="adress" required />

                    <button type="submit" onClick={(e)=>{this.confirm(e)}} >Confirm</button>
                    <button type="button" class="btn cancel" onClick={this.closeForm}>Close</button>
                  </form>
                  </div>
          </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <img style={{ width:"100%" }} src={footer} alt="slow connection" srcset="" />
          <Typography variant="h6" align="center" gutterBottom>

          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
        </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
};

// class Detail extends Component {
//   render() {
//     // console.log(cards);
//     let string=this.props.match.params.pti;
//     let index= string.charAt(string.length-1);

//     return <div>
//       <h1>{this.props.match.params.pti}</h1>
//      <img src={cards[index].img} alt="probelt=m" />
//     </div>
//   }
// }
function mapStateToProps(state) {
  return ({
    cards: state.adds.selectedcard,

    islogin: state.login.islogin,
  })
}
function mapDispatchToProps(dispatch) {
  return {
    selectedindex: (data) => dispatch({ type: "ordered", index: data }),

  }
}
// export default withStyles(styles)(Album)
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Album))