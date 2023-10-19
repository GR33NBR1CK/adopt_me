import {createTheme} from '@mui/material/styles';
import styled from "styled-components";

const theme = createTheme({
    typography: {
        fontFamily: 'Lato, sans-serif',
        fontWeightBold: 900,
        fontWeightMedium: 700,
        fontWeightRegular: 400
    }
});

const GradientBackground = styled('div')({
    // background: 'linear-gradient(45deg, #bee7fc 30%, #55c1f7 90%)',
    background: 'radial-gradient(circle, rgba(190,231,252,1) 0%, rgba(105,200,248,1) 56%, rgba(85,193,247,1) 73%, rgba(83,193,247,1) 77%, rgba(81,194,247,1) 85%, rgba(0,212,255,1) 100%)'
});


export {theme, GradientBackground};