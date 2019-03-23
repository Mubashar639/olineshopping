import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    alignItems: 'right',
  },
  
});

function TextButtons(props) {
  const { classes } = props;
  return (
    <div style={{alignContent:"right",alignItems:"right"}}>
      <Button className={classes.button}>Default</Button>
      <Button color="primary" className={classes.button}>
        Save move Item
      </Button>
      <Button color="secondary" className={classes.button}>
        Sell on Daraz
      </Button>
      <Button className={classes.button}>
        Track your Order
      </Button>
      <Button href="#text-buttons" className={classes.button}>
        Costumer Care
      </Button>
     
    </div>
  );
}

TextButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextButtons);