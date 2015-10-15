import React from 'react';

var MenuDropdown = require('./MenuDropdown');

class MenuBar extends React.Component {

    render() {
        var styles = {
            bar: {
                fontFamily: 'sans',
                fontSize: '11px'
            }
        };

        return (
            <div style={styles.bar}>
                <MenuDropdown
                    buttonText="File"
                    options={['Open', 'Save']}
                />
            </div>
        );
    }

}

module.exports = MenuBar;
