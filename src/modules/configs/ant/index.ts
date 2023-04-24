import { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
    token: {
        borderRadius: 24,
        colorPrimary: '#000000',
        margin: 10,
    },
};

export const purpletheme: ThemeConfig = {
    token: {
        borderRadius: 24,
        colorPrimary: '#7432FF',
        margin: 10,
    },

    components: {
        Slider: { railSize: 10, handleSize: 15, handleSizeHover: 20 },
        Select: { colorTextPlaceholder: 'lightgrey' },
    },
};
