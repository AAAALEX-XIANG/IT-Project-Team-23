import React, {Component} from 'react';

export default class NotFound extends Component {
    render() {
        return (
            <div className="pageContainerNotFound">
                <div className="NotFoundContainer">
                    <div className="NotFoundmessage myTitle">
                        404
                    </div>
                    <div className="NotFoundmessage first">
                        Aww...
                    </div>
                    <div className="NotFoundmessage second">
                        This page has gone missing.
                    </div>
                    <button className="NotFoundButton">
                        <span>Go Back Home</span>
                    </button>
                </div>
            </div>
        )
    }
}