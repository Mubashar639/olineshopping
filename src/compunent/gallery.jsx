import React, { Component } from 'react';
import Addsimage from './Addsimage';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, Route } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux"
import { withStyles } from '@material-ui/core/styles';
import footer from "../images/footer.PNG"
import store from '../store/store';



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
  constructor(props){
    super(props)
    this.state = {
      cards: [],
      all:[]
    }

  }

  select = (index) => {
    console.log("i am selected at " + index);
    this.props.getindex(index);

  }

  componentDidMount() {
    
    console.log(" this is props change")
    this.setState({
      cards:this.props.cards
    })
    fetch('/getuploaddata', {
      method: 'GET'
  }).then(function (all) {
      console.log(all);
      return all.json();
  })
      .then(function (all) {
          console.log(all);
       store.dispatch({type: "fdata", array:all})
      })

    setTimeout(() => {
      this.setState({
        cards:this.props.cards
      })  
    }, 500);
  }
  
  render() {
    const { classes } = this.props;
    
    return (
      <React.Fragment>
        <Addsimage />
        <CssBaseline />
        <main>
          {/* Hero unit */}
         
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={40}>
              {this.state.cards.map((card, index) => (
                <Grid item key={index} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <Link to={"/details/" + card.name + index} >
                      <CardMedia
                        className={classes.cardMedia}
                        image={card.img ||  'http://via.placeholder.com/400x300'}
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

                      <Button size="small" color="primary">
                        View
                    </Button>
                    </Link>


                    <Button variant="contained" onClick={() => { this.select(index) }} size="small" color="primary">
                        Add To Cart
                    </Button>

                  </Card>
                  <Route exact path={"/details" + card.name + index} />
                </Grid>

              ))}
            </Grid>
          </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
            <img style={{width:"100%"}} src={footer} alt="slow connection" srcset=""/>
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
    cards: state.adds.cards,
    array: state.adds.selected
  })
}
function mapDispatchToProps(dispatch) {
  return {
    getindex: (data) => dispatch({ type: "value", index: data }),
    startRedux: () => dispatch({ type: "start"}),
    sendStore:(data)=> dispatch({type: "fdata", array:data})
  }
}
// export default withStyles(styles)(Album)
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Album))


