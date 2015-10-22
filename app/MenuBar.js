import React, { PropTypes } from 'react';
import { propTypes } from './react-props-decorators.js';
import { Decorator as Cerebral } from 'cerebral-react';

import styles from './menu-bar.css';

import MenuDropdown from './MenuDropdown.js';

@Cerebral({
    showFeatures: ['showFeatures']
})
@propTypes({
    showFeatures: PropTypes.bool.isRequired
})
export default class MenuBar extends React.Component {

    render() {
        var {
            signals,
            showFeatures
        } = this.props;

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
                },
                toggle: showFeatures
            }
        ];

        return (
            <div className={styles.bar}>
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

