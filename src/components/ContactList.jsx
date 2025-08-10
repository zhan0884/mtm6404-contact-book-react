import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../db';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const contactsRef = collection(db, 'contacts');
      const q = query(contactsRef, orderBy('lastName'));
      const querySnapshot = await getDocs(q);
      const contactsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading contacts...</div>;
  }

  return (
    <div className="contact-list">
      <div className="header">
        <h1>Contact Book</h1>
        <Link to="/add" className="add-button">Add New Contact</Link>
      </div>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="contacts-grid">
        {filteredContacts.length === 0 ? (
          <div className="no-contacts">
            {searchTerm ? 'No contacts found matching your search.' : 'No contacts found.'}
          </div>
        ) : (
          filteredContacts.map(contact => (
            <Link 
              key={contact.id} 
              to={`/contact/${contact.id}`}
              className="contact-card"
            >
              <div className="contact-avatar">
                {contact.firstName?.[0]}{contact.lastName?.[0]}
              </div>
              <div className="contact-info">
                <h3>{contact.firstName} {contact.lastName}</h3>
                <p>{contact.email}</p>
                {contact.phone && <p>{contact.phone}</p>}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactList;
