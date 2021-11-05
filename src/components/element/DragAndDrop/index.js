import { withRouter } from 'react-router-dom';
import withStyles  from 'react-jss';
import Component from './component';
import styles from './styles';

const Routed = withRouter(Component);

export default withStyles(styles)(Routed);
