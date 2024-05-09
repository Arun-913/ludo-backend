import '../css/ludo.css';
import {RecoilRoot, atom, useRecoilState} from 'recoil';

interface PlayAreaProps{
    class: string;
    color: string;
}

const flagColor = atom({
    key: 'flagColor',
    default: ''
});

let cnt = 0;

const PlayArea: React.FC<PlayAreaProps> = (props) =>{
    const [flag, setFlag] = useRecoilState(flagColor);
    const diceStyle = {
        minWidth: '8px',
        minHeight: '8px',
        backgroundColor: props.color,
        borderRadius: '25px'
    }

    const divs1 = [];
    for(let i=5; i>=0; i--){
        const temp = `${props.color[0]}1${i+1}`;
        divs1.push(<div key={i} className={`${temp} ludo-path-box ${flag === temp ? 'temp' : ''}`}></div>)
    }

    const divs2 = [];
    const divs3 = [];
    for(let i=0; i<6; i++){
        const temp1 = `${props.color[0]}2${i+1}`;
        const temp2 = `${props.color[0]}3${i+1}`;
        divs2.push(<div key={i} className={`${temp1} ludo-path-box ${flag === temp1 ? 'temp' : ''}`}></div>)
        divs3.push(<div key={i} className={`${temp2} ludo-path-box ${flag === temp2 ? 'temp' : ''}`}></div>)
    }

    return (<div className={`${props.class} center`}>
        <div>{divs1}</div>
        <div>{divs2}</div>
        <div>{divs3}</div>
    </div>
    )
}

interface MainProps{
    color1: string;
    color2: string;
}

const Main: React.FC<MainProps> = (props) =>{
    const [flag, setFlag] = useRecoilState(flagColor);

    const handleOnClick = (color: string): React.MouseEventHandler<HTMLDivElement> => {
        return (event) => {
          setFlag(color[0]+'32');
          console.log('clicked', flag);
        };
    };

    return <div className='main'>
        <div className="ludo-player-box" style={{cursor:'pointer'}}>
            <div style={{backgroundColor:props.color1}} className='diceStyle' onClick={handleOnClick(props.color1)}></div>
            <div style={{backgroundColor:props.color1}} className='diceStyle' onClick={handleOnClick(props.color1)}></div>
            <div style={{backgroundColor:props.color1}} className='diceStyle' onClick={handleOnClick(props.color1)}></div>
            <div style={{backgroundColor:props.color1}} className='diceStyle' onClick={handleOnClick(props.color1)}></div>
        </div>
        <PlayArea class='' color={`${cnt === 1 ? props.color2 : props.color1}`}/>
        <div className="ludo-player-box" style={{cursor: 'pointer'}}>
            <div style={{backgroundColor:props.color2}} className='diceStyle' onClick={handleOnClick(props.color2)}></div>
            <div style={{backgroundColor:props.color2}} className='diceStyle' onClick={handleOnClick(props.color2)}></div>
            <div style={{backgroundColor:props.color2}} className='diceStyle' onClick={handleOnClick(props.color2)}></div>
            <div style={{backgroundColor:props.color2}} className='diceStyle' onClick={handleOnClick(props.color2)}></div>
        </div>
    </div>
}

const Middle = () =>{
    return <div className={`center middle`}>
        <PlayArea class={'ludo-middle-90-anticlockwise'}  color='green'/>
        <div style={{maxWidth:'0vw'}}>temp</div>
        <PlayArea class='ludo-middle-90-clockwise' color='blue'/>
    </div>
}

export const Ludo = () =>{
    return <RecoilRoot>
        <div style={{maxHeight:'100vh', width:'48vw'}}>
            <Main color1='green' color2='yellow'/>
            <Middle/>
            <Main color1='red' color2='blue'/>
        </div>
    </RecoilRoot> 
}