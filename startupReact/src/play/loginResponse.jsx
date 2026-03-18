import React from 'react';

export function LoginResponse(props) {
    if (!props.message) return null;

    return (
        <div className="cinematic-modal-overlay fade-in">
            <div className="glass-panel cinematic-modal">
                <div className="modal-body">
                    <p>{props.message}</p>
                </div>
                <div className="modal-footer mt-3" style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="cinematic-btn primary" onClick={props.onHide}>Acknowledge</button>
                </div>
            </div>
        </div>
    );
}
