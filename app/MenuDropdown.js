import React from 'react';

import styles from './menu-dropdown.css';

class MenuDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    handleClick() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        var {
            buttonText,
            options
        } = this.props;

        var dropdown = null;

        if (this.state.isOpen) {
            dropdown = (
                <ul className={styles.dropdown}>
                    {options.map((el, i) =>
                    <li key={i} className={styles.menuItem} onClick={el.callback}>{el.label}</li>
                    )}
                </ul>
            );
        }

        return (
            <div className={styles.menu}>
                <button className={styles.button} onClick={this.handleClick.bind(this)}>{buttonText}</button>

                {dropdown}
            </div>
        );
    }

}

module.exports = MenuDropdown;
