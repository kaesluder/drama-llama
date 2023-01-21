import React, {useState} from 'react';
import {DateTime} from 'luxon';


const App = function () {

    const [fooState, setFooState] = useState('');

    window.electronAPI.dirname().then((result: string) => setFooState(result));

    const nowtime = DateTime.now().toLocaleString();
    return (<div>
        <p>Hello from React! The time is now {nowtime}! </p>
        <p>{fooState}</p>
    </div>)

}

export default App