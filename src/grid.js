/**
 * Created by Hank on 3/29/18.
 */
import React  from 'react';

import GridLayout from 'react-grid-layout';

export class Grid extends React.Component {
    render() {
        // layout is an array of objects, see the demo for more complete usage
        var layout = [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, isDraggable: false},
            {i: 'b', x: 1, y: 0, w: 3, h: 2},
            {i: 'c', x: 4, y: 0, w: 1, h: 2}
        ];
        return (
            <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                <div key="a">a
                    <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                        <div key="e">e</div>
                        <div key="f">f</div>
                        <div key="g">g</div>
                    </GridLayout>
                </div>
                <div key="b">b</div>
                <div key="c">c</div>
            </GridLayout>
        )
    }
}
