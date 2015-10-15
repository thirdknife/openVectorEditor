import React from 'react';

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

        var styles = {
            button: {
                font: 'inherit',
                color: 'inherit',
                backgroundColor: '#ffffff',
                border: 'none'
            },

            menu: {
                display: 'inline-block',
                position: 'relative'
            },

            dropdown: {
                listStyleType: 'none',
                listStylePosition: 'inside',
                padding: '0',
                margin: '0',
                backgroundColor: '#ffffff',
                position: 'absolute'
            },

            menuItem: {
                padding: '10px'
            }
        };

        var dropdown = null;

        if (this.state.isOpen) {
            dropdown = (
                <ul style={styles.dropdown}>
                    {options.map((el) =>
                    <li style={styles.menuItem}>{el}</li>
                    )}
                </ul>
            );
        }

        return (
            <div style={styles.menu}>
                <button style={styles.button} onClick={this.handleClick.bind(this)}>{buttonText}</button>

                {dropdown}
            </div>
        );
    }

}

module.exports = MenuDropdown;
