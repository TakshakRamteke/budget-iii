import Svg, { SvgProps, Path } from 'react-native-svg';

export default function AnalyticsIcon(props: SvgProps) {
    return (
        <Svg
            fill='none'
            stroke='#000'
            strokeWidth={1.2}
            className='w-7 h-7'
            viewBox='0 0 24 24'
            {...props}
        >
            <Path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941'
            />
        </Svg>
    );
}
