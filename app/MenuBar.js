import React from 'react';

import { Decorator as Cerebral } from 'cerebral-react';

var MenuDropdown = require('./MenuDropdown');

@Cerebral()
class MenuBar extends React.Component {

    render() {
        var {
            signals
        } = this.props;

        var styles = {
            bar: {
                fontFamily: 'sans',
                fontSize: '11px'
            }
        };

        var editMenuItems = [
            {
                label: 'Copy',
                callback: function () {
                    signals.copySelection();
                }
            },

            {
                label: 'Select All',
                callback: function () {
                    signals.selectAll();
                }
            }
        ];

        var viewMenuItems = [
            {
                label: 'Features',
                callback: function () {
                    signals.toggleAnnotationDisplay('features');
                }
            }
        ];

        return (
            <div style={styles.bar}>
                <MenuDropdown
                    buttonText="Edit"
                    options={editMenuItems}
                />

                <MenuDropdown
                    buttonText="View"
                    options={viewMenuItems}
                />
            </div>
        );
    }

}

module.exports = MenuBar;
