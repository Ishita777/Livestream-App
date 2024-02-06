import React, { useState } from 'react';

const Overlay = ({ onSave }) => {
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [text, setText] = useState('');
    const [size, setSize] = useState('medium');

    const handleSave = () => {
        // Check if text and position are set
        if (text && positionX !== null && positionY !== null) {
            const overlayData = {
                positionX,
                positionY,
                text,
                size
            };
            onSave(overlayData); // Pass overlayData to the parent component for saving
        } else {
            alert('Please enter text and select a position.');
        }
    };

    return (
        <div>
            <h3>Add Custom Overlay</h3>
            <div>
                <label htmlFor="text">Text:</label>
                <input
                    type="text"
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="positionX">Position X:</label>
                <input
                    type="number"
                    id="positionX"
                    value={positionX}
                    onChange={(e) => setPositionX(parseInt(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="positionY">Position Y:</label>
                <input
                    type="number"
                    id="positionY"
                    value={positionY}
                    onChange={(e) => setPositionY(parseInt(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="size">Size:</label>
                <select
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </div>
            <button onClick={handleSave}>Save Overlay</button>
        </div>
    );
};

export default Overlay;
