import React, {Component} from 'react';

export default class Loading extends Component {
    render() {
        return (
            
                <div className="loadingBox">
                    <div className="monstertext">
                        <h2>Hello
                        </h2>
                        <h3>
                            Please wait...
                        </h3>
                    </div>

                    <div className="monster">
                        <div className="eye">
                            <div className="eyeball">
                            </div>
                        </div>
                        <div className="mouth">
                        </div>
                    </div>

                    <div className="monster blue">
                        <div className="eye">
                            <div className="eyeball">
                            </div>
                        </div>
                        <div className="mouth">
                        </div>
                    </div>
                    <div className="monster red">
                        <div className="eye">
                            <div className="eyeball">
                            </div>
                        </div>
                        <div className="mouth">
                        </div>
                    </div>
                </div>
        )
    }
}