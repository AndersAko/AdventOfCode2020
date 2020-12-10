import './Suitcase.css'

export default function Suitcase(props) {
    return (
        <div className='Suitcase' >
            <div className='face back' />
            <div className='face bottom' />
            <div className='face left' />
            <div className='face right' />
            <div className='face front' />
            {/* <div className='fulllid' style={{transform: 'rotateX(45deg)', transformStyle: 'preserve-3d' }}> */}
            <div className='fulllid' style={{transform: 'rotateX(0deg)' }}>
                <div className='face lidback' />
                <div className='face lidleft' />
                <div className='face lidright' />
                <div className='face lid' />
                <div className='face lidfront' />
            </div>
        </div>
    )
}