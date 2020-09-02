import React from 'react';
import RegForm from '../components/register';

export default function RegPage() {
    return (
        <div className="pageContainer2">
            <div className="floatRight">
                <br /><br />
                <div className="formDisplay">
                    <RegForm />
                </div>
            </div>
            <div className="floatLeft">
                <br /><br /><br /><br />
                <div className="formDisplay"> </div>
            </div>
        </div>
    );
}
