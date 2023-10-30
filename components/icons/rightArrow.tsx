import Svg, { SvgProps, Path } from 'react-native-svg';

export default function RightArrow(props: SvgProps) {
    return (
        <Svg
            fill='none'
            stroke='#000'
            strokeWidth={1.5}
            className='w-6 h-6'
            viewBox='0 0 24 24'
            {...props}
        >
            <Path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m8.25 4.5 7.5 7.5-7.5 7.5'
            />
        </Svg>
    );
}
