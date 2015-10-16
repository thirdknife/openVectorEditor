import React, {PropTypes} from 'react';
import {Decorator as Cerebral} from 'cerebral-react';

var Draggable = require('react-draggable');
var RowItem = require('./RowItem.js');

@Cerebral({
    mapViewDimensions: ['mapViewDimensions'],
    rowData: ['rowData'],
    charWidth: ['charWidth'],
    charHeight: ['charHeight'],
    annotationHeight: ['annotationHeight'],
    selectionLayer: ['selectionLayer'],
    cutsiteLabelSelectionLayer: ['cutsiteLabelSelectionLayer'],
    tickSpacing: ['tickSpacing'],
    spaceBetweenAnnotations: ['spaceBetweenAnnotations'],
    showFeatures: ['showFeatures'],
    showTranslations: ['showTranslations'],
    showParts: ['showParts'],
    showOrfs: ['showOrfs'],
    showAxis: ['showAxis'],
    showCutsites: ['showCutsites'],
    showReverseSequence: ['showReverseSequence'],
    caretPosition: ['caretPosition'],
    sequenceLength: ['sequenceLength'],
    bpsPerRow: ['bpsPerRow']
})

class MapView extends React.Component {
    getNearestCursorPositionToMouseEvent(event, callback) {
        var rowNotFound = true;
        var visibleRowsContainer = this.refs.InfiniteScroller.getVisibleRowsContainerDomNode();
        //loop through all the rendered rows to see if the click event lands in one of them
        for (var relativeRowNumber = 0; relativeRowNumber < visibleRowsContainer.childNodes.length; relativeRowNumber++) {
            var rowDomNode = visibleRowsContainer.childNodes[relativeRowNumber];
            var boundingRowRect = rowDomNode.getBoundingClientRect();
            // console.log('boundingRowRect.top', JSON.stringify(boundingRowRect.top,null,4));
            // console.log('boundingRowRect.height', JSON.stringify(boundingRowRect.height,null,4));
            if (event.clientY > boundingRowRect.top && event.clientY < boundingRowRect.top + boundingRowRect.height) {
                //then the click is falls within this row
                // console.log('HGGGG');
                rowNotFound = false;
                var rowNumber = this.refs.InfiniteScroller.state.visibleRows[relativeRowNumber];
                var row = this.props.rowData[rowNumber];
                if (event.clientX - boundingRowRect.left < 0) {
                    console.warn('this should never be 0...');
                    callback(row.start, event); //return the first bp in the row
                } else {
                    var clickXPositionRelativeToRowContainer = event.clientX - boundingRowRect.left;
                    var numberOfBPsInFromRowStart = Math.floor((clickXPositionRelativeToRowContainer + this.props.charWidth / 2) / this.props.charWidth);
                    var nearestBP = numberOfBPsInFromRowStart + row.start;
                    if (nearestBP > row.end + 1) {
                        nearestBP = row.end + 1;
                    }
                    // console.log('nearestBP', nearestBP);
                    callback(nearestBP, event);
                }
                break; //break the for loop early because we found the row the click event landed in
            }
        }
        if (rowNotFound) {
            console.warn('was not able to find the correct row');
            //return the last bp index in the rendered rows
            var lastOfRenderedRowsNumber = this.refs.InfiniteScroller.state.visibleRows[this.refs.InfiniteScroller.state.visibleRows.length - 1];
            var lastOfRenderedRows = this.props.rowData[lastOfRenderedRowsNumber];
            callback(lastOfRenderedRows.end, event);
        }
    }

    render() {
        // console.log('render!');
        // 
        var {
            mapViewDimensions, 
            rowData, 
            charWidth, 
            selectionLayer, 
            charHeight,
            annotationHeight,
            tickSpacing,
            spaceBetweenAnnotations,
            showFeatures,
            showTranslations,
            showParts,
            showOrfs,
            showAxis,
            showCutsites,
            showReverseSequence,
            mouse,
            caretPosition,
            sequenceLength,
            bpsPerRow,
            handleEditorDrag,
            handleEditorDragStart,
            handleEditorDragStop,
            handleEditorClick,
        } = this.props;
        var self = this;
        // function renderRows(rowNumber) {
        //     if (rowData[rowNumber]) {
        //         return ();
        //     } else {
        //         return null
        //     }
        // }

        var mapViewStyle = {
            height: mapViewDimensions.height,
            width: mapViewDimensions.width,
            transform: "rotate(7deg)"
            //   overflowY: "scroll",
            // float: "left",
            // paddingRight: "20px"
            //   padding: 10
        };
        // console.log('rowData: ' + JSON.stringify(rowData,null,4));
        debugger
        return (
            <Draggable
                bounds={{top: 0, left: 0, right: 0, bottom: 0}}
                onDrag={(event) => {
                    this.getNearestCursorPositionToMouseEvent(event, handleEditorDrag)}   
                }
                onStart={(event) => {
                    this.getNearestCursorPositionToMouseEvent(event, handleEditorDragStart)}   
                }
                onStop={handleEditorDragStop}
            >
                <div
                    ref="mapView"
                    className="mapView"
                    style={mapViewStyle}
                    onClick={(event) => {
                        this.getNearestCursorPositionToMouseEvent(event, handleEditorClick)}   
                    }
                    >
                    <RowItem
                        charWidth={charWidth}
                        charHeight={charHeight}
                        annotationHeight={annotationHeight}
                        tickSpacing={tickSpacing}
                        spaceBetweenAnnotations={spaceBetweenAnnotations}
                        showFeatures={showFeatures}
                        showTranslations={showTranslations}
                        showParts={showParts}
                        showOrfs={showOrfs}
                        showAxis={showAxis}
                        showCutsites={showCutsites}
                        showReverseSequence={showReverseSequence}
                        selectionLayer={selectionLayer}
                        caretPosition={caretPosition}
                        sequenceLength={sequenceLength}
                        bpsPerRow={bpsPerRow}
                        row={rowData[0]} />
                </div>
            </Draggable>
        );
    }
}

MapView.propTypes = {
    handleEditorDrag: PropTypes.func.isRequired,
    handleEditorDragStart: PropTypes.func.isRequired,
    handleEditorDragStop: PropTypes.func.isRequired,
    handleEditorClick: PropTypes.func.isRequired
};

module.exports = MapView;