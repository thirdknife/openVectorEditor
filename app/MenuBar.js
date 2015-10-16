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

        var fileMenuItems = [
            {
                label: 'Open',
                callback: function () {
                }
            },

            {
                label: 'Save',
                callback: function () {
                }
            }
        ];

        return (
            <div style={styles.bar}>
                <MenuDropdown
                    buttonText="File"
                    options={fileMenuItems}
                />
            </div>
        );
    }

}

module.exports = MenuBar;
