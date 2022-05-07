import React from 'react';
import { Alert } from 'react-bootstrap';

const MessageBox = ({ variant, children }) => {
    return (
        <Alert variant={variant || 'info'}>
            {children}
        </Alert>
    );
};

export default MessageBox;