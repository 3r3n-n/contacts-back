import React, { useState, useCallback, useEffect } from 'react';



const Form = ({showModal,onClose, onCreate, onEdit, contact}) => { 
    const [firstName,setFirstName] = useState(contact.firstName||'')
    const [lastName,setLastName] = useState(contact.lastName||'')
    const [email,setEmail] = useState(contact.email||'')
    const [phoneNumber,setPhoneNumber] = useState(contact.phoneNumber||'')
    const [company,setCompany] = useState(contact.company||'') 
    const _onSave = useCallback(async (contact)=> {
        if(contact._id){
            await onEdit(contact)
        }
        else{
            await onCreate(contact)
        }
        
        clear()
    },[] )
    const clear = useCallback( () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhoneNumber('')
        setCompany('')
    },[])
    console.log(contact)
    useEffect(()=>{
        setFirstName(contact.firstName)
        setLastName(contact.lastName)
        setEmail(contact.email)
        setPhoneNumber(contact.phoneNumber)
        setCompany(contact.company)
    },[contact])
    return (
        <div className={showModal ? "modal is-active": "modal" }>
            <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head has-background-dark">
                        <p className="modal-card-title ml-4 has-text-white">Contact info </p>
                        
                        <button onClick={() => onClose()} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body has-background-black">
                        <div className="notification p-3 ml-4 mr-2 mb-4 mt-4 has-background-dark">
                <div className="field">
                    <label className="label has-text-white">First Name</label>
                    <div className="control ">
                        <input className="input has-background-dark has-text-white" type="text" placeholder="Required" value={firstName} onChange={(e) => setFirstName(e.target.value)}  />
                    </div>
                </div>
                <div className="field">
                    <label className="label has-text-white">Last Name</label>
                    <div className="control">
                        <input className="input has-background-dark has-text-white" type="text" placeholder="Required" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label has-text-white">Email</label>
                    <div className="control has-icons-left">
                        <input className="input has-background-dark has-text-white" type="email" placeholder="Required" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label has-text-white">Phone</label>
                    <div className="control">
                        <input className="input has-background-dark has-text-white" type="text" placeholder="Optional" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>
                </div>

                <div className="field">
                    <label className="label has-text-white">Company</label>
                    <div className="control">
                        <input className="input has-background-dark has-text-white" type="text" placeholder="Optional" value={company} onChange={(e) => setCompany(e.target.value)}/>
                    </div>
                </div>
            </div>
                    </section>
                    <footer className="modal-card-foot has-background-dark">
                        <button className="button is-success" onClick={() => _onSave({...contact,firstName,lastName,phoneNumber,company,email})}>Save changes</button>
                        <button className="button is-outlined has-text-light is-primary" onClick={() => {onClose();clear()}}>Cancel</button>
                    </footer>
                </div>
            </div>
    );
};

export default Form;