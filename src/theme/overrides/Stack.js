// ----------------------------------------------------------------------
export default function Stepper(theme) {
    return {
        MuiStack: {
            styleOverrides: {
                root: {
                    '& .MuiFormControl-root': {
                        marginTop: '10px'
                    },
                },
            },
        },
    };
}
