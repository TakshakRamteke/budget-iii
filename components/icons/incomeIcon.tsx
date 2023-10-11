import Svg, { SvgProps, Path } from 'react-native-svg';

export default function IncomeIcon(props: SvgProps) {
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
                d='M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z'
            />
        </Svg>
    );
}
