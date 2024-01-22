//eslint-disable-next-line


declare module "@mui/material/styles/createPalette"{
    interface Palettecolor{
        [key: number]:string;
    }
    interface Palette{
        tertiary: Palettecolor; 
    }
}