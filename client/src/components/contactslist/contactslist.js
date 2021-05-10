import React, { useCallback, useEffect, useState } from 'react';
import Contact from '../contact/contact';
import Form from '../form/form';
import axios from 'axios';
import contact from '../contact/contact';

const getContacts = async (page) => {
    const limit = 2
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
            <button onClick={ ()=> {setContactSelected({});setShowModal(true)} } >Add contact</button>
            <Form showModal={showModal} onClose={ ()=> setShowModal(false)} onCreate={_onCreate} contact={contactSelected} onEdit={_onEdit}/> 
            {contactList.map(contact =>{
                return <Contact contactInfo={contact} onEdit={(contact)=>{setContactSelected(contact);setShowModal(true)} } onDelete={_onDelete} />
            })}
            <nav className="pagination m-2" role="navigation" aria-label="pagination">
                <span>Page: { page } of { totalPages } </span>
                <span>Showing: { totalContacts > 10 ? `10 of ${totalContacts}` : `${totalContacts} of ${totalContacts}` } </span>
                <a onClick={()=>setPage(page-1)} className="pagination-previous" disabled={!prevPage}>Previous</a>
                <a onClick={()=>setPage(page+1)} className="pagination-next has-text-light" disabled={!nextPage}>Next page</a>
            </nav>
        </>
    );
};

export default contactslist;