import React from 'react';

import styles from './menu-item.css';

export default class MenuItem extends React.Component {
    render() {
        var {
            index,
            label,
            callback,
            toggle
        } = this.props;

        var className = (toggle !== undefined && toggle) ? styles.menuItemOn : styles.menuItem;

        return <li key={index} className={className} onClick={callback}>{label}</li>;
    }
}

