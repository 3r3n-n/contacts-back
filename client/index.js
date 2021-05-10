import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './src/components/navbar/navbar';
import Form from './src/components/form/form';
import Contactslist from './src/components/contactslist/contactslist';
// aaaaa
const App = () => {
    return (
        <>
        <NavBar/>
        <div className='columns'>
            <div className='column'>
                <Contactslist/>
            </div>
        </div>
        </>
    )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);