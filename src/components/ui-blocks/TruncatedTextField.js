import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const TruncatedTextField = (props) => {
    const { value, maxLength } = props;
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleTruncation = () => {
        setIsTruncated(!isTruncated);
    };

    return (
        <div>
            <TextField
                multiline
                rows={4}
                fullWidth
                value={value}
                variant="standard"
                InputProps={{
                    readOnly: true,
                    disableUnderline: true,
                    className: isTruncated ? 'MuiTypography-noWrap' : '',
                    style: {
                        maxHeight: isTruncated ? '4em' : 'none',
                    },
                }}
                {...props}

            />
            {value.length > maxLength && (
                <Button onClick={toggleTruncation} color="primary">
                    {isTruncated ? 'See More' : 'See Less'}
                </Button>
            )}
        </div>
    );
};

export default TruncatedTextField;
