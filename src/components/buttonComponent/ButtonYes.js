import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const ButtonYes = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 61px',
    float: 'left',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  }
})(Button);

export default function ClassesShorthand() {
  return <ButtonYes>YES</ButtonYes>;
}