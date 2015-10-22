import React from 'react';

import styles from './menu-item.css';

export default class MenuItem extends React.Component {
    render() {
        var {
            index,
            label,
            callback
        } = this.props;

        return <li key={index} className={styles.menuItem} onClick={callback}>{label}</li>;
    }
}

