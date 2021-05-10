import React, { useCallback, useEffect, useState } from 'react';
import Contact from '../contact/contact';
import Form from '../form/form';
import axios from 'axios';
import contact from '../contact/contact';

const getContacts = async (page) => {
    const limit = 10
    const data = await axios.get(`https://contacts00back.herokuapp.com/api/contacts/?limit=${limit}&page=${page}`)
    return data.data
}

const createContact = async (contact) => {
    const data = await axios.post(`https://contacts00back.herokuapp.com/api/contacts/`,{...contact})
    return data.data
}

const editContact = async (contact) => {
    const data = await axios.put(`https://contacts00back.herokuapp.com/api/contacts/${contact._id}`,{...contact})
    return data.data
}

const deleteContact = async (contact) => {
    const data = await axios.delete(`https://contacts00back.herokuapp.com/api/contacts/${contact._id}`)
    return data.data
}

const contactslist = () => {
    const [contactList,setContactList] = useState([])
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const [totalContacts,setTotalContacts] = useState(1)
    const [showModal,setShowModal] = useState(false)
    const [contactSelected,setContactSelected] = useState({})
    const [prevPage,setPrevPage] = useState(false)
    const [nextPage,setNextPage] = useState(false)

    useEffect(()=>{
        getContacts(page).then(res => {
            setContactList(res.docs)
            setPage(res.page)
            setTotalPages(res.totalPages)
            setTotalContacts(res.totalDocs)
            setNextPage(res.hasNextPage)
            setPrevPage(res.hasPrevPage)
        })
        
    },[page]) 
    const _onCreate = useCallback(async (contact)=> {
        await createContact(contact)
        getContacts(page).then(res => {
            setContactList(res.docs)
            setShowModal(false)
            setPage(res.page)
            setTotalPages(res.totalPages)
            setTotalContacts(res.totalDocs)
            setNextPage(res.hasNextPage)
            setPrevPage(res.hasPrevPage)
        })
    },[page] )
    const _onEdit = useCallback(async (contact)=> {
        await editContact(contact)
        getContacts(page).then(res => {
            setContactList(res.docs)
            setShowModal(false)
            setPage(res.page)
            setTotalPages(res.totalPages)
            setTotalContacts(res.totalDocs)
            setNextPage(res.hasNextPage)
            setPrevPage(res.hasPrevPage)
        })
    },[page] )
    const _onDelete = useCallback(async (contact)=> {
        await deleteContact(contact)
        getContacts(page).then(res => {
            setContactList(res.docs)
            setPage(res.page)
            setTotalPages(res.totalPages)
            setTotalContacts(res.totalDocs)
            setNextPage(res.hasNextPage)
            setPrevPage(res.hasPrevPage)
        })
    },[page] )
    return (
        <>
            <div class="container">
                <div class="container">
                    <div className="columns">
                        <div className="column is-two-thirds">
                            ...
                        </div>
                        <div className="column">
                            <button class="button is-outlined has-text-light is-large is-primary ml-2 mt-4 is-pulled-right mr-4" onClick={ ()=> {setContactSelected({});setShowModal(true)} } >Add contact</button>
                        </div>
                    </div>
                    <Form showModal={showModal} onClose={ ()=> setShowModal(false)} onCreate={_onCreate} contact={contactSelected} onEdit={_onEdit}/> 
                    {contactList.map(contact =>{
                        return <Contact contactInfo={contact} onEdit={(contact)=>{setContactSelected(contact);setShowModal(true)} } onDelete={_onDelete} />
                    })}
                </div>
                <div class="container">
                    <nav className="pagination m-2 is-pulled-right" role="navigation" aria-label="pagination">
                        <div className="columns">
                            <div className="column">
                                <a onClick={()=>setPage(page-1)} className="pagination-previous has-text-light" disabled={!prevPage}>Previous</a>
                            </div>
                            <div className="column">
                                <div class="content has-text-light">
                                    <span>Page: { page } of { totalPages } </span>
                                    <span>Showing: { totalContacts > 10 ? `10 of ${totalContacts}` : `${totalContacts} of ${totalContacts}` } </span>
                                </div>
                            </div>
                            <div className="column">
                                <a onClick={()=>setPage(page+1)} className="pagination-next has-text-light" disabled={!nextPage}>Next page</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default contactslist;