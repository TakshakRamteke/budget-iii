import Svg, { SvgProps, Path } from 'react-native-svg';

export default function CrossIcon(props: SvgProps) {
    return (
        <Svg
            fill='none'
            stroke='#000'
            strokeWidth={1.5}
            viewBox='0 0 24 24'
            {...props}
        >
            <Path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18 18 6M6 6l12 12'
            />
        </Svg>
    );
}
