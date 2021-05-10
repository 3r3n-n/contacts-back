import React from 'react';

const contact = ({contactInfo,onEdit, onDelete}) => {
    return (
        <div key={contactInfo._id} className="container mr-4 ml-2 mt-4 ">
                <div className="notification p-2 has-background-dark">
                    <div className="columns">
                        <div className="column">
                            <div className="container">
                                <div className="columns">
                                    <div className="column ">
                                        <p className="title ml-2 is-5 has-text-light">{contactInfo.firstName} {contactInfo.lastName}</p>
                                    </div>
                                    <div className="column">
                                        <p className="subtitle is-6 has-text-light has-text-right">{contactInfo.company}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="columns">
                                    <div className="column is-two-thirds">
                                        <p className="subtitle ml-2 is-6 has-text-light">
                                            {contactInfo.email}</p>
                                    </div>
                                    <div className="column">
                                        <p className="subtitle is-6 has-text-light has-text-right">{contactInfo.phoneNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-one-third">
                            <div className="columns">
                                <div className="column mr-2 mt-2">
                                    <button onClick={()=> onEdit(contactInfo)} className="button is-success is-rounded is-small is-pulled-right">Edit</button>
                                </div>
                                <div className="column mr-2 mt-2">
                                    <button onClick={()=> onDelete(contactInfo)} className="button is-danger is-rounded is-small is-pulled-right">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default contact;